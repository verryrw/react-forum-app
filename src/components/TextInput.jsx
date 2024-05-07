import React from 'react';
import PropTypes from 'prop-types';

export default function TextInput({ type = 'text', placeholder, value, onChangeHandler }) {
  return (
    <input
      type={type}
      className='mb-2 p-2 w-full rounded-md bg-[#393E46]'
      placeholder={placeholder}
      value={value}
      onChange={onChangeHandler}
    />
  );
}

TextInput.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
};
