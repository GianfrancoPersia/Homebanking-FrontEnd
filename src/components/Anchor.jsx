import React from 'react'
import PropTypes from 'prop-types'
import 'tailwindcss/tailwind.css';
import { NavLink } from "react-router-dom";


const Anchor = (props) => {
  return (
    <NavLink to={props.href} className={({ isActive, isPending }) =>
    isActive ? "bg-blue-900 text-white text-[20px] font-semibold p-2 rounded-xl" : "text-blue-950 text-[20px] font-medium p-2"
    }>{props.text}</NavLink>
  )
}

Anchor.propType = {
  href: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default Anchor