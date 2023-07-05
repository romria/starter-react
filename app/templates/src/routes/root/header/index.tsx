import React, {type ReactElement} from 'react';
import {useNavigate} from 'react-router-dom';

import Link from '../../../components/link';
import Button from '../../../components/button';
import {useAuth, AuthActionType} from '../../../state/auth';
import FakeLogo from '../../../assets/images/fake-logo.jpg';
import Notification from '../../../assets/images/notification.svg';
import Settings from '../../../assets/images/settings.svg';

import classes from './header.scss';

const Header = (): ReactElement => {
  const {state: {isLogged, username}, authDispatch} = useAuth();
  const navigate = useNavigate();

  const onLogout = (): void => {
    authDispatch({type: AuthActionType.LOGOUT});
    navigate('/');
  };

  return (
    <header className={classes.header}>
      <div className={classes.le}>
        <Link to="/">
          <img className={classes.logo} src={FakeLogo} alt="logo" />
        </Link>
      </div>

      <div className={classes.ri}>
        {isLogged && (
          <div className={classes.icons}>
            <img className={classes.icon} src={Notification} alt="notification" />
            <img className={classes.icon} src={Settings} alt="settings" />
          </div>
        )}
        <div className={classes.userMenu}>
          {isLogged ? (
            <Button onClick={onLogout}>Log Out</Button>
          ) : (
            <Link to="/login">
              <Button isPrimary>Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
