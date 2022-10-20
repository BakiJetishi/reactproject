import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import useToggle from '../../../custom-hooks/use-toggle'

import NavLinks from './NavLinks'
import NavLinksMobile from './NavLinksMobile'
import CartButton from '../CartButton'
import LoginButton from '../LoginButton'
import ThemeToggle from '../../UI/ThemeToggle'
import ProfileButton from '../ProfileButton'
import AuthContext from '../../../store/auth-context';

import classes from './Nav.module.css';

const Header = (props) => {
  const [hamburgerMenu, setHamburgerMenu] = useToggle(false)

  const authCtx = useContext(AuthContext);

  return (
    <>
      <header className={classes.header}>
        <nav className={classes.nav}>
          <h1 className={classes.logo}>
            ReactMeals
          </h1>
          {!hamburgerMenu && <NavLinks onClick={props.onShowReservation} />}
          {hamburgerMenu && <NavLinksMobile onClick={props.onShowReservation} onClose={setHamburgerMenu} />}
          <div className={classes.buttons}>
            <NavLink to='/profile'>{authCtx.isLoggedIn && <ProfileButton />}</NavLink>
            <LoginButton onClick={props.onShowAuth} />
            <CartButton onClick={props.onShowCart} />
          </div>
          <div className={classes.toggle}><ThemeToggle onClick={props.onToggle} /></div>
          <div className={classes.burger} onClick={setHamburgerMenu}>
            <div className={classes.line1}></div>
            <div className={classes.line2}></div>
            <div className={classes.line3}></div>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Header