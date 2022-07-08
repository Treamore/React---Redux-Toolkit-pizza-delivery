import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const ModalConfirm: React.FC = () => {
  const { modalVisibility } = useSelector((state: RootState) => state.modal);
  return (
    <div className={modalVisibility ? `modal-confirm-visible` : `modal-confirm`}>
      <span>Pizza added to cart</span>
    </div>
  );
};

export default ModalConfirm;
