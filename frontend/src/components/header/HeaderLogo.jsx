import React from 'react'
import {Link} from 'react-router-dom'

const HeaderLogo = () => {
  return (
    <div className="flex flex-col items-center">
        <Link to="/" className="text-2xl font-bold text-black tracking-wide">
          JOHARDAR
        </Link>
        <span className="text-xs text-gray-400 uppercase tracking-widest">
          Jewellers
        </span>
      </div>
  )
}

export default HeaderLogo
