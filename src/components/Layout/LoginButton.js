import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import classes from './LoginButton.module.css'

const LoginButton = (props) => {
    return (
        <button className={classes.button} onClick={props.onClick}>
            <span className={classes.icon}>
                <FontAwesomeIcon icon={faUser} />
            </span>
        </button>
    )
}

export default LoginButton