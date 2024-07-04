/* eslint-disable react/prefer-stateless-function */
import React, { Children } from 'react';

import generateUniqueID from '../../TodoApp/utils/generateUniqueID';

import './FilterButton.css';

class FilterButton extends React.Component {
  render() {
    const { className, onClick, children } = this.props;

    return (
      <li key={generateUniqueID()}>
        <button type="button" onClick={onClick} className={className}>
          {Children.map(children, (child) => child)}
        </button>
      </li>
    );
  }
}

export default FilterButton;
