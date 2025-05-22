export const initialStore = () => {
  return {
    favorites: [],
  };
};
export default function storeReducer(store, action = {}) {
  if (action.type == "set_Fav") {
    // if(store?.favorites.includes(action.payload)){return store}
    return {
      ...store,
      favorites: [...store.favorites, action.payload],
    };
  }
}

//  if(action.type == "dislike"){
//   return{
//     ...store,
//     favorites: store.favorites.filter((item)=> item != action.payload)
//   }
//  }
//        ^--this is the remove feature

// state = your notebook (it holds your favorites list)
// action = a message you send to the librarian telling them what to do
