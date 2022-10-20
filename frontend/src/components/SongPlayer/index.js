import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css'
import './SongPlayer.css'

export default function SongPlayer() {
    const [songUrl, setSongUrl] = useState('')
    const currentSong = useSelector((state) => state.songPlayer)

    useEffect(() => {
        if (currentSong) {
            setSongUrl(currentSong.url)
        }
    }, [currentSong]);

    return (
        <div className="songPlayerWrapper">
            <div className='songPlayer'>
                <AudioPlayer className='player'
                    src={songUrl}
                    autoPlay={false}
                    onPlay={(e) => console.log("onPlay")}
                />
            </div>
        </div>
    )
}
