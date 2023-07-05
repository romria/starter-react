import React, {type ReactElement, useEffect} from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
// import Link from '../../components/link';
import Navigation from './navigation';

import classes from './dashboard.scss';
import {useAuth} from '../../state/auth';

const Dashboard = (): ReactElement => {
  const {state: {isLogged}} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) navigate('/login');
  }, []);

  return (
    <div className={classes.dashboard}>
      <Navigation />
      <div className={classes.section}>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
