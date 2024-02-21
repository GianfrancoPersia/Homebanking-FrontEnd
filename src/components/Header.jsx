import React from 'react'
import logotipo from "../../public/img/PayNow_logotipo.png"
import Anchor from './Anchor';
import { LINKS_HEADER } from '../utils/links';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faRightFromBracket} from '@fortawesome/free-solid-svg-icons'


const Header = () => {
  return (
    <header className='flex'>
      <nav className='flex items-center flex-wrap'>
        <img src={logotipo} alt="logo" className='w-[150px] h-[80px]'/>
        <div className='flex md:gap-16 gap-2 grow justify-center flex-wrap' >
          {/* traigo los links dinamicos */}
          {
            LINKS_HEADER.map((link)=>{
              return(<Anchor key={link.href} href={link.name} text={link.name}></Anchor>)
            })
          }
        </div>
        <div className='w-[175px] text-center'>
          <FontAwesomeIcon className='text-[30px] text-blue-950' icon={faRightFromBracket}/>
        </div>
      </nav>

    </header>
  )
}

export default Header