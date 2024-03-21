import React from 'react'
import logotipo from "../../public/img/PayNow_logotipo.png"
import Anchor from './Anchor';
import { LINKS_HEADER } from '../utils/links';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'


const Header = () => {
  return (
    <header className='flex w-full'>
      <nav className='flex items-center p-2 grow'>
        <img src={logotipo} alt="logo" className='w-[130px] h-[45px]' />

      </nav>

    </header>
  )
}

export default Header