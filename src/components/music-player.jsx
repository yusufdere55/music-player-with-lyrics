import { useEffect, useState, useRef } from "react";
import { useLyrics } from "./useLyrics";
import { Range } from "react-range";

const formatTime = (sec) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const s = Math.floor(sec % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  };

const MusicPlayer = ({src, lrc}) => {
    const audioRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const lyrics = useLyrics(lrc);

    const activeLine = lyrics.findLast((line) => currentTime >= line.time);


    useEffect(() => {
        const interval = setInterval(() => {
            if(audioRef.current)
                setCurrentTime(audioRef.current.currentTime);
        }, 200)
        
        return () => clearInterval(interval);
    },[]);

    const handlePlayPause = () => {
        const audio = audioRef.current;
        if(!audio) return;

        if(isPlaying)
            audio.pause();
        else
            audio.play();

        setIsPlaying(!isPlaying)
    }

    const handleSeek = (values) => {
        const newTime = values[0];
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime)
    }

    return(
        <div className="p-4">

            <audio
                ref={audioRef}
                src={src}
                onLoadedMetadata={(e) => setDuration(e.target.duration)}
                onEnded={() => setIsPlaying(false)}
                hidden
            />

            <div className="flex items-center gap-4 mb-4">
                <button
                    onClick={handlePlayPause}
                    className="bg-white text-black px-4 py-2 rounded shadow"
                >
                    {isPlaying ? "Duraklat" : "Oynat"}
                </button>
                <span className="text-sm text-white/80">
                    {formatTime(currentTime)} / {formatTime(duration)}
                </span>
            </div>

            {/* react-range */}
            <Range
                step={0.1}
                min={0}
                max={duration || 1}
                values={[currentTime]}
                onChange={handleSeek}
                renderTrack={({ props, children }) => (
                <div
                    {...props}
                    className="h-2 w-full bg-gray-600 rounded cursor-pointer"
                >
                    {children}
                </div>
                )}
                renderThumb={({ props }) => (
                <div
                    {...props}
                    className="w-4 h-4 bg-yellow-400 rounded-full shadow-lg focus:outline-none"
                />
                )}
            />

           <div className="mt-4 h-64 overflow-y-auto bg-black/20 p-4 rounded no-scrollbar text-center">
                {lyrics.map((line, index) => (
                <p
                    key={index}
                    className={`transition-all ${
                    activeLine?.time === line.time ? "text-yellow-400 font-bold" : "text-white/70"
                    }`}
                >
                    {line.text}
                </p>
                ))}
            </div>
        </div>
    );
}

export default MusicPlayer;