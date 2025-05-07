export function parseLRC(lrcText) {
    const lines = lrcText.split("\n");
    const lyrics = [];

    const timeRegex = /\[(\d+):(\d+\.\d+)\]/;

    for(let line of lines) {
        const match =line.match(timeRegex);

        if(match) {
            const minutes = parseInt(match[1],10);
            const seconds = parseFloat(match[2]);
            const time = minutes * 60 + seconds;

            const text = line.replace(timeRegex, "").trim();
            lyrics.push({time,text});
        }
    }

    return lyrics;
}