import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import '../stylesheets/Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
    let location = useLocation();
    let navigate = useNavigate();

    const handleLogoutClick = () =>{
        if ( localStorage.getItem('token') ){
            localStorage.removeItem('token')
        }
        navigate('/login');
        
    }
    return (
        <nav>
            <i className="fas fa-book"></i>
            
            <ul>
                <li> <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
                <li> <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link></li>
            </ul>

            <div className="auth-section">
                {!localStorage.getItem('token')
                    ?
                    <>
                        <Link to='/login' className='btn-purple'>Login</Link>
                        <Link to='/signup' className='btn-purple btn-outline'>Sign Up</Link> </>
                    :
                    <button onClick={handleLogoutClick} className='btn-purple'>Logout</button>
                }
            </div>
        </nav>
    )
}

export default Navbar;