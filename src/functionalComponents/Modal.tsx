import React, { useCallback } from 'react'
import { connect } from 'react-redux'
import { TodosActionsTypes } from '../types/actionTypes'
import { State } from '../types/StatesTypes'

type Props = {
  isModalOpened: boolean
  idToRemove: number | null
  onModalClose: () => void
  deleteTodoRequest: (id: number | null) => void
}

const Modal = ({ isModalOpened, idToRemove, onModalClose, deleteTodoRequest }: Props) => {
  const closeModalWindow = useCallback(() => {
    onModalClose()
  }, [])

  const deleteTodoAndCloseModal = useCallback(() => {
    deleteTodoRequest(idToRemove)
    onModalClose()
  }, [idToRemove])

  if (isModalOpened) {
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

  return null
}

const mapStateToProps = (state: State) => {
  return {
    todos: state.todos,
    loading: state.app.loading,
  }
}

const mapDispatchToProps = (
  dispatch: (action: { type: string; payload: { id: number | null } }) => void
) => {
  return {
    deleteTodoRequest: (id: number | null) => {
      dispatch({ type: TodosActionsTypes.DELETE_TODO_REQUEST, payload: { id } })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)
