import React from 'react';
import {render} from '@testing-library/react';
import State from './State';

describe('State', () => {
  it('should render, when data is non-empty', () => {
    const {queryByText} = render(
      <State data={{foo: 'bar'}}>
        {data => <span>This text should render</span>}
      </State>,
    );

    expect(queryByText('This text should render')).toBeTruthy();
  });

  it('should not render, when data is empty', () => {
    const {queryByText} = render(
      <State data={null}>
        {data => <span>This text should not render</span>}
      </State>,
    );

    expect(queryByText('This text should not render')).toBeNull();

    render(
      <State data={undefined}>
        {data => <span>This text should not render</span>}
      </State>,
    );

    expect(queryByText('This text should not render')).toBeNull();
  });
});
