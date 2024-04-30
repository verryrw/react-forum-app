import React from 'react';
import { PropTypes } from 'prop-types';

export default function BadgeButton({
  children,
  variant = 'filled',
  onClickHandler,
}) {
  if (variant === 'outline') {
    return (
      <button
        type='button'
        aria-label='button-category'
        onClick={onClickHandler}
        className='inline-block me-1 border border-[#fd7014] whitespace-nowrap rounded-md px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-zinc-600 dark:text-neutral-100'
      >
        {children}
      </button>
    );
  }

  return (
    <button
      type='button'
      aria-label='button-category'
      onClick={onClickHandler}
      className='inline-block me-1 whitespace-nowrap rounded-md bg-[#fd7014] px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-zinc-600 dark:[#fd7014] dark:text-neutral-100'
    >
      {children}
    </button>
  );
}

BadgeButton.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.string.isRequired,
  onClickHandler: PropTypes.func.isRequired,
};
