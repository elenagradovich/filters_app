import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../header/header';

import searchHistoryPage from './search-history-page.module.scss';


function SearchHistoryPage () {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const clickRatingHandler = (e) => {
    setRating(e.target.value);
  };

  const changeCommentHandler = (e) => {
    setComment(e.target.value);
  };

  const submitClickHandler = (e) => {
    e.preventDefault();
    if(comment && rating) {
      // onSubmitComment(
      //   hotelId,
      //   comment,
      //   rating,
      // );
    }
  };

  return (
    <Fragment>
      <Header />
      <p className={searchHistoryPage.wrapper}>results</p>
    </Fragment>
  );
}


export default SearchHistoryPage;
