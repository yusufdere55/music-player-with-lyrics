import { useEffect, useState } from "react"
import MusicPlayer from "./components/music-player"

function App() {
  const [songs,setSongs] = useState([]);

  useEffect(()=> {
    fetch("/songs.json")
      .then((res) => res.json())
      .then((data) => setSongs(data))
  },[])
  
  console.log(songs)
  return (
    <>
      <title>Main Page</title>

      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <MusicPlayer src="/musics/nf-hope.mp3" lrc="/lyrics/nf-hope.lrc" />
      </div>
    </>
  )
}

export default App
