import React, { useEffect, useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link, useParams } from "react-router-dom";
import cute from "../assets/img/cute.png";


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
            <div className="d-flex justify-content-start align-items-center mt-5">
                <h1 className="fw-bold display-3" style={{ marginLeft: '80px' }}>
                     Welcome To...
                </h1>
            </div>
            <div className="d-flex justify-content-center align-items-center">
            <img
                src={cute}
                className="img-fluid"
                width="200px"
                alt="User-Image"
            />
            <h1 className="fw-bold mb-0 align-self-center display-3">
                Couch Potato
            </h1>
            </div>
            <div>
                <h5 className="text-center mt-5">Reliving the good old shows is fun, but sharing the laughs, drama, and plot
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