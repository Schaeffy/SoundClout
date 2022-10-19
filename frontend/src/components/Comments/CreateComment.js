import React, { useState } from 'react'
import { Modal } from '../../context/Modal'
import CreateComment from './CreateCommentForm'
import './CreateCommentForm.css'



export default function CreateCommentModal () {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div className='createCommentContainer'>
            <button className='CreateCommentButton' onClick={() => setModalOpen(true)}>Create Comment</button>
            {modalOpen && (<Modal onClose={()=> setModalOpen(false)}>
                <CreateComment setModalOpen={setModalOpen}/>
            </Modal>)}
        </div>
    )
}
