import React, {type ReactElement, type ReactNode} from 'react';
import {Outlet} from 'react-router-dom';
import Header from './header';
import Footer from './footer';

import classes from './main.scss';

interface Props {
  children?: ReactNode
}

const MainLayout = ({children}: Props): ReactElement => (
  <>
    <Header />
    <main className={classes.main}>
      {children ?? <Outlet />}
    </main>
    <Footer />
  </>
);

export default MainLayout;
