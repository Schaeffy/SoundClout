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

    if (SignedUser) {
        return (
            <div className="homePage">
                <h1>
                    Welcome Back
                </h1>
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