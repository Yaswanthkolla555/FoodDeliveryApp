import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import './Navbar.css';

const Navbar = (props) => {
    const { getTotalCartAmount, isLoggedIn, logout } = useContext(StoreContext);
    const [menu,setMenu]=useState("home")
    const handleLogOut = () => {
        logout();
    };

    return (
        <div className='navbar' style={{width:"100%"}}>
            <h3 className="logo">Swiggato</h3>
            <ul className="navbar-menu">
                <Link to='/' onClick={()=>{setMenu("home")}} className={menu=="home"?"active":""}>Home</Link>
                <a href='#menu-list' onClick={()=>{setMenu("menu")}} className={menu=="menu"?"active":""}>Menu</a>
                <a href='#app-download' onClick={()=>{setMenu("mobile-app")}} className={menu=="mobile-app"?"active":""}>Mobile-App</a>
                <a href='#footer' onClick={()=>{setMenu("contact-us")}} className={menu=="contact-us"?"active":""}>Contact Us</a>
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
