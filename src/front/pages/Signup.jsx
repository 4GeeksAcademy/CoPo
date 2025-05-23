import React, { useEffect, useState } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link, useParams } from "react-router-dom";


export const Signup = () => {

	const { store, dispatch } = useGlobalReducer()
	const [name, setName] = useState("")
	const [birthday, setBirthday] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const backendUrl = import.meta.env.VITE_BACKEND_URL


	const signup = () => {
		const option = {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"email": email,
				"password": password,
				"name": name,   
				"age": birthday,

			})
		}
		fetch(backendUrl + "/api/signup", option)
			.then((resp) => {
				return resp.json()
			})
			.then((data) => {
				console.log(data,"Where is my data????")
			})
			.catch((error)=> {
				console.log(error, "The data did not load!!!")
			})
			
	}

	const login = () => {
		const option = {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"email": email,
				"password": password
			})
		}
		fetch(backendUrl  + "/api/login", option)
			.then((resp) => {
				return resp.json()
			})
			.then((data) => {
				console.log(data)
			})
	}
	
	const showList = () => {
		fetch(import.meta.env.VITE_API_URL)
			.then((resp) => {
				return resp.json()
			})

			.then((data) => {
				console.log(data,"Here is my list of shows!!")
			})
			.catch((error)=> {
				console.log(error, "There was an error!!!")
			})
	}
	
	// useEffect(() => {
	// 	// loadMessage()
	// }, [])

	return (
		<div className="vh-100 text-center" style={{ backgroundColor: '#B08EF3', padding: '1rem' }}>
			<h1 className="display-4 fw-bold">Couch Potato </h1>
			<form className="mx-auto" style={{ maxWidth: '300px' }}>
			<div className="mb-3">
				<h2 className="fw-bold p-3">Sign up !</h2>
				<label className="p-2">Enter Your Name</label>
				<input className="form-control" onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="full name" />
			</div>
			<div className="mb-3">
				<label className="p-2">Enter Age</label>
				<input className="form-control" onChange={(e) => setBirthday(e.target.value)} value={birthday} type="age" placeholder="19" />
			</div>
			{/* fix 'type' back to date */}
			<div className="mb-3">
				<label className="p-2">Enter Email</label>
				<input className="form-control" onChange={(e) => setEmail(e.target.value)} value={email} type="text" placeholder="johnapple@hotmail.com" />
			</div>
			<div className="mb-3">
				<label className="p-2">Enter Password</label>
				<input className="form-control" onChange={(e) => setPassword(e.target.value)} value={[password]} type="password" placeholder="" />
			</div>
			</form>
      {/* <-- add a button to see what youre typing---> */}
	  {/* try to see if can add 2nd password input for 'password confirmation' */}


			{/* <div className="alert alert-info"> */}
			<div>
			{/* <button onClick={() => showList()}>Show list button</button>  */} {/* <--this button needs to be added in the 'Profile Page' */}
				<button className="btn fs-5 text-white" onClick={()=>signup()}>
					Create Account
				</button>
				
				
				<div>
					<Link to="/login">Sign In</Link>
				</div>
				
			</div>
				{/* {store.message ? (
					<span>{store.message}</span>
				) : (
					<span className="text-danger">
						Loading message from the backend (make sure your python 🐍 backend is running)...
					</span>
				)} */}
			</div>
		// </div>
		
	);
}; 
