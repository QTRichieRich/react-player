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
    duration: 0,
    animationPercentage: 0,
  }); 

  const songEndHandler = async (e) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    let newIndex;
    newIndex = (currentIndex === (songs.length - 1)) ? 0 : currentIndex + 1;

    await setCurrentSong(songs[newIndex])
    if (isPlaying) audioRef.current.play();

  }

  const timeUpdateHandler = (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    const animationPercentage = Math.round(currentTime) / Math.round(duration) * 100;

    setSongInfo({
      ...songInfo,
      currentTime,
      duration,
      animationPercentage
    });
  }

  return (
    <div className={`App ${libraryStatus ? 'library-open' : ''}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} setSongs={setSongs} setCurrentSong={setCurrentSong} songs={songs} />
      <Player setSongs={setSongs} setCurrentSong={setCurrentSong} songs={songs} setSongInfo={setSongInfo} songInfo={songInfo} setIsPlaying={setIsPlaying} isPlaying={isPlaying} currentSong={currentSong} audioRef={audioRef} />
      <Library setLibraryStatus={setLibraryStatus} libraryStatus={libraryStatus} setSongs={setSongs} isPlaying={isPlaying} currentSong={currentSong} songs={songs} setCurrentSong={setCurrentSong} audioRef={audioRef} />
      <audio ref={audioRef} src={currentSong.audio} onTimeUpdate={timeUpdateHandler} onLoadedMetadata={timeUpdateHandler} onEnded={songEndHandler} ></audio>

    </div>
  );
}

export default App;
