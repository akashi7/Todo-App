/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import NavBar from '../components/common/navbar/navBar'
import SideBar from '../components/common/sidebar/sidebar'
import Dashboard from '../components/dashboard/dashboard'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { toggleInBetween } from '../lib/redux/translationSlice'

export default function DashboardRoute() {
  const [modal, setModal] = useState(false)

  const darkMode = useSelector((state) => state.translation.darkMode)

  const dispatch = useDispatch()

  const toogleModal = () => {
    setModal((prev) => !prev)
  }

  const locale = localStorage.getItem('lang') || 'eng'

  const mode = localStorage.getItem('state') || false

  const { t, i18n } = useTranslation()

  useEffect(() => {
    i18n.changeLanguage(locale)
    //eslint-disable-next-line
  }, [locale])

  useEffect(() => {
    dispatch(toggleInBetween(JSON.parse(mode)))
    //eslint-disable-next-line
  }, [mode])

  return (
    <div className={`flex lg:h-[100vh] h-[100%]`}>
      <SideBar
        modal={modal}
        toogleModal={toogleModal}
        darkMode={darkMode}
        t={t}
      />
      <div className={`flex-1 ${darkMode ? 'bg-[#222831]' : ''} h-[100%]`}>
        <NavBar toogleModal={toogleModal} darkMode={darkMode} t={t} />
        <Dashboard darkMode={darkMode} t={t} />
      </div>
    </div>
  )
}
