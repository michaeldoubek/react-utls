import {useState} from 'react';

type UseNumberReturn = [
  value: number,
  increment: () => void,
  decrement: () => void,
  set: (value: number) => void,
];

function useNumber(initial = 0): UseNumberReturn {
  const [value, set] = useState(initial);
  const increment = () => set(v => v + 1);
  const decrement = () => set(v => v - 1);

  return [value, increment, decrement, set];
}

export default useNumber;
