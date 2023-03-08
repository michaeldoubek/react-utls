# React-utls
This is a collection of React utilities that I use in my projects. I've decided to make them public so that I can use them in other projects and so that others can use them as well.

## Installation
```bash
npm install react-utls
```
Or with yarn
```bash
yarn add react-utls
```

## Usage
```typescript jsx
import { useToggle, useNumber, Show, Match } from 'react-utls';

function App() {
    const [show, toggle] = useToggle();
    const [count, increment] = useNumber();
    
    return (
        <div>
            <button onClick={handleToggle}>Toggle</button>
            <Show when={show}>
                <div>Visible</div>
            </Show>
            
            <button onClick={increment}>Increment</button>
            
            <Match value={count}>
                <When value={0}>Haven't clicked yet</When>
                <When value={1}>Clicked once</When>
                <When value={2}>Clicked twice</When>
                <Otherwise>Clicked {count} times</Otherwise>
            </Match>
        </div>
    );
}
```

## API
### useBoolean
useBoolean hook provides you with three often used functions to set boolean state value.
Usually, you would write something like this:
```typescript jsx
const [value, setValue] = useState(false);
const on = () => setValue(true);
const off = () => setValue(false);
const toggle = () => setValue(prevValue => !prevValue);
```

With useBoolean hook, you can write it like this:
```typescript jsx
const [value, on, off, toggle] = useBoolean(initial = false);
```

In case, you only need a toggle, use **useToggle** instead:

### useToggle
useToggle works same as useBoolean, but omits on and off functions.
```typescript jsx
const [value, toggle] = useToggle(initial = false);
```

### useNumber
Similar to `useBoolean`, `useNumber` provides you with three functions to set number state value.
Usually, you would write something like this:
```typescript jsx
const [value, setValue] = useState(0);
const increment = () => setValue(prevValue => prevValue + 1);
const decrement = () => setValue(prevValue => prevValue - 1);
```

With `useNumber` hook, you can write it like this:
```typescript jsx
const [value, increment, decrement, set] = useNumber(initial = 0);
```

### Show
Show component is a simple wrapper that renders its children only when the `when` prop is true.
```typescript jsx
<Show when={true}>
    <div>Visible</div>
</Show>
```

> Note: You may have seen `<Show>` and `<Hide>` components in Chakra UI library. It works pretty much same, but is extensible. See below.

#### Motivation for using Show
Conditionals in JSX can become quite messy to deal with. Using `<Show>` component feels
more native in JSX code and therefore is much easier to read.

#### Using `<Show>` with TypeScript to handle `undefined` values
When using `<Show>` with TypeScript, you may encounter a problem with `undefined` values when you need
to check, if a variable **is set**.
```typescript jsx
const user: User | undefined = getUser();
<Show when={user}>
    <div>{user.name}</div>
</Show>
```
**This will throw a Typescript error.**

With `<Show>` component, you can provide render children as a function, which will automatically type value as `User` instead of `User | undefined`.
```typescript jsx
const user: User | undefined = getUser();
<Show when={user}>
    {user => <div>{user.name}</div>}
</Show>
```

#### Extending `<Show>` component
You can extends `<Show>` component with your own evaluators. For example:
- evaluating, if certain feature flags are enabled
- evaluating, if user has certain permissions
- evaluating, if user is logged in
- evaluating, if user is admin
- evaluating, if certain features of browser are supported

```typescript jsx
<Show whenFeatureEnabled="moduleA" whenUserHasPermission="edit" isLogged isAdmin envSupports={["device"]}>
    <div>Visible</div>
</Show>
```

For extending, you use a HOC (higher order component) called `withCustomEvaluators`, which is used as follows:
```typescript jsx
import { Show, withCustomEvaluators } from 'react-utls';

const featureFlags = {
    "featureA": true,
    "featureB": false,
}

// It will result in a new component. You can name keep it's name as Show or called is something else.
// I recommend placing this in your utils file inside your project.
export const CustomShow = withCustomEvaluators({
    // Custom evaluators Record
    
    // Your evaluator function parameter type will be used as a type for the prop, so type it strongly for more type safety.
    whenFeatureEnabled: (featureName: typeof keyof featureFlags) => featureFlags[featureName],
})(Show); // Provide with original Show component as second argument.
```

> At the moment, evaluators cannot be **async**.

### State
State component is a component, that helps you to handle edge cases. Let's take a look at example using React Query.
```typescript jsx
const { data, isLoading, isError } = useQuery('user', getUser);

// Data is of type User | undefined. State render function automatically types it as User.
return (
    <State data={data}>
        {data => <div>{user.name}</div>}
    </State>
)
```

#### Extending State
Similar to `<Show>` with `withCustomEvaluators`, you can extend `<State>` component to handle your specified states using `withCustomState` **HOC**.
Then you can handle all states you need:
```typescript jsx
<State data={data} isLoading={isLoading} isError={isError} isEmpty={data === undefined}>
    {data => <div>{user.name}</div>}
</State>
```

Using other states also allows you to set fallback components, so you can render different UI for different states,
and also encapsulate those inside your own State component without need to write it every time.
```typescript jsx
const CustomState = withCustomState({
    isLoading: () => <div>Loading...</div>,
    isError: () => <div>Error</div>,
    isEmpty: () => <div>Empty</div>,
})(State);
```

### Match
Match component is a nice JSX way to use **pattern matching** inside your JSX. It's heavily inspired by a library
[ts-pattern](https://github.com/gvergnaud/ts-pattern).

Currently features are limited, so if have more complex use case, you should use `ts-pattern` directly.
For simple pattern matching, `<Match>` component is a nice way to do it.

```typescript jsx
<Match value={1}>
    <When value={1}>One</When>
    <When value={2}>Two</When>
    <When value={3}>Three</When>
</Match>
```

Instead of children, you can use render prop in a same manner:
```typescript jsx
<Match value={1}>
    <When value={1} render={(value) => <div>One</div>} />
    <When value={2} render={(value) => <div>Two</div>} />
    <When value={3} render={(value) => <div>Three</div>} />
</Match>
```

If you need to handle other cases, use `<Otherwise>` component.
```typescript jsx
<Match value={1}>
    <When value={1}>One</When>
    <When value={2}>Two</When>
    <When value={3}>Three</When>
    <Otherwise>Other</Otherwise>
</Match>
```

You can also use **nesting**:
```typescript jsx
<Match value={1}>
    <When value={1}>
        <Match value={2}>
            <When value={1}>One, One</When>
            <When value={2}>One, Two</When>
        </Match>
    </When>
    <When value={2}>Two</When>
</Match>
```