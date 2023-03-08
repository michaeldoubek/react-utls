import React, {ReactNode} from 'react';

type MatchProps<Value> = {
  value: Value;
  children: React.ReactElement[];
};

function Match<Value>(props: MatchProps<Value>) {
  const {value, children} = props;
  const childrenArray = React.Children.toArray(
    children,
  ) as React.ReactElement[];

  const whenChildren = childrenArray.filter(
    child => child.type === When,
  ) as React.ReactElement<WhenProps<Value>>[];

  const otherwiseChild = childrenArray.find(
    child => child.type === Otherwise,
  ) as React.ReactElement<OtherwiseProps> | undefined;

  const matchingWhenChild = whenChildren.find(
    child => child.props.value === value,
  );

  if (matchingWhenChild) return matchingWhenChild;
  return otherwiseChild || null;
}

type WhenProps<Value> = {
  value: Value;
} & (
  | {
      render: (value: Value) => JSX.Element;
      children?: never;
    }
  | {
      children: ReactNode;
      render?: never;
    }
);

function When<Value>(props: WhenProps<Value>) {
  if (props?.children) return <>{props.children}</>;
  if (props?.render) return props.render(props.value);
  return null;
}

type OtherwiseProps =
  | {
      render: () => JSX.Element;
      children?: never;
    }
  | {
      children: ReactNode;
      render?: never;
    };

function Otherwise(props: OtherwiseProps) {
  if (props?.children) return <>{props.children}</>;
  if (props?.render) return props.render();
  return null;
}

export default Match;
export {When, Otherwise};
