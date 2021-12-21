import React from 'react'

export const Modal = ({ idToRemove, handleModal, onLoading }) => {
  return (
    <div className='modal modal--active'>
      <div className='modal__content'>
        <button className='modal__close-button' onClick={() => this.props.handleModal()}></button>
        <p className='modal__title'>Are you sure You want to delete this task?</p>
        <div className='button-container'>
          <button className='modal__button--delete' onClick={this.deleteTodoAndCloseModal}>
            Delete
          </button>
          <button className='modal__button--cancel' onClick={() => this.props.handleModal()}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
