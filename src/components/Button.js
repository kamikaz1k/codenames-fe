import React from 'react';
import {
  Link
} from "react-router-dom";

import colours from '../utils/colours';

const styleForType = (type) => ({
  backgroundColor: colours[type],
  color: colours.offBlack,
  border: 'none'
});

const Button = ({ children, type }) => {
  return (
    <button className="btn btn-secondary" style={styleForType(type)}>
      {children}
    </button>
  );
};

export default Button;
