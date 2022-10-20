import { NavLink } from 'react-router-dom';

import ReservationButton from '../ReservationButton';

import classes from './Nav.module.css';

const NavLinks = (props) => {

    return (
        <div className={classes.links}>
            <ul>
                <li><NavLink to='/'>Home</NavLink></li>
                <li><NavLink to='products'>Products</NavLink></li>
                <li><NavLink to='news'>News</NavLink></li>
                <li><NavLink to='about-us'>About US</NavLink></li>
                <li><ReservationButton onClick={props.onClick} /></li>
            </ul>
        </div>
    )
}

export default NavLinks