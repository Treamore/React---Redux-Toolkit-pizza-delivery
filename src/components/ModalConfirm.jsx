import React from 'react';
import { useSelector } from 'react-redux';

const ModalConfirm = () => {
  const { modalVisibility } = useSelector((state) => state.modal);
  return (
    <div className={modalVisibility ? `modal-confirm-visible` : `modal-confirm`}>
      <span>Pizza added to cart</span>
    </div>
  );
};

export default ModalConfirm;
