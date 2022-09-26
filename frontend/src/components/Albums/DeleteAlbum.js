import React, { useState } from 'react'
import { Modal } from '../../context/Modal'
import DeleteAlbum from './DeleteAlbumForm';
import './DeleteAlbum.css'


export default function DeleteAlbumModal() {
    const [modalOpen, setModalOpen] = useState(false)



    return (
        <div>
            <button className='DeleteButton' onClick={() => setModalOpen(true)}>Delete Album</button>
            {modalOpen && (<Modal onClose={()=> setModalOpen(false)}>
                <DeleteAlbum setModalOpen={setModalOpen}/>
            </Modal>)}
        </div>
    )
}
