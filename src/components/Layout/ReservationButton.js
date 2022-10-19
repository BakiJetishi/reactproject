import classes from './ReservationButton.module.css';

const ReservationButton = (props) => {

    return (
        <>
            <button onClick={props.onClick} className={classes.reservation}>Reservation</button>
        </>
    )
}

export default ReservationButton