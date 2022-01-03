import React from 'react';
import { NavLink } from 'react-router-dom';
import { SEARCH, SEARCH_HISTORY } from '../../constants/route-pathes';
import { useDispatch } from 'react-redux';
import { resetRequestData } from '../../store/actions';
import header from './header.module.scss';

function Header () {
  const dispatch = useDispatch();
  return (
    <header className={header.wrapper}>
      <div className="container">
        <nav className={header.nav_list}>
          <NavLink
            to={ SEARCH } exact
            className={({ isActive }) => `${header.nav__item} ${isActive && header.nav__item_active}`}
            onClick={() => dispatch(resetRequestData())}
          >Search
          </NavLink>
          <NavLink
            to={ SEARCH_HISTORY } exact
            className={({ isActive }) => `${header.nav__item} ${isActive && header.nav__item_active}`}
            onClick={() => dispatch(resetRequestData())}
          >Search history
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
