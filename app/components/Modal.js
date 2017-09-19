import React from 'react';

const Modal = (props) => {
  let opened = props.modalOpened;
  let self = this;

  const closeModal = (event) => {
    let targ = event.target;
    console.log(self);
    props.closeModal();
  }

  return (
    <div className={opened ? 'modal __opened' : 'modal'}>
      <div className="modal-content">
      
      </div>

      <div className="modal-overlay" onClick={closeModal} ></div>
    </div>
  )
}

export default Modal;