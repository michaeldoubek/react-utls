export type StateProps<Data> = {
  data: Data | null | undefined;
  children: (data: Data) => JSX.Element;
};

function State<Data>(props: StateProps<Data>) {
  if (props.data === undefined || props.data === null) return null;
  return props.children(props.data);
}

export default State;
