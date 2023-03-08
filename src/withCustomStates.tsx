import State, {StateProps} from './State';
import React from 'react';

type StatesConstraint<Data> = Record<string, JSX.Element>;
type StatesProps<States, Data> = {
  [Property in keyof States]?: boolean;
};

function withCustomStates<States extends StatesConstraint<unknown>>(
  states: States,
) {
  return function (StateComponent: typeof State) {
    return function StateWithCustomStates<Data>(
      props: StateProps<Data> & StatesProps<States, Data>,
    ): JSX.Element {
      const {data, children, ...restStatesValues} = props;
      if (Object.values(restStatesValues).some(value => value))
        return states[
          Object.entries(restStatesValues).find(([, value]) => value)![0]
        ];

      return <StateComponent data={data}>{children}</StateComponent>;
    };
  };
}

export default withCustomStates;
