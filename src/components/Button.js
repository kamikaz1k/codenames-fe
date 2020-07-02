import React from 'react';
import {
  Link
} from "react-router-dom";

import colours from '../utils/colours';

const useLighterContrast = ["red", "darkRed"];

const styleForType = (type) => ({
  fontWeight: 'bold',
  minHeight: 60,
  minWidth: 130,
  backgroundColor: colours[type],
  color: type ? (useLighterContrast.includes(type) ? colours.offWhite : colours.offBlack) : null,
  border: 'none'
});

const Button = ({ className, children, type }) => {
  return (
    <button className={`btn btn-secondary ${className}`} style={styleForType(type)}>
      {children}
    </button>
  );
};

export default Button;
