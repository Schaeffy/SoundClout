// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import { HomePage } from "./components/HomePage/HomePage";
import AllSongs from "./components/Songs";
import SongDetails from './components/Songs/GetOneSong'
import AllAlbums from './components/Albums'
import AlbumDetails from './components/Albums/GetOneAlbum'
import SongPlayer from "./components/SongPlayer";
import UsersSongs from "./components/Songs/CurrentSongs";
import UsersAlbums from "./components/Albums/CurrentAlbums";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector((state) => state.session.user)
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>

          <Route exact path='/'>
            <HomePage />
          </Route>

          <Route exact path='/songs'>
            <AllSongs />
          </Route>

          <Route exact path='/songs/current'>
            <UsersSongs />
          </Route>

          <Route exact path='/songs/:songId'>
            <SongDetails />
          </Route>


          <Route exact path='/albums'>
            <AllAlbums />
          </Route>

          <Route exact path='/albums/current'>
            <UsersAlbums />
          </Route>

          <Route exact path='/albums/:albumId'>
            <AlbumDetails />
          </Route>


        </Switch>
      )}
      <SongPlayer />
    </>
  );
}

export default App;
