import { useNavigate } from 'react-router-dom';
import classes from './NotFound.module.css'

const NotFound = () => {
    let navigate = useNavigate();

    const routeChange = () => {
        let path = `/`;
        navigate(path);

    }
    return (
        <div className={classes.main}>
            <div className={classes.fof}>
                <h1>Page not found</h1>
                <h1 className={classes.home} onClick={routeChange}>Go Home</h1>
            </div>
        </div>
    );
};

export default NotFound;
