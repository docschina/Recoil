---
title: useSetRecoilState(state)
sidebar_label: useSetRecoilState()
---

返回一个 setter 函数，用来更新可写 Recoil state 的值。

---

<<<<<<< HEAD
- `state`：可写的 Recoil state （[`atom`](/docs/api-reference/core/atom) 或可写的 [`selector`](/docs/api-reference/core/selector)）

当一个组件需要写入而不需要读取 state 时，推荐使用此 hook。如果组件使用了 `useRecoilState()` 来获取 setter 函数，那么同时它也会订阅更新，并在 atom 或 selector 更新时重新渲染。使用 `useSetRecoilState()` 允许组件在值发生改变时而不重新渲染的情况下设置值。
=======
```jsx
function useSetRecoilState<T>(state: RecoilState<T>): SetterOrUpdater<T>;

type SetterOrUpdater<T> = (T | (T => T)) => void;
```

- `state`: writeable Recoil state (an [`atom`](/docs/api-reference/core/atom) or a _writeable_ [`selector`](/docs/api-reference/core/selector))

Returns a setter function which can be used asynchronously to change the state.  The setter may either be passed a new value or an updater function which receives the previous value as an argument.

---

This is the recommended hook to use when a component intends to write to state without reading it. If a component used the [`useRecoilState()`](/docs/api-reference/core/useRecoilState) hook to get the setter, it would also subscribe to updates and re-render when the atom or selector updated. Using `useSetRecoilState()` allows a component to set the value without re-rendering when the value changes.
>>>>>>> 3b6769a0471ea70a44fa1584882208599138bcb4

### 示例

```jsx
import {atom, useSetRecoilState} from 'recoil';

const namesState = atom({
  key: 'namesState',
  default: ['Ella', 'Chris', 'Paul'],
});

function NameInput() {
  const [name, setName] = useState('');
  const setNamesState = useSetRecoilState(namesState);

  const addName = () => {
    setNamesState(existingNames => [...existingNames, name]);
  };

  const onChange = (e) => {
    setName(e.target.value);
  };

  return (
    <>
      <input type="text" value={name} onChange={onChange} />
      <button onClick={addName}>Add Name</button>
    </>
  );
}
```
