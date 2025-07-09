import React from 'react'
import { Link} from "react-router-dom"
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import "./index.css"


const Header = () => {
  const { userName } = useContext(UserContext);
   const getInitials = (name) => {
    if (!name) return '';
    const parts = name.trim().split(' ');
    return parts[0][0].toUpperCase() + (parts[1]?.[0]?.toUpperCase() || '');
  };
  return (
    <>
      <nav className='navBarContainer'>
        <Link to ="/">
          <img src = "https://cdn.prod.website-files.com/6509887b9119507025235a5a/650ada40fd6cf3427547c9d8_Swift%20logo.svg" alt="logo" className='logo'></img>
        </Link>
          <div className='profileContainer'>
                  <p className='profile-icon'> {getInitials(userName)}</p>
                  <p className='profile-name'>{userName}</p>
              </div>
      </nav>
    </>
  )
}

export default Header

