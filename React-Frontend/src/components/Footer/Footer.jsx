import React from 'react'
import "./Footer.css"
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
            <h3 className="logo">Swiggato</h3>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis atque reprehenderit saepe repellat ad, odio, quaerat adipisci molestiae accusamus mollitia exercitationem tenetur unde?</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
            </div>
            <div className="footer-content-center">
                    <h3>Company</h3>
                    <ul>
                        <li>Home</li>
                        <li>AboutUs</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
            </div>
            <div className="footer-content-right">
                    <h3>Get In Touch</h3>
                    <ul>
                        <li>+91-9515875899</li>
                        <li>contact@swiaggato.com</li>
                    </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">Copyright 2024 &#169; Swiggato.com - All Right Reserved.</p>
      
    </div>
  )
}

export default Footer
