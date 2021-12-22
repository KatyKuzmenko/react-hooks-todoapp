import React from 'react'
import { connect } from 'react-redux'
import { deleteTodo } from '../api/api'
import { TODO_DELETE } from '../store/actionTypes'

const mapStateToProps = (state) => {
  return {
    todos: state,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteTodoAction: (id) => {
      dispatch({ type: TODO_DELETE, options: { id } })
    },
  }
}

const Modal = (props) => {
  const { idToRemove, setIsModalOpened, setIsLoading } = props

  const closeModalWindow = () => {
    setIsModalOpened(false)
  }

  const deleteTodoAndCloseModal = () => {
    setIsLoading(true)
    deleteTodo(idToRemove)
      .then(() => {
        props.deleteTodoAction(idToRemove)
        setIsLoading(false)
        setIsModalOpened(false)
      })
      .catch((err) => console.warn(err))
  }

  return (
    <div className='modal modal--active'>
      <div className='modal__content'>
        <button className='modal__close-button' onClick={closeModalWindow}></button>
        <p className='modal__title'>Are you sure You want to delete this task?</p>
        <div className='button-container'>
          <button className='modal__button--delete' onClick={deleteTodoAndCloseModal}>
            Delete
          </button>
          <button className='modal__button--cancel' onClick={closeModalWindow}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)
