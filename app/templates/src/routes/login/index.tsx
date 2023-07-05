import React, {type FormEvent, type ReactElement, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Input from '../../components/input';
import Button from '../../components/button';
import {useAuth, AuthActionType} from '../../state/auth';

import classes from './login.scss';

const Login = (): ReactElement => {
  const [username, onChangeUsername] = useState('');
  const [password, onChangePassword] = useState('');
  const {state: {isLogged}, authDispatch} = useAuth();
  const navigate = useNavigate();

  const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // ToDo: submit form action

    onChangeUsername('');
    onChangePassword('');
    authDispatch({type: AuthActionType.SET_LOGGED_USER, payload: {username: 'Charlie', role: 'admin'}});
    navigate('/dashboard');
  };

  return (
    <div className={classes.login}>
      <form
        className={classes.form}
        acceptCharset="UTF-8"
        onSubmit={onSubmit}
      >
        <label className={classes.label} htmlFor="username">Username</label>
        <Input
          className={classes.input}
          id="username"
          type="text"
          name="username"
          value={username}
          onChange={onChangeUsername}
        />
        <label className={classes.label} htmlFor="password">Password</label>
        <Input
          className={classes.input}
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={onChangePassword}
        />
        <Button
          className={classes.submit}
          type="submit"
          isPrimary
        >
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default Login;
