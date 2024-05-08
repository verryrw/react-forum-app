import { useState } from 'react';

export default function useInput() {
  const [state, setState] = useState('');

  function onChangeHandler(event) {
    setState(event.target.value);
  }

  return [state, onChangeHandler, kajfdf];
}
