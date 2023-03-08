import {render} from '@testing-library/react';
import React from 'react';
import Match, {Otherwise, When} from './Match';

describe('Match', () => {
  it('should render matching JSX', () => {
    const {queryByText} = render(
      <Match value={2}>
        <When value={1} render={() => <div>One</div>} />
        <When value={2} render={() => <div>Two</div>} />
        <When value={3} render={() => <div>Three</div>} />
      </Match>,
    );

    expect(queryByText('Two')).toBeTruthy();
  });

  it('should render nothing when not matching', () => {
    const {queryByText} = render(
      <Match value={2}>
        <When value={1} render={() => <div>One</div>} />
        <When value={3} render={() => <div>Three</div>} />
      </Match>,
    );

    expect(queryByText('Two')).toBeNull();
  });

  it('should render nothing when no children provided', () => {
    // @ts-expect-error
    const {queryByText} = render(<Match value={2} />);

    expect(queryByText('Two')).toBeNull();
  });

  it('should render otherwise, when no other case match', () => {
    const {queryByText} = render(
      <Match value={2}>
        <When value={1} render={() => <div>One</div>} />
        <When value={3} render={() => <div>Three</div>} />
        <Otherwise render={() => <div>Otherwise</div>} />
      </Match>,
    );

    expect(queryByText('Otherwise')).toBeTruthy();
  });

  it('should work with children instead of render prop', () => {
    const {queryByText} = render(
      <Match value={2}>
        <When value={1}>One</When>
        <When value={3}>Three</When>
        <Otherwise>Otherwise</Otherwise>
      </Match>,
    );

    expect(queryByText('Otherwise')).toBeTruthy();
  });

  it('should work with nested matches', () => {
    const {queryByText} = render(
      <Match value={2}>
        <When value={1}>One</When>
        <When value={2}>
          <Match value={3}>
            <When value={3}>Three</When>
            <Otherwise>Otherwise</Otherwise>
          </Match>
        </When>
        <Otherwise>Otherwise</Otherwise>
      </Match>,
    );

    expect(queryByText('Three')).toBeTruthy();
  });
});
