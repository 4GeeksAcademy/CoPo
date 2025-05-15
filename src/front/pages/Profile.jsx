import React, { useEffect, useState } from "react";
import profileImageUrl from "../assets/img/Profile-Image-1.jpg"; 
import star from "../assets/img/star.png";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Card } from "../components/Card.jsx";
// import '../style.css';





export const Profile = () => {

	const { store, dispatch } = useGlobalReducer()
	const backendUrl = import.meta.env.VITE_BACKEND_URL
	const apiKey = import.meta.env.VITE_API_KEY
	const watchModeBase = import.meta.env.VITE_WATCHMODE_BASE_URL
	const watchModeApi = import.meta.env.VITE_WATCHMODE_API_KEY

	// added this becuase we are filling the favorites object 
	const [fav, setFav] = useState("");

	// added this in case it is needed to map a list
	const favoritedShow = []; 

	// added this becuase we want to render show list
	const [showList, setshowList] = useState([]);

	// added this for the search functionality
	const [search, setSearch] = useState("");

	const [episode, setEpisode] = useState([])

	const matchesSearch = (showList, search) => {
		return showList.title.toLowerCase().includes(search.toLowerCase());
	};

	const showListFetch = () => {
		fetch(watchModeBase+"/list-titles/?apiKey="+ watchModeApi)
			.then((resp) => {
				return resp.json()
			})

			.then((data) => {
				const arrayofMedia = data.titles
				const onlyShows = arrayofMedia.filter((show) => show.type == "tv_series")
				console.log(onlyShows, "HEREEEEEEEE")
				setshowList(onlyShows)
			})
			.catch((error) => {
				console.log(error, "There was an error!!!")
			})
	}

	// allows us to filter through the shows within the use state via the map method,
	//  meaning that only the title searched will be mapped.


	const filteredShows = showList.filter(
		(show) => {
			const showTitleLower = show.title.toLowerCase()
			const searchLower = search.toLowerCase()
			return showTitleLower.includes(searchLower)
		}

	);


	// added this becuase we want to render show season list
	const [seasons, setSeasons] = useState("");


	const post_favorites = () => {
		const option = {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"user": "Brandon-Ray",
			})
		}
		fetch(backendUrl  + "/api/post_favorites", option)
			.then((resp) => {
				return resp.json()
			})

			.then((data) => {
				console.log(data)
			})
	}

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

	const getShowList=() => {
		fetch(backendUrl + "/api/showList")
			.then((resp)=> {
				return resp.json()
			})

			.then((data) => {
				setshowList(data)
			})
	}


	// this is used to render the shows in tandem with the get request 
	// Shae's creating & the useState above:

	// const getShowList=() => {
	// 	fetch(backendUrl + "/api/showList")
	// 		.then((resp)=> {
	// 			return resp.json()
	// 		})

	// 		.then((data)=> {
	// 			setshowList(data)
	// 		})
	// }


	// below wokring on the code to render the episode list of the selected show season
        const getEpisodes = () => {
        	fetch(watchModeBase+ "/title/3197275/episodes/?apiKey="+ watchModeApi)
            .then((resp) => {
                return resp.json()
            })
            .then((data) => {
                console.log("episode list is here",data);
                if (data.episodes) {
                    setEpisode(data.episodes);
                }
            })
			
	}

	useEffect(() => {
		getFavorites()
		showListFetch()
		getEpisodes()
		getShowList()
	}, [])

	// this is used to render the shows in tandem with the get request 
	// Shae's creating & the useState above:

	// const getShowList=() => {
	// 	fetch(backendUrl + "/api/showList")
	// 		.then((resp)=> {
	// 			return resp.json()
	// 		})

	// 		.then((data)=> {
	// 			setshowList(data)
	// 		})
	// }

	return (
		<div style={{ backgroundColor: '#B08EF3', padding: '1rem' }} className="vh-100">
			{/* <h1 className="display-6 mt-5">Welcome, @Bianca_23</h1> */}
			<p className="lead">
				{/* <h1>Welcome, ${user}</h1>  will need to come back and update so it is personalized */}
			</p>
			<div>
				<div className="col-4 ">
					<img src={profileImageUrl} className="img-fluid rounded-circle w-50 mb-5" alt="User-Image" />

				</div>
			</div>
			<div className="d-inline-flex col-12">
				<div>
					<h5 className="text-center">Favorite List</h5>
					{fav.length > 0 ?
						fav.map((show) => {
							return (
								<div className="text-start">
									<ul className="list-unstyled display-8">
										<li className="m-1">
											<img src={star} className="m-3" width="20" height="20" alt="Star-Image" />
											{show.showTitle}
										</li>
									</ul>
								</div>
							)
						}) :
						<p className=" small text-black-50">please select your favorite shows</p>}
				</div>


				<div className="text-center col-8 mt-4">
					<div className="">
						<h2 className="text-center pb-5">What Are You Watching?</h2>
						{/* search bar for shows */}
						<div className="mx-auto col-4">
							<form className="text-center d-flex" role="search">
								<input
									className="form-control me-2"
									type="search"
									placeholder="Search shows..."
									aria-label="Search"
									value={search}
									onChange={(e) => setSearch(e.target.value)}
								/>
							
								{/* <button className="btn btn-outline-primary" type="submit">
									Search
								</button> */}
							</form>
							{showList.length === 0 ?
							  "Search Not Found. Please Try again.":
								showList.map((show) => {
									return (
										<div className="text-start">
											<ul className="list-unstyled display-8">
												<li className="m-1">
													{show.title}
												</li>
											</ul>
										</div>

									)
								})}
						</div>
					</div>
			{/* //mapping for episode list goes in the div below */}
					{/* <div>
						{episodes.map(
							()=>{
								
							}

							)}

					</div> */}
				</div>
			</div>
		</div>
	);
};

// you'll need to find a way to set a condition to where if array is empty we see a string that say's "search not found. please try again" otherwise, it shows content.
