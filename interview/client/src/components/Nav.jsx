import React from 'react';
import {Link, useNavigate} from 'react-router-dom'
import "./nav.css";
const Nav = ()=>{
    const auth = localStorage.getItem('user')
    const navigate = useNavigate()
    const logOut = ()=>{
        localStorage.clear()
        navigate('/login')
    }
    return(
        <nav>
            <ul className='nav-ul'>
                <li><Link to="/">CreateUser</Link></li>
                <li><Link to="/users">Users</Link></li>
                
                
                {auth ?
                <li> <Link to="/login" onClick={logOut}>Log Out</Link> </li> : 
                <>
                <li> <Link to="/login">Log in</Link> </li>
                </>
                }
            </ul>
        </nav>

    )
}

export default Nav;