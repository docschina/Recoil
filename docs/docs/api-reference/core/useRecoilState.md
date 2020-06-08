---
title: useRecoilState(state)
sidebar_label: useRecoilState()
---

返回一个数组，第一个元素是 state 的值，第二个元素是一个 setter 函数，调用该函数时会更新为给定 state 的值。

使用此 hook 会使组件隐式地订阅给定的 state。

---

<<<<<<< HEAD
- `state`: 一个 [`atom`](/docs/api-reference/core/atom) 或一个 _可写_ 的 [`selector`](/docs/api-reference/core/selector)。可写的 selector 在其定义的同时具有 `get` 和 `set` 函数，而只读 selector 只有一个 `get`。

当组件同时需要读写状态时，推荐使用该 hook。

### 示例
=======
```jsx
function useRecoilState<T>(state: RecoilState<T>): [T, SetterOrUpdater<T>];

type SetterOrUpdater<T> = (T | (T => T)) => void;
```

- `state`: an [`atom`](/docs/api-reference/core/atom) or a _writeable_ [`selector`](/docs/api-reference/core/selector). Writeable selectors are selectors that were have both a `get` and `set` in their definition while read-only selectors only have a `get`.

This API is similar to the React (`useState()`)[https://reactjs.org/docs/hooks-reference.html#usestate] hook except it takes a Recoil state instead of a default value as an argument.  It returns a tuple of the current value of the state and a setter function.  The setter function may either take a new value as an argument or an updater function which receives the previous value as a parameter.

---

This is the recommended hook to use when a component intends to read and write state.

Using this hook in a React component will subscibe the component to re-render when the state is updated.  This hook may throw if the state has an error or is pending asynchronous resolution.  Please see [this guide](/docs/guides/asynchronous-data-queries).

### Example
>>>>>>> 78d7c93b23261f3dcfae1680a3480b1d4b9db7e7

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

  const addTenCelcius = () => setTempC(tempC + 10);
  const addTenFahrenheit = () => setTempF(tempF + 10);

  return (
    <div>
      Temp (Celcius): {tempC}
      <br />
      Temp (Fahrenheit): {tempF}
      <br />
      <button onClick={addTenCelcius}>Add 10 Celcius</button>
      <br />
      <button onClick={addTenFahrenheit}>Add 10 Fahrenheit</button>
    </div>
  );
}
```
