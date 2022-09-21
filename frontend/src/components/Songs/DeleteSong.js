import React, { useState } from 'react'
import { Modal } from '../../context/Modal'
import DeleteSong from './DeleteSongForm';
import './DeleteSong.css'


export default function DeleteSongModal() {
    const [modalOpen, setModalOpen] = useState(false)



    return (
        <div>
            <button onClick={() => setModalOpen(true)}>Delete Song</button>
            {modalOpen && (<Modal onClose={()=> setModalOpen(false)}>
                <DeleteSong setModalOpen={setModalOpen}/>
            </Modal>)}
        </div>
    )
}
