import React from 'react';

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

const Button = ({ className, children, onClick, type }) => {
  return (
    <button className={`btn btn-secondary ${className}`} onClick={onClick} style={styleForType(type)}>
      {children}
    </button>
  );
};

export default Button;
