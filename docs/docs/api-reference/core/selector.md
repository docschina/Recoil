---
title: selector(options)
sidebar_label: selector()
---

在 Recoil 里，_selector_ 代表一个函数，或 **派生状态**。你可以把它们看作是类似于一个没有副作用的 "幂等操作" 或 "纯函数"，对于一组给定的依赖值永远返回相同的值。如果只提供 `get` 方法，则 selector 便是只读的，并且会返回一个 `RecoilValueReadOnly` 对象。如果还提供了一个 `set` 方法，它的返回值将变为一个可写的 `RecoilState` 对象。

为了知道何时通知订阅该 selector 的组件重新渲染，Recoil 会自动管理 atom 以及 selector 的状态变化。如果一个 selector 的对象值被直接改变，它可能会绕过管理，以避免通知订阅它的组件。为了帮助检测 bug，Recoil 将在开发模式下 freeze selector 的值对象。

---

```jsx
function selector<T>({
  key: string,

  get: ({
    get: GetRecoilValue,
    getCallback: GetCallback,
  }) => T | Promise<T> | RecoilValue<T>,

  set?: (
    {
      get: GetRecoilValue,
      set: SetRecoilState,
      reset: ResetRecoilState,
    },
    newValue: T | DefaultValue,
  ) => void,

  dangerouslyAllowMutability?: boolean,
})
```

```jsx
type ValueOrUpdater<T> = T | DefaultValue | ((prevValue: T) => T | DefaultValue);
type GetCallback =
  <Args, Return>(
    fn: ({snapshot: Snapshot}) => (...Args) => Return,
  ) => (...Args) => Return;

type GetRecoilValue = <T>(RecoilValue<T>) => T;
type SetRecoilState = <T>(RecoilState<T>, ValueOrUpdater<T>) => void;
type ResetRecoilState = <T>(RecoilState<T>) => void;
```

<<<<<<< HEAD
- `key` - 一个在内部用来标识 atom 的唯一字符串。在整个应用中，该字符串必须相对于其他 atom 和 selector 保持唯一。如果用于持久化，则他需要在整个执行过程中保持稳定性。
- `get` - 一个评估派生 state 值的函数。它可以直接返回一个值，也可以返回一个异步的 `Promise` 或另一个代表相同类型的 atom 或 selector。它被传递给一个对象作为第一个参数，并包含如下属性：
  - `get` - 一个用来从其他 atom 或 selector 获取值的函数。所有传入该函数的 atom 或 selector 将会隐式地被添加到此 selector 的一个 **依赖** 列表中。如果这个 selector 的任何一个依赖发生改变，这个 selector 就会重新计算值。
- `set?` - 如果设置了该属性，selector 就会返回一个 **可写** 的 state。这个函数需要传入一个回调函数的对象作为其第一个参数以及一个新值。新值可以是一个 `T` 类型的值，如果用户重置了 selector，也可以是一个 `DefaultValue` 类型的对象。该回调函数包含了：
  - `get` - 一个用来从其他 atom 或 selector 获取值的函数。该函数不会为 selector 订阅给定的 atom 或 selector。
  - `set` - 一个用来设置 Recoil 状态的函数。第一个参数是 Recoil 的 state，第二个参数是新的值。新值可以是一个更新函数，或一个 `DefaultValue` 类型的对象，用以传递更新操作。
