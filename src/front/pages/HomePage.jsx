import React, { useEffect, useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link, useParams } from "react-router-dom";


export const HomePage = () => {

    return (
        <div style={{ backgroundColor: '#B08EF3', padding: '1rem' }} className= "row vh-100">
            <div className="text-end me-5">
                <h6>
                    <Link to="/login" style={{ color: 'white'}}>
                        Login
                    </Link>
                </h6>
                <h6>
                    <Link to="/signup" style={{ color: 'white'}}>
                        Create An Account
                    </Link>
                </h6>
            </div>
            <h1 className="fw-bold" style={{ marginLeft: '50px' }}>
                Welcome To...
            </h1>
            <div className= "col-5 offset-3 text-center">
                <h1 className="text-end me-auto fw-bold">Couch Potato</h1>
            </div>
            <div className="row">
                <h5 className="text-center">Reliving the good old shows is fun, but sharing the laughs, drama, and plot
                    twits make it unforgettable.
                </h5>
            </div>
            <div>
            <br/>
            <br/>
                <h4 className="text-center fw-bold pb-5">
                    Watch, Chat, Save, Explore!
                </h4>

            </div>
        </div>      
    )
}