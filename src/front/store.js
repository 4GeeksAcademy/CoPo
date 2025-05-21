export const initialStore=()=>{
  return{
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ],
    favorites: null,
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'set_hello':
      return {
        ...store,
        message: action.payload
      };
      
    case 'add_task':

      const { id,  color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };
    default:
      throw Error('Unknown action.');
    case 'set_favs': 
      return {
        ...store,
        favorites: action.payload
      }
  }    
}

// state = your notebook (it holds your favorites list)
// action = a message you send to the librarian telling them what to do


// function setFav(store, action) {
//   switch (action.type) {
//     case "my-likes":
//       return {
//         ...state,
//         favorites: [...store.favorites, action.payload],
//       };
//     // other cases...
//     default:
//       return state;
//   }
// }


//  if(action.type == "my-likes"){
//   if(store?.favorites.includes(action.payload)){return store}
//   return{
//     ...store,
//     favorites: [...store.favorites,action.payload]
//   }