import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllSongs } from "../../store/songs";
import SignupModal from "../SignupFormModal/SignupForm";
import LoginFormModal from "../LoginFormModal/LoginForm";
import LoginDemo from "../LoginDemoUser/LoginDemoUser";
import './HomePage.css'



export function HomePage() {
    const dispatch = useDispatch();
    const SignedUser = useSelector((state) => state.session.user)
    const allSongs = useSelector((state) => state.song);

    if(!SignedUser) {
        return (
            <div className="homeNoUser">
                <div className="background">
                <div className='background-image'>
                    <div className="textContainer">
                        <h2 className='homePageHeaderText'>
                            What's next in music is first on SoundClout
                        </h2>
                        <p className='homePageText'>
                            Create your first track and begin your journey towards clout and being kinda famous for almost being famous!
                        </p>
                        <p>
                            Sign up or login
                        </p>
                    </div>

                </div>
                </div>
            </div>
        )
    }

    if (SignedUser) {
        return (
            <div className="homePage">

                <div className="homePageContainer">

                    <h1>
                        Welcome Back
                    </h1>

                </div>

            </div>
        )
    }
    else {
        return (
            <div className='homePage'>
                <h1>
                    Sign Up or Login
                </h1>
            </div>
        )
    }
}
