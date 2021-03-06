import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faAngleLeft, faAngleRight, faPause } from '@fortawesome/free-solid-svg-icons'

const Player = ({currentSong, isPlaying, setIsPlaying, currentTime, totalTime, audioRef, songInfo }) => {


  //Event Handlers
  const playSongHandler = () => {

    if (isPlaying) {
      audioRef.current.pause();
    }else{
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);

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


  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input type="range" min="0" max={songInfo.duration || 0} value={songInfo.currentTime} onChange={dragHandler} step="0.001" />
        <p>{getTime(songInfo.duration || 0)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} />
        <FontAwesomeIcon className="play" size="2x" icon={(isPlaying) ? faPause : faPlay} onClick={playSongHandler}/>
        <FontAwesomeIcon className="skip-forward" size="2x" icon={faAngleRight} />
      </div>
    </div>
  )
}

export default Player;