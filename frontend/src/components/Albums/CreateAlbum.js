import React, { useState } from 'react'
import { Modal } from '../../context/Modal'
import CreateAlbum from './CreateAlbumForm'
import './CreateAlbum.css'



export default function CreateAlbumModal () {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div>
            <button className='CreateAlbumButton' onClick={() => setModalOpen(true)}>Create Album</button>
            {modalOpen && (<Modal onClose={()=> setModalOpen(false)}>
                <CreateAlbum setModalOpen={setModalOpen}/>
            </Modal>)}
        </div>
    )
}
