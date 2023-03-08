import React from 'react';
import withCustomStates from './withCustomStates';
import State from './State';
import {render} from '@testing-library/react';

const CustomState = withCustomStates({
  isEmpty: <span>should render when empty</span>,
  hasError: <span>should render when there's error</span>,
  isLoading: <span>should render when loading</span>,
})(State);

describe('withCustomStates', () => {
  // Same tests as in src\State.test.tsx - custom states should not affect general functionality
  it('should render, when data is non-empty', () => {
    const {queryByText} = render(
      <CustomState data={{foo: 'bar'}}>
        {data => <span>This text should render</span>}
      </CustomState>,
    );

    expect(queryByText('This text should render')).toBeTruthy();
  });

  it('should not render, when data is empty', () => {
    const {queryByText} = render(
      <CustomState data={null}>
        {data => <span>This text should not render</span>}
      </CustomState>,
    );

    expect(queryByText('This text should not render')).toBeNull();

    render(
      <CustomState data={undefined}>
        {data => <span>This text should not render</span>}
      </CustomState>,
    );

    expect(queryByText('This text should not render')).toBeNull();
  });

  it('should render empty JSX, when isEmpty is true', () => {
    const {queryByText} = render(
      <CustomState data={null} isEmpty>
        {data => <span>This text should not render</span>}
      </CustomState>,
    );

    expect(queryByText('This text should not render')).toBeNull();
    expect(queryByText('should render when empty')).toBeTruthy();
  });

  it('should render error JSX, when hasError is true', () => {
    const {queryByText} = render(
      <CustomState data={null} hasError>
        {data => <span>This text should not render</span>}
      </CustomState>,
    );

    expect(queryByText('This text should not render')).toBeNull();
    expect(queryByText("should render when there's error")).toBeTruthy();
  });

  it('should render loading JSX, when isLoading is true', () => {
    const {queryByText} = render(
      <CustomState data={null} isLoading>
        {data => <span>This text should not render</span>}
      </CustomState>,
    );

    expect(queryByText('This text should not render')).toBeNull();
    expect(queryByText('should render when loading')).toBeTruthy();
  });
});
