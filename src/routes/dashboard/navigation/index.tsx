import React, {type ReactElement} from 'react';
import {useLocation} from 'react-router-dom';
import Link from '../../../components/link';
import SVGHome from '../../../components/svg/home';
import SVGChartPie from '../../../components/svg/chart-pie';

import classes from './navigation.scss';

const NAVI_ELEMENTS: Array<{ type: string, route?: string, label: string, Icon?: React.FC<{ fill?: string, className?: string }> }> = [
  {
    type: 'link',
    route: '/dashboard',
    label: 'Home',
    Icon: SVGHome,
  },
  {
    type: 'head',
    label: 'DATA',
  },
  {
    type: 'link',
    route: '/dashboard/reports',
    label: 'Reports',
    Icon: SVGChartPie,
  },
];

const Navigation = (): ReactElement => {
  const {pathname} = useLocation();

  return (
    <div className={classes.navigation}>
      {NAVI_ELEMENTS.map(({type, route, Icon, label}) => {
        if (type === 'link' && Icon !== undefined && route !== undefined) {
          const isIndexRoute = route === '/dashboard';
          const isActive = isIndexRoute ? pathname === route : pathname.includes(route);

          return (
            <Link
              key={label}
              className={classes.naviLink}
              activeClassName={classes.active}
              to={route}
              end={isIndexRoute}
            >
              <Icon className={classes.linkIcon} fill={isActive ? '#4A46FF' : undefined} />
              <div className={classes.linkLabel}>{label}</div>
            </Link>
          );
        }

        return (
          <div key={label} className={classes.naviHead}>{label}</div>
        );
      })}
    </div>
  );
};

export default Navigation;
