import React from 'react';
import {render} from '@testing-library/react';
import Show from './Show';
import {Nullish} from './types';

describe('Show', () => {
  it('should render children, if "when" prop is true', () => {
    const {queryByText} = render(
      <Show when={true}>
        <span>This should be rendered</span>
      </Show>,
    );

    expect(queryByText('This should be rendered')).toBeTruthy();
  });

  it('should not render children, if "when" prop is false', () => {
    const {queryByText} = render(
      <Show when={false}>
        <span>This should not be rendered</span>
      </Show>,
    );

    expect(queryByText('This should not be rendered')).toBeNull();
  });

  it('should render children as a render function if "when" prop is !!TRUTHY!!', () => {
    const {queryByText} = render(
      <Show when={1}>{() => <span>This should be rendered</span>}</Show>,
    );

    expect(queryByText('This should be rendered')).toBeTruthy();
  });

  it('should not render children as a render function if "when" prop is !!FALSY!!', () => {
    const {queryByText} = render(
      <Show when={0}>{() => <span>This should not be rendered</span>}</Show>,
    );

    expect(queryByText('This should not be rendered')).toBeNull();
  });

  it('should provide "when" truthy value to render function as non null argument', () => {
    const a: string | Nullish = 'a';

    // Value should be of type string
    render(<Show when={a}>{value => <span>{value}</span>}</Show>);
  });

  it('should throw Typescript error, when trying providing non-boolean value to "when" prop without using render function', () => {
    render(
      <Show when={1}>
        {/* @ts-expect-error */}
        <span>This should not be rendered</span>
      </Show>,
    );
  });
});
