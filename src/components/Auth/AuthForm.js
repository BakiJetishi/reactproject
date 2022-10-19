import { useRef, useState, useContext } from 'react';
import useToggle from '../../custom-hooks/use-toggle';
import useInput from '../../custom-hooks/use-input';
import { AuthModal } from '../UI/Modal'
import AuthContext from '../../store/auth-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import classes from './AuthForm.module.css'

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

    const [formInputsValidity, setFormInputsValidity] = useState({
        email: false,
        password: false,
    });

    const closeIcon = <FontAwesomeIcon icon={faXmark} />

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

    if (passwordIsValid && emailIsValid) {
        formIsValid = true;
    }

    const submitHandler = (e) => {
        e.preventDefault();

        formIsValid = passwordIsValid && emailIsValid

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

    const emailClasses = emailHasError || formInputsValidity.email ? `${classes['form-control']} ${classes.invalid}` : classes['form-control'];
    const passwordClasses = passwordHasError || formInputsValidity.password ? `${classes['form-control']} ${classes.invalid}` : classes['form-control'];

    const submitPasswordHandler = (e) => {
        e.preventDefault();

        const enteredNewPassword = newPasswordInputRef.current.value;

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