import {useState} from 'react';

type UseToggleReturn = [value: boolean, toggle: () => void];

function useToggle(initial = false): UseToggleReturn {
  const [value, set] = useState(initial);
  const toggle = () => set(v => !v);

  return [value, toggle];
}

export default useToggle;
