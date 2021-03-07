import React from 'react';

import getImagePalette from 'image-palette-core'


const Song = ({currentSong, setCurrentSong, songs, setSongs}) => {

  const onloadHandler = (e) => {
      
      if (currentSong.color.length === 0) {
        const imageColors = getImagePalette(e.target);
        currentSong.color = [imageColors.backgroundColor, imageColors.color ];
        setCurrentSong(currentSong);

        const newSongs = songs.map((cSong) => {
          if (cSong.cover === currentSong.cover) {
            return {
              ...cSong,
              color: [imageColors.backgroundColor, imageColors.color ],
            }
          }else{
            return {
              ...cSong,
            }
          }
        })
    
        setSongs(newSongs);
      }
    
  }
 
  return (
    <div className="song-container">
      <img src={currentSong.cover} alt={currentSong.name + ' | ' + currentSong.artist} title={currentSong.name + ' | ' + currentSong.artist} onLoad={onloadHandler}  />
      <h2>{currentSong.name}</h2>
      <h3>{currentSong.artist}</h3>
      <div className="square-wrap">
        <div className="square" style={{backgroundColor: currentSong.color[0]}}></div> 
        <div className="square" style={{backgroundColor: currentSong.color[1]}}></div> 
      </div>
    </div>
  )
}

export default Song;