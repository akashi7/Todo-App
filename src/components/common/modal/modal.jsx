import Modal from 'react-modal'

Modal.setAppElement('#root')

// eslint-disable-next-line react/prop-types
const CustomModal = ({ modalIsOpen, closeModal, darkmode, children }) => {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: darkmode ? '#222831' : 'whitesmoke',
    },
  }
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        {children}
      </Modal>
    </div>
  )
}

export default CustomModal
