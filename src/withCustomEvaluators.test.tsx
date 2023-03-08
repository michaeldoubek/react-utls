import withCustomEvaluators from './withCustomEvaluators';
import Show from './Show';
import {render} from '@testing-library/react';
import {Nullish} from './types';
import React from 'react';

const featureFlags = {
  featureA: true,
  featureB: false,
};

const userPermissions = {
  canEdit: true,
  canDelete: false,
};

const CustomShow = withCustomEvaluators({
  whenFeatureEnabled: (featureName: keyof typeof featureFlags) =>
    featureFlags[featureName],
  whenUserHasPermission: (permissionName: keyof typeof userPermissions) =>
    userPermissions[permissionName],
})(Show);

describe('withCustomEvaluators', () => {
  // Same tests as in src\Show.test.tsx - custom evaluators should not affect general functionality
  it('should render children, if "when" prop is true', () => {
    const {queryByText} = render(
      <CustomShow when={true}>
        <span>This should be rendered</span>
      </CustomShow>,
    );

    expect(queryByText('This should be rendered')).toBeTruthy();
  });

  it('should not render children, if "when" prop is false', () => {
    const {queryByText} = render(
      <CustomShow when={false}>
        <span>This should not be rendered</span>
      </CustomShow>,
    );

    expect(queryByText('This should not be rendered')).toBeNull();
  });

  it('should render children as a render function if "when" prop is !!TRUTHY!!', () => {
    const {queryByText} = render(
      <CustomShow when={1}>
        {() => <span>This should be rendered</span>}
      </CustomShow>,
    );

    expect(queryByText('This should be rendered')).toBeTruthy();
  });

  it('should not render children as a render function if "when" prop is !!FALSY!!', () => {
    const {queryByText} = render(
      <CustomShow when={0}>
        {() => <span>This should not be rendered</span>}
      </CustomShow>,
    );

    expect(queryByText('This should not be rendered')).toBeNull();
  });

  it('should provide "when" truthy value to render function as non null argument', () => {
    const a: string | Nullish = 'a';

    // Value should be of type string
    render(<CustomShow when={a}>{value => <span>{value}</span>}</CustomShow>);
  });

  it('should throw Typescript error, when trying providing non-boolean value to "when" prop without using render function', () => {
    render(
      <CustomShow when={1}>
        {/* @ts-expect-error */}
        <span>This should not be rendered</span>
      </CustomShow>,
    );
  });

  // New tests for custom evaluators
  it('should render children, if "whenFeatureEnabled" prop is true', () => {
    const {queryByText} = render(
      <CustomShow whenFeatureEnabled="featureA">
        <span>This should be rendered</span>
      </CustomShow>,
    );

    expect(queryByText('This should be rendered')).toBeTruthy();
  });

  it('should not render children, if "whenFeatureEnabled" prop is false', () => {
    const {queryByText} = render(
      <CustomShow whenFeatureEnabled="featureB">
        <span>This should not be rendered</span>
      </CustomShow>,
    );

    expect(queryByText('This should not be rendered')).toBeNull();
  });

  it('should render children, if "whenUserHasPermission" prop is true', () => {
    const {queryByText} = render(
      <CustomShow whenUserHasPermission="canEdit">
        <span>This should be rendered</span>
      </CustomShow>,
    );

    expect(queryByText('This should be rendered')).toBeTruthy();
  });

  it('should not render children, if "whenUserHasPermission" prop is false', () => {
    const {queryByText} = render(
      <CustomShow whenUserHasPermission="canDelete">
        <span>This should not be rendered</span>
      </CustomShow>,
    );

    expect(queryByText('This should not be rendered')).toBeNull();
  });

  it('should render, when every evaluator is true', () => {
    const {queryByText} = render(
      <CustomShow whenFeatureEnabled="featureA" whenUserHasPermission="canEdit">
        <span>This should be rendered</span>
      </CustomShow>,
    );

    expect(queryByText('This should be rendered')).toBeTruthy();
  });

  it('should not render, when any evaluator is false', () => {
    const {queryByText} = render(
      <CustomShow whenFeatureEnabled="featureB" whenUserHasPermission="canEdit">
        <span>This should not be rendered</span>
      </CustomShow>,
    );

    expect(queryByText('This should not be rendered')).toBeNull();
  });

  it('should not render, when evaluator is true and when prop is false', () => {
    const {queryByText} = render(
      <CustomShow when={false} whenFeatureEnabled="featureA">
        <span>This should not be rendered</span>
      </CustomShow>,
    );

    expect(queryByText('This should not be rendered')).toBeNull();
  });

  it('should infer evaluator type from evaluator function', () => {
    render(
      // @ts-expect-error
      <CustomShow whenFeatureEnabled="foo">
        <span>This should be rendered</span>
      </CustomShow>,
    );

    render(
      // @ts-expect-error
      <CustomShow whenUserHasPermission="foo">
        <span>This should be rendered</span>
      </CustomShow>,
    );
  });
});
