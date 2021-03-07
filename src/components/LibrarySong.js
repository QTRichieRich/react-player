import React from 'react';

const LibrarySong = ({song, setCurrentSong, currentSong, audioRef, isPlaying, songs, setSongs}) => {

  const setCurrentSongHandler = async () => {
    await setCurrentSong(song);

    const newSongs = songs.map((currentSong) => {
      if (currentSong === song) {
        return {
          ...currentSong,
          active: true,
        }
      }else{
        return {
          ...currentSong,
          active: false,
        }
      }
    })

    setSongs(newSongs);
    if (isPlaying) audioRef.current.play();
    
  }
 
  return (
    <div className={`library-song ${song.active? 'selected' : ''}`} onClick={setCurrentSongHandler}>
      <img src={song.cover} alt={song.name + ' | ' + song.artist} title={song.name + ' | ' + song.artist}  />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  )
}

export default LibrarySong;