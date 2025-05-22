import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import React, { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom";

export const LoginPage = () => {

    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    const backendUrl = import.meta.env.VITE_BACKEND_URL

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

    useEffect(() => {
        }, [])

    return(
        <div className="vh-100 text-center" style={{ backgroundColor: '#B08EF3', padding: '1rem' }}>
            <div>
                <h1 className="main display-4 fw-bold">Couch Potato</h1>
                <h3 className="p-3">Sign in to your Account </h3>
                <label className="p-3">Enter your Email</label>
                <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" placeholder="email" />
            </div>
        
            <div>
                <label className="p-3">Enter your Password </label>
                <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="password" />
                <button className="m-2"onClick={login}>
                    Login
                </button>
                <div>
					<Link to="/resetpassword">Forgot Password?</Link>
				</div>
            </div>
        </div>
    )
}