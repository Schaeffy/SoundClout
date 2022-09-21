import React, { useState } from 'react'
import { Modal } from '../../context/Modal'
import EditSong from './EditSongForm'
import './EditSong.css'


export default function EditSongModal() {
    const [modalOpen, setModalOpen] = useState(false)



    return (
        <div>
            <button onClick={() => setModalOpen(true)}>Edit Song</button>
            {modalOpen && (<Modal onClose={()=> setModalOpen(false)}>
                <EditSong setModalOpen={setModalOpen}/>
            </Modal>)}
        </div>
    )
}
