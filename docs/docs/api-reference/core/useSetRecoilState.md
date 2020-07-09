---
title: useSetRecoilState(state)
sidebar_label: useSetRecoilState()
---

返回一个 setter 函数，用来更新可写 Recoil state 的值。

---

```jsx
function useSetRecoilState<T>(state: RecoilState<T>): SetterOrUpdater<T>;

type SetterOrUpdater<T> = (T | (T => T)) => void;
```

- `state`：可写的 Recoil state （[`atom`](/docs/api-reference/core/atom) 或可写的 [`selector`](/docs/api-reference/core/selector)）

返回一个可以用来异步改变 state 的 setter 函数。可以传给此 setter 函数一个新的值，也可以传入一个更新函数，此函数接受上一次的值作为其参数。

---

<<<<<<< HEAD
当一个组件需要写入而不需要读取 state 时，推荐使用此 hook。如果组件使用了 [`useRecoilState()`](/docs/api-reference/core/useRecoilState) 来获取 setter 函数，那么同时它也会订阅更新，并在 atom 或 selector 更新时重新渲染。使用 `useSetRecoilState()` 允许组件在值发生改变时而不重新渲染的情况下设置值。
=======
This is the recommended hook to use when a component intends to write to state without reading it. If a component used the [`useRecoilState()`](/docs/api-reference/core/useRecoilState) hook to get the setter, it would also subscribe to updates and re-render when the atom or selector updated. Using `useSetRecoilState()` allows a component to set the value without subscribing the component to re-render when the value changes.
>>>>>>> 0763345298a6eca3c31de8636b6fdc58513839b5

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
