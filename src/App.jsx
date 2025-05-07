import { useEffect, useState } from "react"
import MusicPlayer from "./components/music-player"

function App() {
  const [songs,setSongs] = useState([]);
  const [currentSongs, setCurrentSongs] = useState([]);

  useEffect(()=> {
    fetch("/songs.json")
      .then((res) => res.json())
      .then((data) => {setSongs(data) ,setCurrentSongs(data[0])})
  },[])

  const handleSongsChange = (songs) => {
    setCurrentSongs(songs)
  }
  
  console.log(currentSongs)
  return (
    <>
      <title>Main Page</title>
      <div className="min-h-screen flex-col bg-gray-900 text-white flex items-center justify-around">
        <div className="flex flex-row gap-4 flex-wrap items-center justify-center">
          {songs.map((item, index) => (
            <button key={index} className="cursor-pointer flex flex-row items-center gap-2 min-w-80 bg-black/40 hover:bg-black/70 p-4 rounded" onClick={() => handleSongsChange(item)}>
              <img src={item.image} className="w-24 rounded" alt="" srcset="" />
              <div className="flex flex-col gap items-start">
                <h3 className="font-bold text-lg">{item.name}</h3>
                <p className="font-semibold text-xs">{item.artist}</p>
              </div>
            </button>
          ))}
        </div>
        <MusicPlayer song={currentSongs} lrc={currentSongs.lyricsSrc} />
      </div>
    </>
  )
}

export default App
