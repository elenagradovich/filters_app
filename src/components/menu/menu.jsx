import React from 'react';
import {func, string} from 'prop-types';
import { MenuItems } from '../../constants/menu';
import menu from './menu.module.scss';

function Menu ({activeItem, setActiveItem}) {

  return (
    <div className={menu.wrapper}>
      <ul>
        {Object.keys(MenuItems)?.map((key) => {
          const item = MenuItems[key];
          const isActiveItem = activeItem === item;
          return <li
            onClick={() => setActiveItem(item)}
            key={key} 
            className={`${menu.item} ${isActiveItem ? menu.item__active : ''}`}
            >{item?.toUpperCase()}</li>
        })}
      </ul>
    </div>
  );
}

Menu.propTypes = {
  setActiveItem: func,
  activeItem: string,
};

export default Menu;
