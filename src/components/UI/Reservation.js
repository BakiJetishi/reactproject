import { useRef, useState } from 'react';
import { ReservationModal } from './Modal'
import useInput from '../../custom-hooks/use-input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

import classes from './Reservation.module.css'

function isNotEmpty(value) {
    return value.trim() !== '';
}
function validEmail(email) {
    return /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function validNumber(value) {
    return !isNaN(value) && value.trim() !== ''
}

const Reservation = (props) => {
    const [reservationSubmitted, setReservationSubmitted] = useState(false)

    const closeIcon = <FontAwesomeIcon icon={faXmark} />

    const nameRef = useRef()
    const emailRef = useRef()
    const numberRef = useRef()
    const dateRef = useRef()
    const timeRef = useRef()
    const seatsRef = useRef()
    const requestsRef = useRef()

    /* Destructuring the object returned by the custom hook `useInput` and assigning the values to the
    variables `nameIsValid`, `nameHasError`, `nameChangeHandler`, and `nameBlurHandler`. */
    const {
        isValid: nameIsValid,
        hasError: nameHasError,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
    } = useInput(isNotEmpty);

    const {
        isValid: emailIsValid,
        hasError: emailHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
    } = useInput(validEmail);

    const {
        isValid: numberIsValid,
        hasError: numberHasError,
        valueChangeHandler: numberChangeHandler,
        inputBlurHandler: numberBlurHandler,
    } = useInput(validNumber);

    let formIsValid = false;

    if (nameIsValid && emailIsValid && numberIsValid) {
        formIsValid = true;
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!formIsValid) {
            return;
        }

        const url = 'https://react-http-403d2-default-rtdb.firebaseio.com/reservations.json'

        /* Sending a POST request to the url specified in the `url` variable. The data being sent is
        the data in the object. */
        await axios.post(url, {
            name: nameRef.current.value,
            email: emailRef.current.value,
            number: numberRef.current.value,
            date: dateRef.current.value,
            time: timeRef.current.value,
            seats: seatsRef.current.value,
            requests: requestsRef.current.value,
        })
            /* This is a callback function that is executed after the POST request is sent. The
            `setReservationSubmitted` function is called to set the `reservationSubmitted` state to
            `true`. This is to display the `ReservationModal` component with the `<p
            className={classes.deployed}>Reservation successfully submitted</p>` element. The
            `setTimeout` function is called to set the `reservationSubmitted` state to `false` after
            1.2 seconds. This is to close the `ReservationModal` component. The `props.onClose`
            function is called to close the `ReservationModal` component. */
            .then((res) => {
                setReservationSubmitted(true)
                setTimeout(() => {
                    setReservationSubmitted(false)
                    props.onClose()
                }, 1200);
            })

        // await fetch('https://react-http-403d2-default-rtdb.firebaseio.com/reservations.json', {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         name: nameRef.current.value,
        //         email: emailRef.current.value,
        //         number: numberRef.current.value,
        //         date: dateRef.current.value,
        //         time: timeRef.current.value,
        //         seats: seatsRef.current.value,
        //         requests: requestsRef.current.value,
        //     }),
        // }).then((res) => {
        //     props.onClose()
        //     alert('Reservation successfully submitted')
        // })
    }

    const nameClasses = nameHasError ? `${classes['form-control']} ${classes.invalid}` : classes['form-control'];
    const emailClasses = emailHasError ? `${classes['form-control']} ${classes.invalid}` : classes['form-control'];
    const numberClasses = numberHasError ? `${classes['form-control']} ${classes.invalid}` : classes['form-control'];

    return (
        <ReservationModal onClose={props.onClose}>
            <div className={classes.wrapper}>
                <div className={classes.header}>
                    <h2>Table</h2>
                    <h1>Booking</h1>
                    <button onClick={props.onClose} className={classes['close-reservation']}>{closeIcon}</button>
                </div>
                <form className={classes.content} onSubmit={submitHandler}>
                    <div className={nameClasses}>
                        <label htmlFor='name'>Name</label>
                        <input type='text' placeholder='Enter your name' id='name' onChange={nameChangeHandler} onBlur={nameBlurHandler} ref={nameRef} />
                        {nameHasError && <p className={classes['error-text']}>Please enter your name.</p>}
                    </div>
                    <div className={emailClasses}>
                        <label htmlFor='email'>Email</label>
                        <input type='text' placeholder='Enter your email' id='email' onChange={emailChangeHandler} onBlur={emailBlurHandler} ref={emailRef} />
                        {emailHasError && <p className={classes['error-text']}>Please enter a valid email address.</p>}
                    </div>
                    <div className={numberClasses}>
                        <label htmlFor='phone'>Number</label>
                        <input type='text' placeholder='Phone number' id='phone' onChange={numberChangeHandler} onBlur={numberBlurHandler} ref={numberRef} />
                        {numberHasError && <p className={classes['error-text']}>Please enter a valid number.</p>}
                    </div>
                    <div className={classes.date}>
                        <label htmlFor='date'>Date</label>
                        <input type='date' id='date' ref={dateRef} />
                    </div>
                    <div className={classes.time}>
                        <label htmlFor='time'>Time</label>
                        <input type='time' id='time' ref={timeRef} />
                    </div>
                    <div className={classes.seats}>
                        <label htmlFor='seats'>Seats</label>
                        <input type='number' id='seats' defaultValue={1} min={1} ref={seatsRef} />
                    </div>
                    <div className={classes.requests}>
                        <label htmlFor='requests'>Special Requests</label>
                        <textarea id='requests' placeholder='Enter your requests' cols='30' rows='5' ref={requestsRef}></textarea>
                    </div>
                    <button type='submit' disabled={!formIsValid}>Book Now!</button>
                </form>
                {reservationSubmitted && <ReservationModal><p className={classes.deployed}>Reservation successfully submitted</p></ReservationModal>}
            </div>
        </ReservationModal>
    )
}

export default Reservation