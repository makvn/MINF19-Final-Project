import { useEffect, useState } from 'react';
import Modal from 'react-modal';

type SpinProps = {
  isVisible: boolean;
};

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 99999999999,
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
};

export const Spin = ({ isVisible }: SpinProps) => {
  return (
    <Modal isOpen={isVisible} style={customStyles}>
      <div className="spinner-grow text-success" role="status"></div>
      <div className="spinner-grow text-danger" role="status"></div>
      <div className="spinner-grow text-warning" role="status"></div>
      <div className="spinner-grow text-info" role="status"></div>
    </Modal>
  );
};
