import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import './Navbar.css';

const Navbar = (props) => {
    const { getTotalCartAmount, isLoggedIn, logout } = useContext(StoreContext);

    const handleLogOut = () => {
        logout();
    };

    return (
        <div className='navbar'>
            <h3 className="logo">Swiggato</h3>
            <ul className="navbar-menu">
                <li className="active">Home</li>
                <li>Menu</li>
                <li>Mobile-App</li>
                <li>Contact Us</li>
            </ul>
            <div className="navbar-right">
                <img className='search-icon' src={assets.search_icon} alt="Search" />
                <div className="navbar-search-icon">
                    <Link to="/cart"><img src={assets.basket_icon} alt="Cart" /></Link>
                    <div className={getTotalCartAmount() > 0 ? "dot" : ""}></div>
                </div>
                {!isLoggedIn ?
                    <button onClick={() => props.setShowLogin(true)}>Sign In</button>
                    :
                    <div className='navbar-profile'>
                        <img src={assets.profile_icon} alt="Profile" />
                        <ul className="navbar-profile-dropdown">
                            <li><img src={assets.bag_icon} alt="Orders" /><div>Orders</div></li>
                            <hr />
                            <li onClick={handleLogOut}><img src={assets.logout_icon} alt="Logout" /><div>Logout</div></li>
                        </ul>
                    </div>
                }
            </div>
        </div>
    );
};

export default Navbar;
