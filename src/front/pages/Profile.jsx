import React ,{ useEffect, useReducer, useState } from "react";
import profileImageUrl from "../assets/img/roundpicture.png"; 
import star from "../assets/img/star.png";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import profilehero from "../assets/img/cute.png";
import { Card } from "../components/Card.jsx";
import Chatdemo from "../components/Chat.jsx";
import { shows } from "../assets/Data/Shows.js";
import { season } from "../assets/Data/Season.js";
// import '../style.css';





export const Profile = () => {

	const { store, dispatch } = useGlobalReducer()
	const loggedInUser = localStorage.getItem("user")
	const user = JSON.parse(loggedInUser)
	console.log(user,"this is my store")
												
	const backendUrl = import.meta.env.VITE_BACKEND_URL
	const apiKey = import.meta.env.VITE_API_KEY
	const watchModeBase = import.meta.env.VITE_WATCHMODE_BASE_URL
	const watchModeApi = import.meta.env.VITE_WATCHMODE_API_KEY

	const [chatBox, setChatBox] = useState(null)
	// added this becuase we are filling the favorites object 
	const [fav, setFav] = useState([]);

	// added this in case it is needed to map a list
	const favoritedShow = []; 

	// added this becuase we want to render show list
	const [showList, setshowList] = useState([]);

	// added this for the search functionality
	const [search, setSearch] = useState("");

	// card map use state to override 
	const [label, setLabel] = useState([])

	const [mapItem, setMapItem] = useState("")

	const matchesSearch = (showList, search) => {
		console.log("matchesSearch")
		return showList.title.toLowerCase().includes(search.toLowerCase());
	};

	const showListFetch = () => {
		fetch(watchModeBase+"/list-titles/?apiKey="+watchModeApi+"&source_ids=203,57")
			.then((resp) => {
				if (resp.ok == false){
					return shows
				} else {					
					return resp.json()
				}
			})

			.then((data) => {
				const arrayofMedia = data.titles
				const onlyShows = arrayofMedia.filter((show) => show.type == "tv_series")
				console.log(onlyShows, "HEREEEEEEEE")
				setLabel(onlyShows)
				setMapItem("show")
			})
			// conditional that helps when api reached its limit
			.catch((error) => {
				console.log(error, "There was an error!!!")
			})
	}

	// allows us to filter through the shows within the use state via the map method,
	//  meaning that only the title searched will be mapped.


	const filteredShows = mapItem == "show" && label.length > 0 ? label.filter(
		(show) => {
			const showTitleLower = show.title.toLowerCase()
			const searchLower = search.toLowerCase()
			return showTitleLower.includes(searchLower)
		}

	) : [];

	const filteredFavs = fav.filter((favData)=>favData.show && favData.show.length>0)




	// added this becuase we want to render show season list
	const [seasons, setSeasons] = useState("");


	const post_show = () => {
		const option = {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"showTitle": "Breaking Bad",
				"favorites_id": 2

			})
		}
		fetch(backendUrl  + "/api/post_show", option)
			.then((resp) => {
				return resp.json()
			})

			.then((data) => {
				console.log(data)
			})


		
	}

	const getFavorites=() => {
		fetch(backendUrl + "/api/favorites")
			.then((resp)=> {
				return resp.json()
			})

			.then((data)=> {
				setFav(data)
			})
	}

	// adding to pull show seasons from api


	


	useEffect(() => {
		getFavorites()
		showListFetch()
	}, [])

	console.log(fav,"this is my fav")
return (
		<div style={{ backgroundColor: '#B08EF3' }} className="container-fluid">
		
			<div className="row" height="800px">
				<div className="col-2">
					<div className=" d-inline-flex "> 
							<img src= {profileImageUrl} className="img-fluid rounded-circle mb-4" width="200px" alt="User-Image" />
					</div>
					<div>
						<h5 className=" text-center">Favorite List</h5>
						{fav.length > 0 ?
							filteredFavs.map((show) => {
								// console.log(show, "heres my favorite show")
								return (
									<div className="text-start">
										<ul className="list-unstyled display-8">
											<li className="m-1">
												<img src={star} className="m-3" width="20" height="20" alt="Star-Image" />
												{show.show}
												
											</li>
										</ul>
									</div>
								)
							}) :
							<p className="small text-black-50">please select your favorite shows</p>}

					</div>
				</div>
				<div className="text-center col-8 align-self-end mt-5">
					<div className="">
						<img src={profilehero} className="img-fluid mb-5" width="100"/>
					</div>
					<div className="">
						<h2 className="text-center mb-3"> What Are You Watching?</h2>
						{/* search bar for shows */}
							<form className="text-center d-flex mx-auto col-6" role="search">
								<input
									className="form-control me-2"
									type="search"
									placeholder="Search shows..."
									aria-label="Search"
									value={search}
									onChange={(e) => {
										// setLabel(showList)	
										setSearch(e.target.value)}
									}
									/>
							</form>
					</div>
				</div>
			</div>
				<div className="row">
						<div className="row p-5">
							{label.length === 0 ?
							  "Search Not Found. Please Try again.":
							  mapItem == "show" ? 
							  (filteredShows.map((show) => {
								  return (
									  <div className="text-center col-2" width="">
											<ul className="list-unstyled">
												<li className="m-1"
												
												>
													<Card
													title={show.title} 
													showId={show.id}
													fav={fav}
													setFav={setFav}
													setLabel={setLabel}
													setMapItem={setMapItem}
													/>
												</li>
											</ul>
										</div>
									)
								}))
								: (
									<>

												<div className="text-start text-center">
												<ul className="list-group d-flex align-items-center">
													<li
													className="list-group-item col-4"
													onClick={() => {
														showListFetch();
													
													}}
													style={{
														cursor: "pointer",
														fontWeight: "bold",
														backgroundColor: "#f0f0f0",
													}}
													>
													⬅ BACK TO SHOWS
													</li>
												</ul>
												</div>

								{label.map((season) => {
									return (
										<div className="text-start text-center">
										
											<ul className="list-group d-flex align-items-center ">
												<li class="list-group-item col-4">
												<span className="h3">
													{season.name}
												</span>
												<span className="d-flex justify-content-center align-items-center p-2">

												<button className="btn btn-primary btn-xs" onClick={()=>{console.log("clicked")
														setChatBox({title: season.name, id: season.id});
													}}style={{ cursor: "pointer" }}>Join</button>
												</span>
												</li>
											</ul>

										</div>
					
									);git 
								
									})}
								</>
							)}
							</div>
				
						<div>
											{chatBox && 
											
											(<Chatdemo
											title={chatBox.title}
											id={`${chatBox.id}`}/>
											)}

						</div>
				</div>
		</div>
	);
};