import React, { useState } from 'react'
import { Modal } from '../../context/Modal'
import EditAlbum from './EditAlbumForm'
import './EditAlbum.css'


export default function EditAlbumModal() {
    const [modalOpen, setModalOpen] = useState(false)



    return (
        <div>
            <button className='EditButton' onClick={() => setModalOpen(true)}>Edit Album</button>
            {modalOpen && (<Modal onClose={()=> setModalOpen(false)}>
                <EditAlbum setModalOpen={setModalOpen}/>
            </Modal>)}
        </div>
    )
}
