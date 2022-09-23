// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupModal from '../SignupFormModal'
import LoginDemo from '../LoginDemoUser/LoginDemoUser';
import SongButton from './SongButton';
import AlbumButton from './AlbumButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className='userNav'>

        <div className='songButton'>
          <SongButton user={sessionUser} />
        </div>

        <div className='albumButton'>
          <AlbumButton user={sessionUser} />
        </div>

        <div className='profileButton'>
          <ProfileButton user={sessionUser} />
        </div>

      </div>
    );
  } else {
    sessionLinks = (
      <>
        <div className='noUserNav'>
          <LoginFormModal />
          <SignupModal />
          <LoginDemo />
        </div>
      </>
    );
  }

  return (
    <div className="NavBarContainer">
      <div className='userNav'>
        <NavLink exact to="/">Home</NavLink>
        {isLoaded && sessionLinks}
      </div>
    </div>
  );
}

export default Navigation;
