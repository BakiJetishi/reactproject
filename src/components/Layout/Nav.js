import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import ReservationButton from './ReservationButton';
import CartButton from './CartButton'
import LoginButton from './LoginButton'
import ThemeToggle from '../UI/ThemeToggle'
import ProfileButton from './ProfileButton'
import AuthContext from '../../store/auth-context';

import classes from './Nav.module.css';

const Header = (props) => {
  const authCtx = useContext(AuthContext);

  return (
    <>
      <header className={classes.header}>
        <nav className={classes.nav}>
          <h1 className={classes.logo}>
            ReactMeals
          </h1>
          <div className={classes.links}>
            <ul>
              <li><NavLink to='/'>Home</NavLink></li>
              <li><NavLink to='products'>Products</NavLink></li>
              <li><NavLink to='news'>News</NavLink></li>
              <li><NavLink to='about-us'>About US</NavLink></li>
              <li><ReservationButton onClick={props.onShowReservation} /></li>
              <li><ThemeToggle onClick={props.onToggle} /></li>
            </ul>
          </div>
          <div className={classes.buttons}>
            <NavLink to='/profile'>{authCtx.isLoggedIn && <ProfileButton />}</NavLink>
            <LoginButton onClick={props.onShowAuth} />
            <CartButton onClick={props.onShowCart} />
          </div>
        </nav>
      </header>
    </>
  )
}

export default Header