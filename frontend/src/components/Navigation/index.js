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
  let signed
  if (sessionUser) {
    signed = true
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
                <img id='cloutLogo' src='https://i.imgur.com/uGly1pK.png' alt='' />
                {/* <img id='cloutLogo' src='https://imgur.com/Rmuvso8.png' alt='' /> */}



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
    signed = false
    sessionLinks = (

      <div className='noUserNav'>
        <div className='noUserNavLeft'>
            <img  id='cloutLogo' src='https://i.imgur.com/uGly1pK.png' alt='' />
        </div>
        <div className='noUserNavRight'>
          <div>
            <LoginFormModal />

          </div>

          <div>
            <SignupModal />

          </div>
          <div>
            <LoginDemo />
          </div>

        </div>
      </div>

    );
  }

  return (
    <div className='NavBarContainer'>
      <div className="NavBar" id={signed ? 'NavBarSigned' : 'NavBarNotSigned'}>
        {/* <NavLink exact to="/"><button className='homeButton'>Home</button></NavLink> */}
        {isLoaded && sessionLinks}
      </div>

    </div>

  );
}

export default Navigation;
