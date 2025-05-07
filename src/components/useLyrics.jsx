import { useEffect, useState } from "react";
import { parseLRC } from "../utils/parceLRC";

export function useLyrics(lrcPath) {
    const [ lyrics, setLyrics] = useState([]);

    useEffect(() => {
        fetch(lrcPath)
            .then((res) => res.text())
            .then((text) => {
                const parsed = parseLRC(text)
                setLyrics(parsed);
            })
    },[lrcPath])

    return lyrics;
}