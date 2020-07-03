import React from 'react';

import colours from '../utils/colours';

const useLighterContrast = ["red", "darkRed"];

const styleForType = (type, bigSize) => ({
  fontWeight: 'bold',
  minHeight: bigSize ? 60 : null,
  minWidth: bigSize ? 130 : null,
  backgroundColor: colours[type],
  color: type ? (useLighterContrast.includes(type) ? colours.offWhite : colours.offBlack) : null,
  border: 'none'
});

const Button = ({ className, children, onClick, type = "lightGrey", bigSize = false }) => {
  return (
    <button
      className={`btn btn-secondary ${className}`}
      onClick={onClick}
      style={styleForType(type, bigSize)}
      type="button"
    >
      {children}
    </button>
  );
};

export default Button;
