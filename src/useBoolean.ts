import {useState} from 'react';

type UseBooleanReturn = [
  value: boolean,
  on: () => void,
  off: () => void,
  toggle: () => void,
];

function useBoolean(initial = false): UseBooleanReturn {
  const [value, set] = useState(initial);
  const on = () => set(true);
  const off = () => set(false);
  const toggle = () => set(v => !v);

  return [value, on, off, toggle];
}

export default useBoolean;
