import { NavLink } from 'react-router-dom';
import { BurgerMenuModal } from '../../UI/Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import ReservationButton from '../ReservationButton';

import classes from './NavLinksMobile.module.css';

const NavLinksMobile = (props) => {
    const closeButton = <FontAwesomeIcon icon={faXmark} />

    return (
        <BurgerMenuModal onClose={props.onClose}>
            <div className={classes.links}>
                <div className={classes.close} onClick={props.onClose}>{closeButton}</div>
                <ul>
                    <li onClick={props.onClose}><NavLink to='/'>Home</NavLink></li>
                    <li onClick={props.onClose}><NavLink to='products'>Products</NavLink></li>
                    <li onClick={props.onClose}><NavLink to='news'>News</NavLink></li>
                    <li onClick={props.onClose}><NavLink to='about-us'>About US</NavLink></li>
                    <li onClick={props.onClose}><ReservationButton onClick={props.onClick} /></li>
                </ul>
            </div>
        </BurgerMenuModal>
    )
}

export default NavLinksMobile