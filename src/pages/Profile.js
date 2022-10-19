import { NavLink } from 'react-router-dom'

import classes from './Profile.module.css'

const Profile = () => {

    return (
        <section style={{ paddingTop: 100 }}>
            <div className={classes.wrapper}>
                <NavLink to='/addnewproduct'>Add New Product</NavLink>
                <NavLink to='/addnews'>Add News</NavLink>
            </div>
        </section>
    )
}

export default Profile