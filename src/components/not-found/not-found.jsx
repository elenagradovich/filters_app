import React from 'react';
import { Link } from 'react-router-dom';
import { SEARCH } from '../../constants/route-pathes';

function NotFound() {
  return (
    <div style={{fontSize: '32px', color: '#005a7e', textAlign:'center', marginTop: '10%'}}>
      <p style={{fontSize: '100px', padding: '0', margin: '0'}}>404</p>
      <p>Страница не найдена</p>
      <Link
        to={ SEARCH }
        style={
          {
            display: 'inline-block',
            textShadow: '1px 0 0, 0.5px 0 0, -1px 0 0',
            color: '#fff',
            backgroundColor: '#005a7e',
            padding: '9px 21px 6px 11px',
            fontWeight: '900',
            fontStyle: 'oblique',
            transform: 'skew(-15deg)',
            borderRadius: '3px',
            transition: 'background .3s,color .3s,text-shadow .3s'}
        }
      >
        <span>Вернуться на главную</span>
      </Link>
    </div>
  );
}

export default NotFound;
