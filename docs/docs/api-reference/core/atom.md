---
title: atom(options)
sidebar_label: atom()
---

一个 *atom* 表示 Recoil 的 state。`atom()` 函数返回一个可写的 `RecoilState` 对象。

---

```jsx
function atom<T>({
  key: string,
  default: T | Promise<T> | RecoilValue<T>,

  effects_UNSTABLE?: $ReadOnlyArray<AtomEffect<T>>,

  dangerouslyAllowMutability?: boolean,
}): RecoilState<T>
```

  - `key` - 在内部用于标识 atom 的唯一字符串。在整个应用中，该字符串必须相对于其他 atom 和 selector 保持唯一。
  - `default` - atom 的初始值，或一个 `Promise`，或另一个 atom，或一个用来表示相同类型的值的 selector。
  - `dangerouslyAllowMutability` - 在某些情况下，我们可能希望允许存储在 atom 中的对象发生改变，而这些变化并不代表 status 的变更。使用这个选项可以覆盖开发模式下的 freezing 对象。

---

Recoil 管理 atom 的 state 变化，以便通知订阅该 atom 的组件何时重新渲染，所以你需使用下面列出的狗子函数来改变 atom 的 state。如果一个存储在 atom 中的对象被直接 mutated，它可能会绕过钩子，在没有正确触发订阅的情况下导致 state 的变化，为了帮助大家检测 bug，Recoil 会在开发模式下 freeze 存储在 atom 中的对象。

通常，你需要使用以下 hook 来与 atom 搭配使用。

- [`useRecoilState()`](/docs/api-reference/core/useRecoilState)：当你同时需要对 atom 进行读写时，使用此 hook。使用此 hook 会使组件订阅 atom。
- [`useRecoilValue()`](/docs/api-reference/core/useRecoilValue)：当你仅需要读取 atom 时，使用此 hook。使用此 hook 会使组件订阅 atom。
- [`useSetRecoilState()`](/docs/api-reference/core/useSetRecoilState)：当你仅需要写入 atom 时，使用此 hook。
- [`useResetRecoilState()`](/docs/api-reference/core/useResetRecoilState)：需将 atom 重置为默认值时，使用此 hook。

在一些罕见的场景下，你需要在不订阅组件的情况下读取 atom 的值，请参考 [`useRecoilCallback()`](/docs/api-reference/core/useRecoilCallback)。

You can initialize an atom either with a static value or with a `Promise` or a `RecoilValue` representing a value of the same type.  Because the `Promise` may be pending or the default selector may be asynchronous it means that the atom value may also be pending or throw an error when reading.  Note that you cannot currently assign a `Promise` when setting an atom.  Please use [selectors](/docs/api-reference/core/selector) for async functions.

Atoms cannot be used to store `Promise`'s or `RecoilValue`'s directly, but they may be wrapped in an object.  Note that `Promise`'s may be mutable.  Atoms can be set to a `function`, as long as it is pure, but to do so you may need to use the updater form of setters. (e.g. `set(myAtom, () => myFunc);`).

### 示例

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
