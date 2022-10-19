import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';

import classes from './ProfileButton.module.css'

const ProfileButton = () => {

    return (
        <button className={classes.button}>
            <span className={classes.icon}>
                <FontAwesomeIcon icon={faFileCirclePlus} />
            </span>
        </button>
    )
}

export default ProfileButton