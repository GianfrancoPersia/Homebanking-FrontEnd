import React from 'react'
import logotipo from "../../public/img/PayNow_logotipo.png"
import logoMobile from "../../public/img/PayNow_logotipo_mobile.jpg"
import Anchor from './Anchor';
import { LINKS_HEADER } from '../utils/links';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import authActions from '../redux/actions/auth.actions'

const Header = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {logout} = authActions

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <header className='flex w-full'>
      <nav className='flex items-center p-2 grow'>
        <img src={logoMobile} alt="logo" className='w-[40px] h-[45px]' />
        <div className='flex flex-1 justify-between md:gap-16 px-4 md:justify-center' >
          {/* traigo los links dinamicos */}
          {
            LINKS_HEADER.map((link) => {
              return (<Anchor key={link.href} href={link.name} text={link.name}></Anchor>)
            })
          }
        </div>
        <div className='flex items-center'>
          <Link to={'/login'}><FontAwesomeIcon className='text-[25px] text-blue-950' onClick={handleLogout} icon={faArrowRightFromBracket} /></Link>
        </div>
      </nav>

    </header>
  )
}

export default Header