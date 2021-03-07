import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faAngleLeft, faAngleRight, faPause } from '@fortawesome/free-solid-svg-icons'

const Player = ({currentSong, isPlaying, setIsPlaying, currentTime, totalTime, audioRef, songInfo, songs, setCurrentSong, setSongs }) => {


  const activeLibraryHandler = (nextPrev) => {
    const newSongs = songs.map((cSong) => {
      if (cSong.id === nextPrev.id) {
        return {
          ...cSong,
          active: true,
        }
      }else{
        return {
          ...cSong,
          active: false,
        }
      }
    })

    setSongs(newSongs);
  }

  //Event Handlers
  const playSongHandler = () => {

    if (isPlaying) {
      audioRef.current.pause();
    }else{
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);

  }

  const skipTrackHandler = async (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    let newIndex;

    if (direction === 'skip-forward') {
      newIndex = (currentIndex === (songs.length - 1)) ? 0 : currentIndex + 1;
    }else{
      newIndex = (currentIndex === 0) ? (songs.length - 1) : currentIndex - 1;
      
    }
    await setCurrentSong(songs[newIndex]);
    activeLibraryHandler(songs[newIndex])
    if (isPlaying) audioRef.current.play();
  }

  const dragHandler = (e) => {
    currentTime = e.target.value;
    audioRef.current.currentTime = currentTime;
  }

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  }

  const backCss = {backgroundImage: `linear-gradient(108deg, ${currentSong.color[0]} 0%, ${currentSong.color[1]} 100%)`};
  
  const trackAnimate = {transform: `translateX(${songInfo.animationPercentage}%)`};

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>

        <div className="track" style={backCss}>
          <input type="range" min="0" max={songInfo.duration || 0} value={songInfo.currentTime} onChange={dragHandler} step="0.001" />
          <div className="animate-track" style={trackAnimate}></div>
        </div>

        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} onClick={() => skipTrackHandler('skip-back')} />
        <FontAwesomeIcon className="play" size="2x" icon={(isPlaying) ? faPause : faPlay} onClick={playSongHandler}/>
        <FontAwesomeIcon className="skip-forward" size="2x" icon={faAngleRight} onClick={() => skipTrackHandler('skip-forward')}  />
      </div>
    </div>
  )
}

export default Player;