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

        {/* <div className='navButton'>
          <SongButton user={sessionUser} />
        </div>

        <div className='navButton'>
          <AlbumButton user={sessionUser} />
        </div>

        <div className='navButton'>
          <ProfileButton user={sessionUser} />
        </div> */}

        <div className='headerLeft'>
          <div>

          </div>
          <ul className='headerLeftList'>
            <li className='headerLeftLink'>
              <NavLink className='headerLeftItem' to='/'>
                <img src='https://a-v2.sndcdn.com/assets/images/brand-1b72dd82.svg' alt='' />
              </NavLink>
            </li>
            <li className='headerLeftLink'>
              <NavLink className='headerLeftItem' to='/'>Home</NavLink>
            </li>
            <li className='headerLeftLink'>
              <NavLink className='headerLeftItem' to='/songs'>Songs
              </NavLink>
            </li>
            <li className='headerLeftLink'>
              <NavLink className='headerLeftItem' to='/albums'>Albums</NavLink>
            </li>
          </ul>
        </div>

        <div className='headerRight'>
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
        {/* <NavLink exact to="/"><button className='homeButton'>Home</button></NavLink> */}
        {isLoaded && sessionLinks}
      </div>
    </div>
  );
}

export default Navigation;
