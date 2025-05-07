import { useEffect, useState, useRef } from "react";
import { useLyrics } from "./useLyrics";
import { WaveformVisualizer } from "react-audio-visualizer-pro";

const MusicPlayer = ({src, lrc}) => {
    const audioRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const lyrics = useLyrics(lrc);

    const activeLine = lyrics.findLast((line) => currentTime >= line.time);


    useEffect(() => {
        const interval = setInterval(() => {
            if(audioRef.current)
                setCurrentTime(audioRef.current.currentTime);
        }, 200)
        
        return () => clearInterval(interval);
    },[]);

    return(
        <div className="p-4">

            <audio ref={audioRef} controls>
                <source src={src} type="audio/mp3" />
                Tarayıcınız audio etiketini desteklemiyor
            </audio>

           <div className="mt-4 h-64 overflow-y-auto bg-black/20 p-4 rounded">
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