- `dangerouslyAllowMutability` - 在某些情况下，我们可能希望允许存储在 atom 中的对象发生改变，而这些变化并不代表 status 的变更。使用这个选项可以覆盖开发模式下的 freezing 对象。
=======
- `key` - A unique string used to identify the atom internally. This string should be unique with respect to other atoms and selectors in the entire application.  It needs to be stable across executions if used for persistence.
- `get` - A function that evaluates the value for the derived state.  It may return either a value directly or an asynchronous `Promise` or another atom or selector representing the same type.  It is passed an object as the first parameter containing the following properties:
  - `get()` - a function used to retrieve values from other atoms/selectors. All atoms/selectors passed to this function will be implicitly added to a list of **dependencies** for the selector. If any of the selector's dependencies change, the selector will re-evaluate.
  - `getCallback()` - a function for creating Recoil-aware callbacks.  See [example](/docs/api-reference/core/selector#returning-objects-with-callbacks) below.
- `set?` - If this property is set, the selector will return **writeable** state. A function that is passed an object of callbacks as the first parameter and the new incoming value.  The incoming value may be a value of type `T` or maybe an object of type `DefaultValue` if the user reset the selector.  The callbacks include:
  - `get()` - a function used to retrieve values from other atoms/selectors. This function will not subscribe the selector to the given atoms/selectors.
  - `set()` - a function used to set the values of upstream Recoil state. The first parameter is the Recoil state and the second parameter is the new value.  The new value may be an updater function or a `DefaultValue` object to propagate reset actions.
- `dangerouslyAllowMutability` - In some cases it may be desireable allow mutating of objects stored in selectors that don't represent state changes.  Use this option to override freezing objects in development mode.
>>>>>>> ba405d505a522d7c686abac8b7698a8e7dce00aa

---

一个具有简单静态依赖的 selector：

```jsx
const mySelector = selector({
  key: 'MySelector',
  get: ({get}) => get(myAtom) * 100,
});
```

### 动态依赖

只读 selector 有一个 `get` 方法，该方法会根据依赖关系计算 selector 的值。如果这些依赖项中的任何一个更新了，那么 selector 的值也将重新计算。求该 selector 的值时，其依赖关系是基于实际使用的 atoms 或 selectors 动态确定的。根据先前依赖项的值，你可以动态地使用不同的附加依赖项。Recoil 将自动更新当前的数据流图，因此 selector 只需订阅来自当前依赖关系集的更新。
在这个示例中，`mySelector` 将取决于 `toggleState` 的 atom 以及依赖于 `toggleState` 状态的 `selector` 或 `selectorB`。
```jsx
const toggleState = atom({key: 'Toggle', default: false});

const mySelector = selector({
  key: 'MySelector',
  get: ({get}) => {
    const toggle = get(toggleState);
    if (toggle) {
      return get(selectorA);
    } else {
      return get(selectorB);
    }
  },
});
```

### 可写的 Selectors

一个双向 (bi-directional) selector 接收传入值作为参数，并可以使用该参数沿数据流图向上游传递更改。因为用户既可以选择使用新值设置 selector，也可以选择重置 selector，所以传入的值要么是与 selector 表示的同类值，要么是表示重置操作的 `DefaultValue` 对象。

这个简单的 selector 实质上包装了一个 atom 来添加一个额外的字段。它仅仅只是将 set 和 reset 操作传递给了上游的 atom。
```jsx
const proxySelector = selector({
  key: 'ProxySelector',
  get: ({get}) => ({...get(myAtom), extraField: 'hi'}),
  set: ({set}, newValue) => set(myAtom, newValue),
});
```

这个 selector 转换了数据，所以需要检查传入值是否是一个 `DefaultValue`。
```jsx
const transformSelector = selector({
  key: 'TransformSelector',
  get: ({get}) => get(myAtom) * 100,
  set: ({set}, newValue) =>
    set(myAtom, newValue instanceof DefaultValue ? newValue : newValue / 100),
});
```

### 异步 Selectors

Selectors 还可以具有异步求值函数，并将一个 `Promise` 作为返回值。更多信息，请参阅 [此指南](/docs/guides/asynchronous-data-queries)

```jsx
const myQuery = selector({
  key: 'MyQuery',
  get: async ({get}) => {
    return await myAsyncQuery(get(queryParamState));
  }
});
```

### 示例 (同步)

```jsx
import {atom, selector, useRecoilState, DefaultValue} from 'recoil';

const tempFahrenheit = atom({
  key: 'tempFahrenheit',
  default: 32,
});

const tempCelsius = selector({
  key: 'tempCelsius',
  get: ({get}) => ((get(tempFahrenheit) - 32) * 5) / 9,
  set: ({set}, newValue) =>
    set(
      tempFahrenheit,
      newValue instanceof DefaultValue ? newValue : (newValue * 9) / 5 + 32
    ),
});

function TempCelsius() {
  const [tempF, setTempF] = useRecoilState(tempFahrenheit);
  const [tempC, setTempC] = useRecoilState(tempCelsius);
  const resetTemp = useResetRecoilState(tempCelsius);

  const addTenCelsius = () => setTempC(tempC + 10);
  const addTenFahrenheit = () => setTempF(tempF + 10);
  const reset = () => resetTemp();

  return (
    <div>
      Temp (Celsius): {tempC}
      <br />
      Temp (Fahrenheit): {tempF}
      <br />
      <button onClick={addTenCelsius}>Add 10 Celsius</button>
      <br />
      <button onClick={addTenFahrenheit}>Add 10 Fahrenheit</button>
      <br />
      <button onClick={reset}>>Reset</button>
    </div>
  );
}
```

### 示例 (异步)

```jsx
import {selector, useRecoilValue} from 'recoil';

const myQuery = selector({
  key: 'MyDBQuery',
  get: async () => {
    const response = await fetch(getMyRequestUrl());
    return response.json();
  },
});

function QueryResults() {
  const queryResults = useRecoilValue(myQuery);

  return (
    <div>
      {queryResults.foo}
    </div>
  );
}

function ResultsSection() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <QueryResults />
    </React.Suspense>
  );
}
```
<<<<<<< HEAD

更多复杂的示例，请参考 [这篇指南](/docs/guides/asynchronous-data-queries)。
=======
Please see [this guide](/docs/guides/asynchronous-data-queries) for more complex examples.

### Returning objects with callbacks

Sometimes selectors can be used to return objects that contain callbacks.  It may be helpful for these callbacks to access Recoil state, such as for querying typeahead values or click handlers.  The following example uses a selector to generate menu items with a click handler that accesses Recoil state.  This can be useful when passing these objects to frameworks or logic outside the context of a React component.

There is symmetry between this callback and using [`useRecoilCallback()`](/docs/api-reference/core/useRecoilCallback).  Note that the callback returned by `getCallback()` can be used as an async callback to access Recoil state later, it should not be called during the evaluation of the selector value itself.

```jsx
const menuItemState = selectorFamily({
  key: 'MenuItem',
  get: itemID => ({get, getCallback}) => {
    const name = get(itemNameQuery(itemID));
    const onClick = getCallback(({snapshot}) => async () => {
      const info = await snapshot.getPromise(itemInfoQuery(itemID));
      displayInfoModal(info);
    });
    return {
      title: `Show info for ${name}`,
      onClick,
    };
  },
});
```
>>>>>>> ba405d505a522d7c686abac8b7698a8e7dce00aa
