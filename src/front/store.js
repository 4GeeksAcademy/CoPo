export const initialStore = () => {
  return {
    favorites: [],
      // [] <-- indicating for an array of favorites
    user: {},
    // {} <-- indicating for only one user at a time
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
  if (action.type == "set_user") {
    const {user} = action.payload
    console.log(user, typeof user, "here is the stores payload!!!")
    return {
      ...store,
      user: "test",
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
