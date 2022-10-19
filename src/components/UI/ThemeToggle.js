import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon } from '@fortawesome/free-solid-svg-icons'
import { faSun } from '@fortawesome/free-solid-svg-icons'

import classes from './ThemeToggle.module.css'


const ThemeToggle = (props) => {
    return (
        <div>
            <input type='checkbox' className={classes.checkbox} id='checkbox' onClick={props.onClick} />
            <label htmlFor='checkbox' className={classes['checkbox-label']}>
                <FontAwesomeIcon icon={faMoon} className={classes['fa-moon']} />
                <FontAwesomeIcon icon={faSun} className={classes['fa-sun']} />
                <span className={classes.ball}></span>
            </label>
        </div >
    )
}

export default ThemeToggle