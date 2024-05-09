import React from 'react';
import PropTypes from 'prop-types';
import '../index.css';

export const Button = ({ type, variant, backgroundColor, label, onClick }) => {
  const mode = variant === 'filled' ? `bg-[${backgroundColor}]` : `border border-[${backgroundColor}]`;

  return (
    <button
      type={type == null ? 'button' : 'submit'}
      className={['px-4 py-2 w-full rounded-md mt-2', mode].join(' ')}
      style={
        variant === 'filled' ? { backgroundColor } : { border: `1px solid ${backgroundColor}` }
      }
      onClick={onClick}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  variant: PropTypes.string,
  backgroundColor: PropTypes.string,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  type: 'button',
  variant: 'filled',
  backgroundColor: '#fd7014',
  onClick: undefined,
};
