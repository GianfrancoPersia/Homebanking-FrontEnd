import React from 'react'
import logoMobile from "../../public/img/PayNow_logotipo_mobile.jpg"
import Anchor from './Anchor';
import { LINKS_NO_AUTH } from '../utils/noAuthLinks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'


const Header = () => {
    return (
        <header className='flex w-full'>
          <nav className='flex items-center p-2 grow justify-between'>
            <img src={logoMobile} alt="logo" className='w-[40px] h-[45px]' />
            <div className='flex gap-5' >
              {/* traigo los links dinamicos */}
              {
                LINKS_NO_AUTH.map((link) => {
                  return (<Anchor key={link.href} href={link.name} text={link.name}></Anchor>)
                })
              }
            </div>
          </nav>
    
        </header>
      )
    }

export default Header