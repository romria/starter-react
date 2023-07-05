import React, {type ReactElement} from 'react';
import {Outlet} from 'react-router-dom';
import Header from './header';
import Footer from './footer';

import classes from './root.scss';

const Root = (): ReactElement => (
  <>
    <Header />
    <main className={classes.main}>
      <Outlet />
    </main>
    <Footer />
  </>
);

export default Root;
