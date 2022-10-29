import { useRef, useState, useContext } from 'react';
import useToggle from '../../custom-hooks/use-toggle';
import useInput from '../../custom-hooks/use-input';
import { AuthModal } from '../UI/Modal'
import AuthContext from '../../store/auth-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import classes from './AuthForm.module.css'

/**
 * It checks if the password is valid.
 * @param email - must contain @ and .
 * @returns a boolean value.
 */
function validEmail(email) {
    return /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
function validPassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/.test(password)
}

const AuthForm = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isLogin, setIsLogin] = useToggle(true);
    const [newPassword, setnewPassword] = useToggle(false);
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const newPasswordInputRef = useRef();
    const authCtx = useContext(AuthContext);

    /* A state that is used to check if the form is valid. */
    const [formInputsValidity, setFormInputsValidity] = useState({
        email: false,
        password: false,
    });

    const closeIcon = <FontAwesomeIcon icon={faXmark} />

    /* A custom hook that returns an object with the following properties:
    value: the value of the input.
    isValid: a boolean value that indicates if the input is valid.
    hasError: a boolean value that indicates if the input has an error.
    valueChangeHandler: a function that is used to change the value of the input.
    inputBlurHandler: a function that is used to check if the input is valid. */
    const {
        value: emailValue,
        isValid: emailIsValid,
        hasError: emailHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
    } = useInput(validEmail);

    const {
        value: passwordValue,
        isValid: passwordIsValid,
        hasError: passwordHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
    } = useInput(validPassword);

    let formIsValid = false;

    /* Checking if the password and email are valid. */
    if (passwordIsValid && emailIsValid) {
        formIsValid = true;
    }

    const submitHandler = (e) => {
        e.preventDefault();

        formIsValid = passwordIsValid && emailIsValid

        /* Checking if the form is valid. If it is not valid, it sets the formInputsValidity state to the
        opposite of the emailIsValid and passwordIsValid. */
        if (!formIsValid) {
            setFormInputsValidity({
                email: !emailIsValid,
                password: !passwordIsValid,
            });
            return;
        }

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        setIsLoading(true)

        /* Sending a request to the firebase server. */
        let url;
        if (isLogin) {
            url =
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDtLTeFeTL1MkiqF17G_dRh9LifobFhajc';
        } else {
            url =
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDtLTeFeTL1MkiqF17G_dRh9LifobFhajc';
        }
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: enteredEmail,
                password: enteredPassword,
                returnSecureToken: true,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            /* Making a request to the server and returning a response. */
            .then((res) => {
                setIsLoading(false)
                if (res.ok) {
                    return res.json();
                } else {
                    return res.json().then((data) => {
                        let errorMessage = 'Authentication failed!';

                        if (data && data.error && data.error.message) {
                            errorMessage = data.error.message;
                        }

                        throw new Error(errorMessage);
                    });
                }
            })
            /* Checking if the user is logged in. */
            .then((data) => {
                const expirationTime = new Date(
                    new Date().getTime() + +data.expiresIn * 1000
                );
                authCtx.login(data.idToken, expirationTime.toISOString());
                setIsLogin(false)
                props.onClose()

            })
            .catch((err) => {
                alert(err.message);
            });
    };

    /* Checking if the email or password has an error. If it does, it adds the invalid class to the input. */
    const emailClasses = emailHasError || formInputsValidity.email ? `${classes['form-control']} ${classes.invalid}` : classes['form-control'];
    const passwordClasses = passwordHasError || formInputsValidity.password ? `${classes['form-control']} ${classes.invalid}` : classes['form-control'];

    const submitPasswordHandler = (e) => {
        e.preventDefault();

        const enteredNewPassword = newPasswordInputRef.current.value;

        /* Updating the password of the user. */
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDtLTeFeTL1MkiqF17G_dRh9LifobFhajc', {
            method: 'POST',
            body: JSON.stringify({
                idToken: authCtx.token,
                password: enteredNewPassword,
                returnSecureToken: false
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            setnewPassword(false)
        });
    };

    /**
     * When the user clicks the logout button, the logout function from the authContext is called, and the
     * isLogin state is set to true.
     */
    const logoutHandler = () => {
        authCtx.logout()
        setIsLogin(true)
    }

    if (isLogin && !authCtx.isLoggedIn) {
        return (
            <AuthModal onClose={props.onClose}>
                <div className={classes.login} >
                    <div className={classes['login-container']}>
                        <form onSubmit={submitHandler} >
                            <p className={classes.text}> <span>Login</span></p>
                            <div className={emailClasses}>
                                <input type='text' placeholder='Enter Email' ref={emailInputRef} onChange={emailChangeHandler} onBlur={emailBlurHandler} value={emailValue} />
                            </div>
                            <div className={passwordClasses}>
                                <input type='password' placeholder='Enter Password' ref={passwordInputRef} onChange={passwordChangeHandler} onBlur={passwordBlurHandler} value={passwordValue} />
                            </div>
                            {!isLoading && <button type='submit'>Login</button>}
                            {isLoading && <p className={classes.loading}>Loading...</p>}
                        </form>
                        <button onClick={setIsLogin}>Create new account</button>
                        {(emailHasError || formInputsValidity.email) && <p className={classes['error-text']}>Please enter a valid email address.</p>}
                        {(passwordHasError || formInputsValidity.password) && <p className={classes['error-text']}>Please enter password.</p>}
                    </div>
                    <button className={classes.closeBtn} onClick={props.onClose}>{closeIcon}</button>
                </div>
            </AuthModal>
        )
    }

    if (!isLogin && !authCtx.isLoggedIn) {
        return (
            <AuthModal onClose={props.onClose}>
                <div className={classes.login} >
                    <div className={classes['login-container']}>
                        <form onSubmit={submitHandler}>
                            <p className={classes.text}><span>Register</span></p>
                            <div className={emailClasses}>
                                <input type='text' placeholder='Enter your email' ref={emailInputRef} onChange={emailChangeHandler} onBlur={emailBlurHandler} />
                            </div>
                            <div className={passwordClasses}>
                                <input type='password' placeholder='Enter password' ref={passwordInputRef} onChange={passwordChangeHandler} onBlur={passwordBlurHandler} />
                            </div>
                            {!isLoading && <button type='submit'>Register</button>}
                            {isLoading && <p className={classes.loading}>Loading...</p>}
                        </form>
                        <button onClick={setIsLogin}>Login with existing account</button>
                        {(emailHasError || formInputsValidity.email) && <p className={classes['error-text']}>Please enter a valid email address.</p>}
                        {(passwordHasError || formInputsValidity.password) && <p className={classes['error-text']}>Please enter password.</p>}
                    </div>
                    <button className={classes.closeBtn} onClick={props.onClose}>{closeIcon}</button>
                </div>
            </AuthModal>
        )
    }

    if (authCtx.isLoggedIn && !newPassword) {
        return (
            <AuthModal onClose={props.onClose}>
                <div className={classes.login} >
                    <div className={classes['login-container']}>
                        <p className={classes.text}>Welcome to <span>ReactMeals</span></p>
                        <button className={classes.logout} onClick={setnewPassword}>Change Password</button>
                        <button className={classes.logout} onClick={logoutHandler}>Logout</button>
                    </div>
                    <button className={classes.closeBtn} onClick={props.onClose}>{closeIcon}</button>
                </div>
            </AuthModal>
        )
    }

    if (newPassword) {
        return (
            <AuthModal onClose={props.onClose}>
                <div className={classes.login} >
                    <div className={classes['login-container']}>
                        <form onSubmit={submitPasswordHandler} >
                            <p className={classes.text}> <span>Change Password</span></p>
                            <div className={passwordClasses}>
                                <input type='password' placeholder='Enter new password' ref={newPasswordInputRef} onChange={passwordChangeHandler} onBlur={passwordBlurHandler} />
                            </div>
                            {!isLoading && <button type='submit'>Change Password</button>}
                            {isLoading && <p className={classes.loading}>Loading...</p>}
                            <button onClick={setnewPassword}>Return back</button>
                        </form>
                        {(passwordHasError || formInputsValidity.password) && <p className={classes['error-text']}>Please enter password.</p>}
                    </div>
                    <button className={classes.closeBtn} onClick={props.onClose}>{closeIcon}</button>
                </div>
            </AuthModal>
        )
    }
}

export default AuthForm