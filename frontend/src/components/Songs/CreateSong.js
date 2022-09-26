import React, { useState } from 'react'
import { Modal } from '../../context/Modal'
import CreateSong from './CreateSongForm'
import './CreateSong.css'



export default function CreateSongModal () {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div className='createSongContainer'>
            <button className='CreateSongButton' onClick={() => setModalOpen(true)}>Create Song</button>
            {modalOpen && (<Modal onClose={()=> setModalOpen(false)}>
                <CreateSong setModalOpen={setModalOpen}/>
            </Modal>)}
        </div>
    )
}
