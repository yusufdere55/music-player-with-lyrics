import MusicPlayer from "./components/music-player"

function App() {
  
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
