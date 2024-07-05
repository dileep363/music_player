
function SongList({ songs, onPlaySong }:any) {
  return (
    <div className="song-list">
      {/* {songs?.map((song:any) => (
        <div key={song.id} className="song" onClick={() => onPlaySong(song)}>
          <img src={`https://cms.samespace.com/assets/${song.cover}`} alt={song.title} />
          <div>
            <h2>{song.title}</h2>
            <p>{song.artist}</p>
          </div>
        </div>
      ))} */}
    </div>
  );
}

export default SongList;
