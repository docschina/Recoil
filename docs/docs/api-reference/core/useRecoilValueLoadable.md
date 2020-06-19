---
title: useRecoilValueLoadable(state)
sidebar_label: useRecoilValueLoadable()
---

This hook is intended to be used for reading the value of asynchronous selectors. This hook will implicitly subscribe the component to the given state.

Unlike [`useRecoilValue()`](/docs/api-reference/core/useRecoilValue), this hook will not throw an `Error` or `Promise` when reading from an asynchronous selector (for the purpose of working alongside [React Suspense](https://reactjs.org/docs/concurrent-mode-suspense.html)). Instead, this hook returns a [`Loadable`](/docs/api-reference/core/Loadable) object.

---

```jsx
function useRecoilValueLoadable<T>(state: RecoilValue<T>): Loadable<T>
```
- `state`：一个 [`atom`](/docs/api-reference/core/atom) 或一个 _可能_ 有一些异步操作的 [`selector`](/docs/api-reference/core/selector) 。给定 selector 的状态决定了返回的 loadable 的状态。

<<<<<<< HEAD
返回一个具有以下接口的 `Loadable`：

- `state`：表示 selector 的状态。可选的值有 `'hasValue'`，`'hasError'`，`'loading'`。
- `contents`：此值代表 `Loadable` 的结果。如果状态为 `hasValue`，则值为实际结果；如果状态为 `hasError`，则会抛出一个错误对象；如果状态为 `loading`，则值为 `Promise`。
- `getValue()`：如果有错误，这个函数会抛出这个错误。如果 selector 仍在加载中，它会抛出一个 Promise。否则，它就会返回这个 selector resolve 的值。
- `toPromise()`：返回一个 `Promise`，当 selector resolve 时它也会 resolve。如果该 selector 是异步的或者已经 resolve 了，它就会返回一个立即 resolve 的 `Promise`。
=======
Returns a [`Loadable`](/docs/api-reference/core/Loadable) for the current state with the interface:

- `state`: indicates the status of the selector. Possible values are `'hasValue'`, `'hasError'`, `'loading'`.
- `contents`: The value represented by this `Loadable`.  If the state is `hasValue`, it is the actual value, if the state is `hasError` it is the `Error` object that was thrown, and if the state is `loading`, then it is a `Promise` of the value.
>>>>>>> 8c61ff5a8f8ecf991c2eee2dac106b7c4f97a77b

---

### 示例

```jsx
function UserInfo({userID}) {
  const userNameLoadable = useRecoilValueLoadable(userNameQuery(userID));
  switch (userNameLoadable.state) {
    case 'hasValue':
      return <div>{userNameLoadable.contents}</div>;
    case 'loading':
      return <div>Loading...</div>;
    case 'hasError':
      throw userNameLoadable.contents;
  }
}
