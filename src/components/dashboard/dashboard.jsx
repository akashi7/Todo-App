/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Form, Formik } from 'formik'
import { useCallback, useState } from 'react'
import add from '../../assets/add.svg'
import down from '../../assets/down.svg'
import filter from '../../assets/filter.svg'
import addwhite from '../../assets/addwhite.svg'
import downwhite from '../../assets/downwhite.svg'
import filterwhite from '../../assets/filterwhite.svg'
import link from '../../assets/link.svg'
import lock from '../../assets/lock.svg'
import lockwhite from '../../assets/lockwhite.svg'

import logos from '../../assets/logos.png'
import people from '../../assets/people.png'
import { useGetTodosQuery } from '../../lib/api/todo'
import { InputText } from '../common/input/input'
import AllTasks from '../tasks/alltasks'
import CustomModal from '../common/modal/modal'
import { useAddTodoMutation } from '../../lib/api/todo'
import handleAPIRequests from '../../helpers/handleApiRequest'
import { useToasts } from 'react-toast-notifications'

export default function Dashboard({ darkMode, t }) {
  const { data: todos, isFetching: isLoading } = useGetTodosQuery({})

  const [filteredTodos, setFilteredTodos] = useState([])

  const [activeFilter, setActiveFilter] = useState('all')

  const initialValues = {
    todo: '',
    completed: false,
    userId: 8,
  }

  const { addToast } = useToasts()

  const [addTodo] = useAddTodoMutation()

  const handleFilter = useCallback(
    ({ completed }) => {
      const filtered = todos?.todos.filter(
        (todo) => todo.completed === completed
      )
      setFilteredTodos(filtered)
    },
    [todos]
  )

  const reset = useCallback(() => {
    setFilteredTodos([])
  }, [])

  const handleNavigation = useCallback((filter) => {
    setActiveFilter(filter)
  }, [])

  const [modal, setModal] = useState(false)

  const toggleModal = () => {
    setModal((prev) => !prev)
  }

  const onAddSuccess = () => {
    addToast('Todo addedd Successfully', {
      appearance: 'success',
      autoDismiss: true,
    })
    toggleModal()
  }

  const handleSubmit = (values) => {
    handleAPIRequests({
      request: addTodo,
      ...values,
      onSuccess: onAddSuccess,
    })
  }
  //webcreative
  return (
    <>
      <section
        className={`lg:p-10 p-5  h-[90vh] overflow-y-auto ${
          darkMode ? ' bg-black text-white' : 'bg-gray-100 text-black'
        }`}
      >
        <div className='w-[100%]'>
          <div className='flex lg:justify-between flex-col lg:gap-0 gap-4 lg:flex-row lg:items-center'>
            <p className=' text-gray-500'>
              {t('workspace')} &nbsp;&gt; &nbsp;{t('creative')} &nbsp; &gt;{' '}
              <span className=''>&nbsp;{t('webcreative')}</span>
            </p>
            <p>{t('From 23 April')}</p>
          </div>
          <div className='mt-10 flex lg:justify-between lg:flex-row lg:gap-0 gap-4 lg:items-center flex-col'>
            <h2 className=' text-4xl font-semibold'> {t('Website Design')}</h2>
            <div className='flex flex-row items-center gap-5'>
              <div className='w-4 h-4 rounded-full bg-green-500'></div>
              <p className=' text-gray-500'>{t('Updated 12 min ago')}</p>
            </div>
          </div>
          <div className='flex lg:justify-between lg:items-center  mt-10 lg:gap-0 gap-3'>
            <div className=' flex  gap-5 flex-row lg:flex-row'>
              <div className='flex flex-row items-center gap-4'>
                <img
                  src={darkMode ? lockwhite : lock}
                  alt='lock'
                  className='w-5'
                />
                <p>{t('Limited access')}</p>
                <img
                  src={darkMode ? downwhite : down}
                  alt='down'
                  className='w-5'
                />
              </div>
              <div className='h-16 w-1 bg-gray-300 hidden lg:block'></div>
              <img src={people} alt='people' className='w-[40%] lg:w-[55%]' />
            </div>
            <div className='lg:flex flex-row gap-5 hidden '>
              <img src={link} alt='link' className='w-10' />
              <div className='h-16 w-1 bg-gray-300'></div>
              <img src={logos} alt='logo' className='w-30' />
            </div>
          </div>
          <div
            className={`mt-10  flex justify-between items-center h-[80px]  rounded-2xl ${
              darkMode ? ' bg-[#222831]' : 'bg-white'
            } `}
          >
            <div className='flex flex-row items-center gap-8 m-5'>
              <div
                className={`flex flex-row items-center gap-5  h-[80px]  hover:cursor-pointer ${
                  activeFilter === 'all' &&
                  'border-b-8 border-[#3656C4] rounded-b-lg'
                } `}
                onClick={() => {
                  reset()
                  handleNavigation('all')
                }}
              >
                <p
                  className={` ${
                    activeFilter === 'all' ? 'text-[#3656C4]' : 'text-gray-500'
                  } `}
                >
                  {t('All task')}
                </p>
                <p className='text-[#3656C4]  bg-gray-300 p-1 rounded-md w-[40px] text-center'>
                  {todos?.todos?.length}
                </p>
              </div>
              <div
                className={`flex flex-row items-center gap-5 h-[80px] hover:cursor-pointer ${
                  activeFilter === 'inProgress' &&
                  'border-b-8 border-[#3656C4] rounded-b-lg'
                }`}
                onClick={() => {
                  handleFilter({ completed: false })
                  handleNavigation('inProgress')
                }}
              >
                <p
                  className={` ${
                    activeFilter === 'inProgress'
                      ? 'text-[#3656C4]'
                      : 'text-gray-500'
                  } `}
                >
                  {t('In progress')}{' '}
                </p>
                <p className='text-[#3656C4] bg-gray-300 p-1 rounded-md w-[40px] text-center'>
                  {
                    todos?.todos?.filter((todo) => todo.completed === false)
                      ?.length
                  }
                </p>
              </div>
              <div
                className={`flex flex-row items-center gap-5 h-[80px] hover:cursor-pointer ${
                  activeFilter === 'completed' &&
                  'border-b-8 border-[#3656C4] rounded-b-lg'
                }`}
                onClick={() => {
                  handleFilter({ completed: true })
                  handleNavigation('completed')
                }}
              >
                <p
                  className={` ${
                    activeFilter === 'completed'
                      ? 'text-[#3656C4]'
                      : 'text-gray-500'
                  } `}
                >
                  {t('Completed')}
                </p>
                <p className='text-[#3656C4] bg-gray-300 p-1 rounded-md w-[40px] text-center'>
                  {
                    todos?.todos?.filter((todo) => todo.completed === true)
                      ?.length
                  }
                </p>
              </div>
            </div>
            <div className='lg:flex flex-row items-center gap-5 px-5 hidden'>
              <div className='border border-gray-300 p-2 flex flex-row items-center gap-5 rounded-xl'>
                <img
                  src={darkMode ? filterwhite : filter}
                  alt='filter'
                  className='w-5'
                />
                <p> {t('Filter & sort')}</p>
              </div>
              <div
                className='border border-gray-300 p-2 flex flex-row items-center gap-5 rounded-xl cursor-pointer'
                onClick={toggleModal}
              >
                <img
                  src={darkMode ? addwhite : add}
                  alt='add'
                  className='w-5'
                />
                <p>{t('New task')}</p>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-row items-center gap-5 lg:hidden mt-5'>
          <div className='border border-gray-300 p-2 flex flex-row items-center gap-5 rounded-xl'>
            <img
              src={darkMode ? filterwhite : filter}
              alt='filter'
              className='w-5'
            />
            <p> {t('Filter & sort')}</p>
          </div>
          <div
            className='border border-gray-300 p-2 flex flex-row items-center gap-5 rounded-xl cursor-pointer'
            onClick={toggleModal}
          >
            <img src={darkMode ? addwhite : add} alt='add' className='w-5' />
            <p>{t('New task')}</p>
          </div>
        </div>
        <div className='mt-10 w-full'>
          <AllTasks
            todos={filteredTodos.length > 0 ? filteredTodos : todos?.todos}
            darkMode={darkMode}
            t={t}
          />
        </div>
      </section>
      {modal && (
        <CustomModal modalIsOpen={modal} closeModal={toggleModal}>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form className='flex flex-col gap-4'>
              <InputText name='todo' label={'Todo'} placeholder='Add todo ' />
              <button
                type='submit'
                className='w-[100%] bg-blue text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              >
                {t('Submit')}
              </button>
            </Form>
          </Formik>
        </CustomModal>
      )}
    </>
  )
}
