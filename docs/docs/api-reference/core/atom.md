---
title: atom(options)
sidebar_label: atom()
---

<<<<<<< HEAD
返回可写的 Recoil 状态。

---

- `options`
  - `key`：在内部用于标识 atom 的唯一字符串。在整个应用中，该字符串必须相对于其他 atom 和 selector 保持唯一。
  - `default`：atom 的初始值。
=======
An *atom* represents state in Recoil.  The `atom()` function returns a writeable `RecoilState` object.

---

```jsx
function atom<T>({
  key: string,
  default: T | Promise<T> | RecoilValue<T>,

  dangerouslyAllowMutability?: boolean,
}): RecoilState<T>
```


  - `key` - A unique string used to identify the atom internally. This string should be unique with respect to other atoms and selectors in the entire application.
  - `default` - The initial value of the atom or a `Promise` or another atom or selector representing a value of the same type.
  - `dangerouslyAllowMutability` - Recoil depends on atom state changes to know when to notify components that use the atoms to re-render.  If an atom's value were mutated, it may bypass this and cause state to change without properly notifying subscribing compoennts.  To help protect against this all stored values are frozen.  In some cases it may be desireable to override this using this option.

---
>>>>>>> 78d7c93b23261f3dcfae1680a3480b1d4b9db7e7

通常，你需要使用以下 hook 来与 atom 搭配使用。

<<<<<<< HEAD
- [`useRecoilState()`](/docs/api-reference/core/useRecoilState)：当你同时需要对 atom 进行读写时，使用此 hook。使用此 hook 会使组件订阅 atom。
- [`useRecoilValue()`](/docs/api-reference/core/useRecoilValue)：当你仅需要读取 atom 时，使用此 hook。使用此 hook 会使组件订阅 atom。
- [`useSetRecoilState()`](/docs/api-reference/core/useSetRecoilState)：当你仅需要写入 atom 时，使用此 hook。
- [`useResetRecoilState()`](/docs/api-reference/core/useResetRecoilState)：需将 atom 重置为默认值时，使用此 hook。
=======
- [`useRecoilState()`](/docs/api-reference/core/useRecoilState): Use this hook when you intend on both reading and writing to the atom. This hook subscribes the component to the atom.
- [`useRecoilValue()`](/docs/api-reference/core/useRecoilValue): Use this hook when you intend on only reading the atom. This hook subscribes the component to the atom.
- [`useSetRecoilState()`](/docs/api-reference/core/useSetRecoilState): Use this hook when you intend on only writing to the atom.
- [`useResetRecoilState()`](/docs/api-reference/core/useResetRecoilState): Use this hook to reset an atom to its default value.
>>>>>>> 78d7c93b23261f3dcfae1680a3480b1d4b9db7e7

在一些罕见的场景下，你需要在不订阅组件的情况下读取 atom 的值，请参考 [`useRecoilCallback()`](/docs/api-reference/core/useRecoilCallback)。

<<<<<<< HEAD
### 示例
=======
You can initialize an atom either with a static value or with a `Promise` or a `RecoilValue` representing a value of the same type.  Because the `Promise` may be pending or the default selector may be asynchronous it means that the atom value may also be pending or throw an error when reading.  Note that you cannot currently assign a `Promise` when setting an atom.  Please use [selectors](/docs/api-reference/core/selector) for async functions.

Atoms cannot be used to store `Promise`s or `RecoilValues` directly, but they may be wrapped in an object.  Note that `Promises` may be mutable.

### Example
>>>>>>> 78d7c93b23261f3dcfae1680a3480b1d4b9db7e7

```jsx
import {atom, useRecoilState} from 'recoil';

const counter = atom({
  key: 'myCounter',
  default: 0,
});

function Counter() {
  const [count, setCount] = useRecoilState(counter);
  const incrementByOne = () => setCount(count + 1);

  return (
    <div>
      Count: {count}
      <br />
      <button onClick={incrementByOne}>Increment</button>
    </div>
  );
}
```
