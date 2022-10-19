import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faInstagram, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";

import './Footer.css'
import Chef from '../../assets/chef.png'

const Footer = () => {

    return (
        <footer className='footer'>
            <div className='footer-logo'>
                <img src={Chef} alt='abc' />
                <h1>React Meals</h1>
            </div>
            <div className='social-media'>
                <span>© 2022 ReactMeals™. All Rights Reserved.</span>
                <div className='icons'>
                    <a href='https://facebook.com'><FontAwesomeIcon icon={faFacebookF} /></a>
                    <a href='https://instagram.com'><FontAwesomeIcon icon={faInstagram} /></a>
                    <a href='https://twitter.com'><FontAwesomeIcon icon={faTwitter} /></a>
                    <a href='https://linkedin.com'><FontAwesomeIcon icon={faLinkedin} /></a>
                </div>
            </div>
        </footer>
    )
}

export default Footer