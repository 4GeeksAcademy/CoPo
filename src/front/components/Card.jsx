// export is to be able to use in other components 
export const Card = ({title,id,end, onFavorite, isFavorited}) => {
                    //the 3 variables used for making the tags dynamic 
    return (
        <div>
            <div className="w-100 card" >
                <img src={`https://cdn.watchmode.com/posters/0${id}_poster_w185.jpg`} class="card-img-top" alt="..."/>
                {/*can also add extra variable for the image source  */}
                        <div className="card-body">
                        <p className="card-title">{title}</p>
                        <p className="card-text">{}</p>
                        <a href="#" class="btn btn-primary">{end}Seasons</a>
                        {/* ⭐ Favorite Button */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // prevent parent click (like getSeasons)
              onFavorite();
            }}
            className="d-flex btn btn-sm btn-outline-warning mt-2 ms-2"
          >
            {isFavorited ? "★ Favorited" : "☆ Favorite"}
          </button>
                    </div>
            </div>
        </div>
    )
}