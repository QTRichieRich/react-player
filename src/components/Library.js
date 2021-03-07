import React from 'react';
import LibrarySong from './LibrarySong';

const Library = ({songs, currentSong, setCurrentSong, audioRef, isPlaying, setSongs, libraryStatus, setLibraryStatus}) => {
  
  return(
    <div className={`library ${libraryStatus ? 'open' : ''}`}>

      <div className="title-wrapper">
        <h1 className="library-title">Library</h1>
        <div className="close-button" onClick={() => setLibraryStatus(!libraryStatus)} >X</div>
      </div> 
      <div className="library-songs">
        {
          songs.map((song) => {
            return (
              <LibrarySong setSongs={setSongs} currentSong={currentSong} setCurrentSong={setCurrentSong} songs={songs} song={song} key={song.id} audioRef={audioRef} isPlaying={isPlaying} />
            )
          })
        }
      </div>
    </div>
  )
}

export default Library;