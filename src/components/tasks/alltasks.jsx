/* eslint-disable react/prop-types */
import { useCallback, useEffect, useRef, useState } from 'react'
import { useToasts } from 'react-toast-notifications'
import dots from '../../assets/dotss.svg'
import dotswhite from '../../assets/dotsswhite.svg'
import people from '../../assets/manyico.png'
import message from '../../assets/messages.svg'
import messagewhite from '../../assets/messageswhite.svg'
import handleAPIRequests from '../../helpers/handleApiRequest'
import { useDeleteTodoMutation, useEditTodoMutation } from '../../lib/api/todo'

export default function AllTasks({ todos, darkMode, t }) {
  const [openMenuIndex, setOpenMenuIndex] = useState(null)

  const menuRef = useRef(null)

  const { addToast } = useToasts()

  const [editTodo] = useEditTodoMutation()
  const [deleteTodo] = useDeleteTodoMutation()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuIndex(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleToggleMenu = useCallback((idx) => {
    setOpenMenuIndex((prevIdx) => (prevIdx === idx ? null : idx))
  }, [])

  const handleEdit = useCallback((todo) => {
    let isCompleted = todo.completed === true ? false : true
    handleAPIRequests({
      request: editTodo,
      id: todo.id,
      completed: isCompleted,
      onSuccess: onEditSuccess,
    })
    //eslint-disable-next-line
  }, [])

  const handleDelete = useCallback((todo) => {
    handleAPIRequests({
      request: deleteTodo,
      id: todo.id,
      onSuccess: onDeleteSuccess,
    })
    //eslint-disable-next-line
  }, [])

  const onEditSuccess = () => {
    addToast(`${t('Edited Successfully')}`, {
      appearance: 'success',
      autoDismiss: true,
    })
    setOpenMenuIndex(null)
  }

  const onDeleteSuccess = () => {
    addToast(`${t('Deleted Successfully')}`, {
      appearance: 'success',
      autoDismiss: true,
    })
    setOpenMenuIndex(null)
  }

  return (
    <div className='flex flex-wrap justify-center lg:justify-start'>
      {todos?.map((todo, idx) => {
        return (
          <div
            className={`lg:w-[20%] w-[90%] p-5 rounded-2xl lg:m-5 m-0 lg:mb-0 mb-5 relative ${
              darkMode ? 'bg-[#222831]' : 'bg-white'
            }`}
            key={idx}
          >
            <div className='flex justify-between items-center'>
              <p
                className={`w-fit bg-gray-200 p-2 rounded-xl ${
                  todo?.completed ? 'text-green-400' : 'text-blue-400'
                }`}
              >
                {todo?.completed ? `${t('Completed')}` : `${t('In progress')}`}
              </p>
              <img
                src={darkMode ? dotswhite : dots}
                alt='dots'
                className='w-6 hover:cursor-pointer'
                onClick={() => handleToggleMenu(idx)}
              />
            </div>
            <h2 className='mt-5'>{todo?.todo}</h2>
            <div className='w-full h-px bg-gray-500 my-4'></div>
            {openMenuIndex === idx && (
              <div
                ref={menuRef}
                className={`absolute right-0 top-[64px]  z-30 p-5 ${
                  darkMode ? 'bg-black text-white' : 'bg-[#F5F5F5] text-black'
                }`}
              >
                <div className='flex gap-4 flex-col cursor-pointer'>
                  <p onClick={() => handleEdit(todo)}>{t('Edit')}</p>
                  <p onClick={() => handleDelete(todo)}>{t('Delete')}</p>
                </div>
              </div>
            )}
            <div className='flex justify-between items-center'>
              <img src={people} alt='people' className=' rounded-md' />
              <div className='flex flex-row items-center gap-4'>
                <img
                  src={darkMode ? messagewhite : message}
                  alt='message'
                  className='w-6'
                />
                <p> 3 </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
