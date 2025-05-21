// export const initialStore=()=>{
//   return{
//     message: null,
//     todos: [
//       {
//         id: 1,
//         title: "Make the bed",
//         background: null,
//       },
//       {
//         id: 2,
//         title: "Do my homework",
//         background: null,
//       }
//     ],
//     favorites: null,
//   }
// }

// export default function storeReducer(store, action = {}) {
//   switch(action.type){
//     case 'set_hello':
//       return {
//         ...store,
//         message: action.payload
//       };
      
//     case 'add_task':

//       const { id,  color } = action.payload

//       return {
//         ...store,
//         todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
//       };
//     default:
//       throw Error('Unknown action.');
//     case 'set_favs': 
//       return {
//         ...store,
//         favorites: action.payload
//       }
//   }    
// }

// state = your notebook (it holds your favorites list)
// action = a message you send to the librarian telling them what to do
 
 if(action.type == "set_Fav"){
  if(store?.fav.includes(action.set_Fav)){return store}
  return{
    ...store,
    fav: [...store.fav,action.set_Fav]
  }
 }
 
//  if(action.type == "dislike"){
//   return{
//     ...store,
//     favorites: store.favorites.filter((item)=> item != action.payload)
//   }
//  }
//        ^--this is the remove feature 
