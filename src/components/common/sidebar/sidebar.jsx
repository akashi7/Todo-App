/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import people from '../../../assets/botspeople.png'
import mainIcon from '../../../assets/favis.png'
import file from '../../../assets/file.svg'
import filewhite from '../../../assets/filewhite.svg'
import home from '../../../assets/home.svg'
import homewhite from '../../../assets/homewhite.svg'
import notification from '../../../assets/message.svg'
import notificationwhite from '../../../assets/messagewhite.svg'
import folder from '../../../assets/newfolder.svg'
import profile from '../../../assets/profile.svg'
import profilewhite from '../../../assets/profilewhite.svg'
import settings from '../../../assets/settings.svg'
import settingswhite from '../../../assets/settingswhite.svg'

export default function SideBar({ modal, toogleModal, darkMode }) {
  return (
    <>
      <section
        className={`lg:w-[100px] hidden  lg:block    h-[100%] relative ${
          darkMode
            ? 'bg-[#222831]'
            : 'bg-white border border-r  border-gray-100  '
        }`}
      >
        <div className='flex justify-center mt-5'>
          <img src={mainIcon} alt='main' />
        </div>
        <div className=' mt-10'>
          <div className=' w-full h-[65px] flex justify-center '>
            <img
              src={darkMode ? homewhite : home}
              alt='home'
              className='w-8  '
            />
          </div>
          <div className=' w-full h-[65px] flex justify-center '>
            <img
              src={darkMode ? filewhite : file}
              alt='file'
              className='w-8  '
            />
          </div>
          <div className=' w-full  h-[65px] flex justify-center '>
            <img
              src={darkMode ? notificationwhite : notification}
              alt='notification'
              className='w-8  '
            />
          </div>
          <div
            className={`w-full   border-l-[6px] h-[65px] rounded-l-lg  shadow-left  flex justify-center  border-[#3656C4] `}
          >
            <img
              src={folder}
              alt='folder'
              className={`modal-open w-8 `}
              data-testid='folder'
            />
          </div>
        </div>
        <div className='mt-10'>
          {darkMode ? null : (
            <img src={people} alt='people' className={`block`} />
          )}
        </div>

        <div className='flex justify-center '>
          <div className='absolute bottom-0'>
            <img
              src={darkMode ? settingswhite : settings}
              alt='settings'
              className='w-8 mb-5'
            />
            <img
              src={darkMode ? profilewhite : profile}
              alt='profile'
              className='w-8 mb-5'
            />
          </div>
        </div>
      </section>
      <Drawer
        open={modal}
        onClose={toogleModal}
        direction='left'
        size={100}
        style={
          darkMode
            ? { backgroundColor: '#222831' }
            : { backgroundColor: 'white' }
        }
      >
        <section
          className={`w-[100px]   h-[100%] relative ${
            darkMode
              ? 'bg-[#222831]'
              : 'bg-white border border-r border-gray-100  '
          }`}
        >
          <div className='flex justify-center mt-5'>
            <img src={mainIcon} alt='mains' />
          </div>
          <div className=' mt-10'>
            <div className=' w-full h-[65px] flex justify-center '>
              <img src={home} alt='homes' className='w-8  ' />
            </div>
            <div className=' w-full h-[65px] flex justify-center '>
              <img src={file} alt='files' className='w-8  ' />
            </div>
            <div className=' w-full  h-[65px] flex justify-center '>
              <img src={notification} alt='notifications' className='w-8  ' />
            </div>
            <div className=' w-full   border-l-[6px] h-[65px] rounded-l-lg  shadow-left  flex justify-center  border-[#3656C4] '>
              <img src={folder} alt='folders' className='w-8   ' />
            </div>
          </div>
          <div className='mt-10'>
            {darkMode ? null : (
              <img src={people} alt='peoples' className={`block`} />
            )}
          </div>

          <div className='flex justify-center '>
            <div className='absolute bottom-0'>
              <img src={settings} alt='settingss' className='w-8 mb-5' />
              <img src={profile} alt='profiles' className='w-8 mb-5' />
            </div>
          </div>
        </section>
      </Drawer>
    </>
  )
}
