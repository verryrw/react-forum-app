import React from 'react';
import PropTypes from 'prop-types';
import { IoIosArrowBack } from 'react-icons/io';

export default function ButtonBack({ onBackHandler }) {
  return (
    <button
      type='button'
      aria-label='button-back'
      className='flex items-center gap-2 bg-[#393e46] hover:bg-[#34373d] pe-2 rounded-md'
      onClick={onBackHandler}
    >
      <IoIosArrowBack />
      Kembali
    </button>
  );
}

ButtonBack.propTypes = {
  onBackHandler: PropTypes.func.isRequired,
};
