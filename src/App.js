import React, { useRef, useState } from 'react';

import Library from './components/Library';
import Player from "./components/Player";
import Song from "./components/Song";
import Nav from "./components/Nav";

import data from "./data";

import "./styles/app.scss";

function App() {

  // State 
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const [libraryStatus, setLibraryStatus] = useState(false);

  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0
  })

  const timeUpdateHandler = (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;

    setSongInfo({
      ...songInfo,
      currentTime,
      duration
    })
  }

  return (
    <div className="App">
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player setSongInfo={setSongInfo} songInfo={songInfo} setIsPlaying={setIsPlaying} isPlaying={isPlaying} currentSong={currentSong} setCurrentSong={setCurrentSong} audioRef={audioRef} />
      <Library libraryStatus={libraryStatus} setSongs={setSongs} isPlaying={isPlaying} currentSong={currentSong} songs={songs} setCurrentSong={setCurrentSong} audioRef={audioRef} />
      <audio ref={audioRef} src={currentSong.audio} onTimeUpdate={timeUpdateHandler} onLoadedMetadata={timeUpdateHandler} ></audio>

    </div>
  );
}

export default App;
