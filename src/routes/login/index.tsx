import React, {type FormEvent, type ReactElement, useEffect, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
// import {login} from '../../api/auth';
import Input from '../../components/input';
import Button from '../../components/button';
import {useAuth} from '../../state/auth';
import {useLogin} from '../../state/login';

import classes from './login.scss';

const Login = (): ReactElement => {
  const {state: {username, password}, changeLoginFormValue, clearLoginForm} = useLogin();
  const {state: {isLogged}, setLoggedUser} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogged) navigate('/dashboard', {replace: true});
  }, [isLogged, navigate]);

  const onChangeUsername = useCallback(
    (value: string): void => { changeLoginFormValue('username', value); },
    [changeLoginFormValue],
  );
  const onChangePassword = useCallback(
    (value: string): void => { changeLoginFormValue('password', value); },
    [changeLoginFormValue],
  );

  const onSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const {data, errors} = await login({username, password});
    const {data, errors} = await Promise.resolve({data: {}, errors: undefined});

    if (errors) {
      // console.error(errors);
    } else if (data) {
      setLoggedUser({username, role: 'admin'});
      clearLoginForm();
      navigate('/dashboard');
    }
  }, [setLoggedUser, clearLoginForm, navigate, username/* password */]);

  return (
    <div className={classes.login}>
      <form
        className={classes.form}
        acceptCharset="UTF-8"
        onSubmit={onSubmit}
      >
        <div className={classes.label}>Username</div>
        <Input
          className={classes.input}
          // id="username"
          type="text"
          // name="username"
          value={username}
          required
          onChange={onChangeUsername}
        />
        <div className={classes.label}>Password</div>
        <Input
          className={classes.input}
          // id="password"
          type="password"
          // name="password"
          value={password}
          required
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
