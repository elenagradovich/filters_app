import React from 'react';
import {func, string} from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { MenuItems } from '../../constants/menu';
import { setActiveMenuType } from '../../store/actions';
import menu from './menu.module.scss';

function Menu () {
  const menuType = useSelector((state) => state.DATA.menuType);
  const dispatch = useDispatch();
  const onChangeMenuType = (value) => {
    dispatch(setActiveMenuType(value));
  };

  return (
    <div className={menu.wrapper}>
      <ul>
        {Object.keys(MenuItems)?.map((key) => {
          const item = MenuItems[key];
          const isActiveItem = menuType === item;
          return <li
            onClick={() => onChangeMenuType(item)}
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
