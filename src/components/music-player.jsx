import { useEffect, useState, useRef } from "react";
import { useLyrics } from "./useLyrics";
import { Range } from "react-range";
import { FaPause, FaPlay } from "react-icons/fa";

const formatTime = (sec) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const s = Math.floor(sec % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  };

const MusicPlayer = ({song,lrc}) => {
    const audioRef = useRef(null);
    const lineRef = useRef([]);
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

    useEffect(()=> {
        const activeIndex = lyrics.findIndex((line) => line.time === activeLine?.time)
        const el = lineRef.current[activeIndex];
        if(el)
            el.scrollIntoView({ behavior: "smooth", block:"center"})
    }, [activeLine])

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
                src={song?.songsSrc}
                onLoadedMetadata={(e) => setDuration(e.target.duration)}
                onEnded={() => setIsPlaying(false)}
                hidden
            />

            <div className="flex items-center justify-center gap-4 mb-4">
                <button
                    onClick={handlePlayPause}
                    className="bg-white text-black p-4 cursor-pointer rounded-full shadow transition-all active:scale-95 hover:scale-105"
                >
                    {isPlaying ? <FaPause /> : <FaPlay />}
                </button>
            </div>

            <div className="flex flex-row gap-3 w-[60rem] items-center">
                <span className="text-sm text-white/80">
                        {formatTime(currentTime)}
                </span>
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
                <span className="text-sm text-white/80">
                        {formatTime(duration)}
                </span>
            </div>

           <div className="mt-4 h-64 overflow-y-auto relativ p-4 rounded no-scrollbar text-center">
                {lyrics.map((line, index) => (
                <p
                    key={index}
                    ref={(el)=> (lineRef.current[index] = el)}
                    className={`transition-all ${
                        activeLine?.time === line.time
                          ? "text-yellow-400 font-bold"
                          : "text-white/70"
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