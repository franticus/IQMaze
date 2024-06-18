import React from 'react';
import ReactDOM from 'react-dom';
import s from './Modal.module.scss';

const Modal = ({ children, onClose }) => {
  return ReactDOM.createPortal(
    <div className={s.modalOverlay} onClick={onClose}>
      <div className={s.modalContent} onClick={e => e.stopPropagation()}>
        <button className={s.closeButton} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default Modal;
