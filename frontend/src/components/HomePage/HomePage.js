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
    const songs = useSelector((state) => state.song)
    const allSongs = Object.values(songs)

    useEffect(() => {
        dispatch(getAllSongs())
    }, [dispatch]);

    if (!SignedUser) {
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

                <div className='musicContainer'>
                    <h1>Hear what is new from the Clout Community</h1>

                    <div className='allSongsContainer'>

                        {allSongs.map((song) => {
                            return (
                                <div className='songCardContainer' key={song.id}>

                                    <div className='songCardInnerContainer'>

                                        <div className='songCardImage'>

                                            <img src={song.imageUrl} alt='' />

                                        </div>

                                        <div className='songInfo'>

                                            <div>
                                                Title: <NavLink to={`/songs/${song.id}`}>{song.title}</NavLink>
                                            </div>
                                            <div>
                                                Artist: {song.Artist.username}
                                            </div>

                                        </div>

                                    </div>

                                </div>

                            )
                        })}

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
