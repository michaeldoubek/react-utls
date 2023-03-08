import React from 'react';
import Show, {ShowProps} from './Show';

type EvaluatorsConstraint = Record<string, (value: any) => boolean>;
type EvaluatorsProps<Evaluators extends EvaluatorsConstraint> = {
  [Property in keyof Evaluators]?: Parameters<Evaluators[Property]>[0];
};

function withCustomEvaluators<Evaluators extends EvaluatorsConstraint>(
  evaluators: Evaluators,
) {
  return function (ShowComponent: typeof Show) {
    return function ShowWithCustomEvaluators<T = boolean>(
      props: Omit<ShowProps<T>, 'when'> &
        Partial<Pick<ShowProps<T>, 'when'>> &
        EvaluatorsProps<Evaluators>,
    ) {
      const {when, children, ...restEvaluatorsValues} = props;
      const evaluations = Object.entries(restEvaluatorsValues).every(
        ([evaluatorName, evaluatorValue]) =>
          Boolean(evaluatorValue) && evaluators[evaluatorName](evaluatorValue),
      );

      if (!evaluations) return null;

      return (
        <ShowComponent<T | boolean>
          when={when === undefined ? true : (when as T)}
        >
          {children}
        </ShowComponent>
      );
    };
  };
}

export default withCustomEvaluators;
