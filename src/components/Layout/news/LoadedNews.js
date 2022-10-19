import { NavLink } from 'react-router-dom'
import classes from './LoadedNews.module.css'

const LoadedNews = (props) => {
    return (
        <div className={classes.box}>
            <img src={props.img} alt="" />
            <div className={classes['box-title']}>{props.title}</div>
            <div className={classes['box-s-title']}>{props.desc}</div>
            <NavLink to={`/news/${props.id}`}><div className={classes.read}>Read More</div></NavLink>
        </div>
    )
}

export default LoadedNews