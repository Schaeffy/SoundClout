// frontend/src/components/LoginFormModal/index.js
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';
import './SignupForm.css'

function SignupModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='signupButton' onClick={() => setShowModal(true)}>Create account</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm />
        </Modal>
      )}
    </>
  );
}

export default SignupModal;
