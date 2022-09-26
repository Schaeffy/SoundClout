import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { actionResetSongs, getAllSongs } from "../../store/songs";
import SignupModal from "../SignupFormModal/SignupForm";
import LoginFormModal from "../LoginFormModal/LoginForm";
import LoginDemo from "../LoginDemoUser/LoginDemoUser";
import './HomePage.css'
import { actionPlaySong } from '../../store/songPlayer';



export function HomePage() {
    const dispatch = useDispatch();
    const SignedUser = useSelector((state) => state.session.user)
    const songs = useSelector((state) => state.song)
    const allSongs = Object.values(songs)

    useEffect(() => {
        dispatch(getAllSongs())
        return () => dispatch(actionResetSongs())
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

                    <div>

                        <div className='allSongsContainer'>

                            {allSongs.map((song) => {
                                return (
                                    <div className='songCardContainer' key={song.id}>

                                        <div className='songCardInnerContainer'>

                                            <div className='songCardImage'>
                                                <div className='playButtonContainer'>
                                                    <img id='playButton' onClick={() => dispatch(actionPlaySong(song))} src='https://peakstate.global/wp-content/uploads/2016/09/icon-soundcloud-play.png' alt='' />

                                                </div>

                                                <img src={song.imageUrl} alt='' />

                                            </div>

                                            <div className='songInfo'>

                                                <div>
                                                    <NavLink className='songLink' to={`/songs/${song.id}`}>{song.title}</NavLink>
                                                </div>
                                                {/* <div>
                                                    Artist: {song.Artist.username}
                                                </div> */}

                                            </div>

                                        </div>

                                    </div>

                                )
                            })}

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
                        Welcome Back!
                        Here's some music to get started.
                    </h1>

                    <div className='allSongsContainer'>

                            {allSongs.map((song) => {
                                return (
                                    <div className='songCardContainer' key={song.id}>

                                        <div className='songCardInnerContainer'>

                                            <div className='songCardImage'>
                                                <div className='playButtonContainer'>
                                                    <img id='playButton' onClick={() => dispatch(actionPlaySong(song))} src='https://peakstate.global/wp-content/uploads/2016/09/icon-soundcloud-play.png' alt='' />

                                                </div>

                                                <img src={song.imageUrl} alt='' />

                                            </div>

                                            <div className='songInfo'>

                                                <div>
                                                    <NavLink className='songLink' to={`/songs/${song.id}`}>{song.title}</NavLink>
                                                </div>
                                                {/* <div>
                                                    Artist: {song.Artist.username}
                                                </div> */}

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
