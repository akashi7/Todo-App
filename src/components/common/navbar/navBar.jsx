/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import nightMode from '../../../assets/darkmode.svg'
import france from '../../../assets/france.png'
import menu from '../../../assets/menu.svg'
import menuwhite from '../../../assets/menuwhite.svg'

import searchIcon from '../../../assets/search.png'
import usa from '../../../assets/states.png'
import whiteMode from '../../../assets/whitemode.svg'
import { toggleDarkMode } from '../../../lib/redux/translationSlice'

export default function NavBar({ toogleModal, darkMode }) {
  const dispatch = useDispatch()
  const toogleMode = () => {
    dispatch(toggleDarkMode())
  }
  const { i18n } = useTranslation()
  const handleLocale = (locale) => {
    i18n.changeLanguage(locale)
    localStorage.setItem('lang', locale)
  }

  return (
    <nav
      className={`flex justify-between items-center w-[100%]  p-5 ${
        darkMode ? ' bg-black text-white' : 'text-black bg-white'
      }`}
    >
      <div className=' lg:hidden block'>
        <img
          src={darkMode ? menuwhite : menu}
          alt='searchIcon'
          className='w-5 cursor-pointer '
          onClick={toogleModal}
        />
      </div>
      <div className=' relative'>
        <input
          type='text'
          placeholder='Search '
          className='p-3 bg-[#F5F5F5] lg:w-[350px] w-[240px] rounded-xl'
        />
        <img
          src={searchIcon}
          alt='searchIcon'
          className='w-5 absolute right-3 top-2/4 transform -translate-y-2/4'
        />
      </div>
      <div className=' flex flex-row items-center gap-5'>
        <img
          src={darkMode ? whiteMode : nightMode}
          alt='night'
          className='w-5 hover:cursor-pointer'
          onClick={toogleMode}
        />
        <div className='flex flex-row items-center gap-4'>
          <img
            src={usa}
            alt='usa'
            className='w-5 cursor-pointer '
            onClick={() => handleLocale('eng')}
          />
          <img
            src={france}
            alt='france'
            className='w-5  cursor-pointer'
            onClick={() => handleLocale('fr')}
          />
        </div>
      </div>
    </nav>
  )
}
