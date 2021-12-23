import React, { useCallback } from 'react'
import { connect } from 'react-redux'
import { deleteTodo } from '../api/api'
import { TODO_DELETE } from '../store/actionTypes'

const Modal = (props) => {
  const { idToRemove, setIsModalOpened, setIsLoading } = props

  const closeModalWindow = useCallback(() => {
    setIsModalOpened(false)
  }, [])

  const deleteTodoAndCloseModal = useCallback(() => {
    setIsLoading(true)
    deleteTodo(idToRemove)
      .then(() => {
        props.deleteTodoAction(idToRemove)
        setIsLoading(false)
        setIsModalOpened(false)
      })
      .catch((err) => console.warn(err))
  }, [idToRemove])

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

export default connect(mapStateToProps, mapDispatchToProps)(Modal)
