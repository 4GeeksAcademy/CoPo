import { Link } from "react-router-dom";
import { season } from "../assets/Data/Season.js";
import useGlobalReducer from "../hooks/useGlobalReducer";

// export is to be able to use in other components 
export const Card = ({ title, showId, fav, setFav, setLabel, setMapItem }) => {
  const { store, dispatch } = useGlobalReducer()
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const watchModeBase = import.meta.env.VITE_WATCHMODE_BASE_URL
  const watchModeApi = import.meta.env.VITE_WATCHMODE_API_KEY


  const loggedInUser = localStorage.getItem("user")
  const user = JSON.parse(loggedInUser)
  // console.log(user, "this is my store")

  const post_show = (name, favorites) => {
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "showTitle": name,
        "favorites_id": favorites,
      })
    }
    fetch(backendUrl + "/api/show", option)
      .then((resp) => {
        return resp.json()
      })

      .then((data) => {
        if (data.message = "Show already added!!") {
          console.log("show already exists")
        }
        else {
          console.log(data.showTitle, "new show added to favorites")
          const new_fav = { show: data.showTitle }
          setFav([...fav, new_fav])
        }

      })
  }
  const post_favorites = (user_id) => {
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "user_id": user_id,
      })
    }
    fetch(backendUrl + "/api/favorites", option)
      .then((resp) => {
        return resp.json()
      })

      .then((data) => {
        dispatch({ type: "set_Fav", payload: data })
        post_show(title, data.id)
        // step 1: save the favorite using dispatch (have access to favorite with data parameter on line 23)
        // step 2: post the show (need show title from line 5 and need favorite id that we saved in dispatch)
        // step 3: make GET request using postman of favorites to see if it worked
        console.log(data, "new favorite added")
      })
  }

  const getSeasons = (id) => {
    fetch(watchModeBase + "/title/" + `${id}` + "/seasons/?apiKey=" + watchModeApi)
      .then((resp) => {
        if (resp.ok == false) {
          return season
        } else {
          return resp.json()
        }
      })

      .then((data) => {
        setLabel(data)
        setMapItem("season")
        console.log("SEASONSSSSSSS", data)
      })
  }
    return (
        <div>
            <div className="w-100 card" >
                <img src={`https://cdn.watchmode.com/posters/0${showId}_poster_w185.jpg`} class="card-img-top" alt="..."/>
                {/*can also add extra variable for the image source  */}
                        <div className="card-body">
                        <p className="card-title">{title}</p>
                        <p className="card-text">{}</p>
                        <div className="dropdown d-flex mx-auto ">
            <button
              className="btn btn-primary"
              onClick={() =>
                (getSeasons(showId))}
            >
              Watch Me
            </button>

            <button
              className="btn btn-success"
              type="button"
              onClick={() => {
                console.log(user, "here is my user onclick!")
                post_favorites(user.id)
                dispatch({ type: "set_Fav", payload: title })
              }
              }
            >
              {" "}
              <i className="fa-solid fa-heart"> </i>{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


{/* dispatch: is like calling a helper and notifying of an update/add on 
                       type: is saying put whatever is in here into my favorites box 
                       payload: is saying to add this SHOW-TITLE to my favorites*/}
