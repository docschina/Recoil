---
title: selector(options)
sidebar_label: selector()
---

<<<<<<< HEAD
根据传入该函数的选项，返回一个可写的或只读的 Recoil 状态。

你可以吧派生状态当作把 state 传入一个纯函数的输出值，此函数可以通过某种方式改变传入的 state。

---

- `options`
  - `key`：一个在内部用来标识 atom 的唯一字符串。在整个应用中，该字符串必须相对于其他 atom 和 selector 保持唯一。
  - `get`：一个传入具有如下属性的对象作为第一个参数的函数：
    - `get`：一个用来从其他 atom 或 selector 获取值的函数。所有传入该函数的 atom 或 selector 将会隐式地被添加到此 selector 的一个**依赖**列表中。如果这个 selector 的任何一个依赖发生改变，这个 selector 就会重新计算值。
  - `set?`：如果设置了该属性，selector 就会返回一个**可写**的 state。该函数需要传入具有如下属性的对象作为其第一个参数：
    - `get`：一个用来从其他 atom 或 selector 或缺值的函数。该函数不会为 selector 订阅给定的 atom 或 selector。
    - `set`：一个用来设置 Recoil 状态的函数。第一个参数时 Recoil 的 state，第二个参数时新的值。
=======
*Selectors* represent a function, or **derived state** in Recoil  You can think of them as a "pure function" without side-effects that always returns the same value for a given set of dependency values.  If only a `get` function is provided the selector is read-only and returns a `RecoilValueReadOnly` object.  If a `set` is also provided it returns a writeable `RecoilState` object.

---

```jsx
function selector<T>({
  key: string,

  get: ({
    get: GetRecoilValue
  }) => T | Promise<T> | RecoilValue<T>,

  set?: (
    {
      get: GetRecoilValue,
      set: SetRecoilValue,
      reest: ResetRecoilValue,
    },
    newValue: T | DefaultValue,
  ) => void,

  dangerouslyAllowMutability?: boolean,
})
```

```jsx
type ValueOrUpdater<T> = T | DefaultValue | ((prevValue: T) => T | DefaultValue);
type GetRecoilValue = <T>(RecoilValue<T>) => T;
type SetRecoilState = <T>(RecoilState<T>, ValueOrUpdater<T>) => void;
type ResetRecoilState = <T>(RecoilState<T>) => void;
```

- `key` - A unique string used to identify the atom internally. This string should be unique with respect to other atoms and selectors in the entire application.  It needs to be stable accross executions if used for persistence.
- `get` - A function that evaluates the value for the derived state.  It may return either a value directly or an asynchronous `Promise` or another atom or selector representing the same type.  It is passed an object as the first parameter containing the following properties:
  - `get` - a function used to retrieve values from other atoms/selectors. All atoms/selectors passed to this function will be implicitly added to a list of **dependencies** for the selector. If any of the selector's dependencies change, the selector will re-evaluate.
- `set?` - If this property is set, the selector will return **writeable** state. A function that is passed an object of callbacks as the first parameter and the new incoming value.  The incoming value may be a value of type `T` or maybe an object of type `DefaultValue` if the user reset the selector.  The callbacks include:
  - `get` - a function used to retrieve values from other atoms/selectors. This function will not subscribe the selector to the given atoms/selectors.
  - `set` - a function used to set the values of upstream Recoil state. The first parameter is the Recoil state and the second parameter is the new value.  The new value may be an updater function or a `DefaultValue` object to propagate reset actions.
- `dangerouslyAllowMutability` - Selectors represent "pure functions" of derived state and should always return the same value for the same set of dependency input values.  To help protect this all values stored in a selector are frozen by default.  In some cases this may need to be overriden using this option.

---
>>>>>>> 3b6769a0471ea70a44fa1584882208599138bcb4

### 示例 (同步)

```jsx
import {atom, selector, useRecoilState} from 'recoil';

const tempFahrenheit = atom({
  key: 'tempFahrenheit',
  default: 32,
});

const tempCelcius = selector({
  key: 'tempCelcius',
  get: ({get}) => ((get(tempFahrenheit) - 32) * 5) / 9,
  set: ({set}, newValue) => set(tempFahrenheit, (newValue * 9) / 5 + 32),
});

function TempCelcius() {
  const [tempF, setTempF] = useRecoilState(tempFahrenheit);
  const [tempC, setTempC] = useRecoilState(tempCelcius);
  const resetTemp = useResetRecoilState(tempCelcius);

  const addTenCelcius = () => setTempC(tempC + 10);
  const addTenFahrenheit = () => setTempF(tempF + 10);
  const reset = () => resetTemp();

  return (
    <div>
      Temp (Celcius): {tempC}
      <br />
      Temp (Fahrenheit): {tempF}
      <br />
      <button onClick={addTenCelcius}>Add 10 Celcius</button>
      <br />
      <button onClick={addTenFahrenheit}>Add 10 Fahrenheit</button>
      <br />
      <button onClick={reset}>>Reset</button>
    </div>
  );
}
```

<<<<<<< HEAD
### 示例 (异步)
=======
### Example (Asynchronous)

```jsx
import {selector, useRecoilValue} from 'recoil';

const myQuery = selector({
  key: 'MyDBQuery',
  get: async () => {
    return myDBQueryPromise();
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

Please see [this tutorial](/docs/guides/asynchronous-data-queries) for more complex examples.
>>>>>>> 3b6769a0471ea70a44fa1584882208599138bcb4
