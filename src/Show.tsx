import {Nullish} from './types';

export type ShowProps<T> = {
  when: T | Nullish;
  children: T extends boolean ? JSX.Element : (value: T) => JSX.Element;
};

function Show<T>(props: ShowProps<T>): JSX.Element | null {
  if (!props.when) return null;

  return typeof props.children === 'function'
    ? props.children(props.when)
    : props.children;
}

export default Show;
