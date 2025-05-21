// export is to be able to use in other components 
export const Card = ({title,id,end}) => {
                    //the 3 variables used for making the tags dynamic 
    return (
        <div>
            <div className="w-100 card" >
                <img src={`https://cdn.watchmode.com/posters/0${id}_poster_w185.jpg`} class="card-img-top" alt="..."/>
                {/*can also add extra variable for the image source  */}
                        <div className="card-body">
                        <p className="card-title">{title}</p>
                        <p className="card-text">{}</p>
                        <a href="#" class="btn btn-primary">{end}</a>
                       
                       {/* dispatch: is like calling a helper and notifying of an update/add on 
                       type: is saying put whatever is in here into my favorites box 
                       payload: is saying to add this SHOW-TITLE to my favorites*/}
                        <button
                      onClick={() =>
                        dispatch({ type: "set_Fav", payload: show.title }) 
                      }
                    >
                      {" "}
                      <i className="fa-solid fa-heart"> </i>{" "}
                    </button>
                    </div>
            </div>
        </div>
    )
}