---
title: useRecoilValueLoadable(state)
sidebar_label: useRecoilValueLoadable()
---

This hook is intended to be used for reading the value of asynchronous selectors. This hook will implicitly subscribe the component to the given state.

Unlike `useRecoilValue()`, this hook will not throw a `Promise` when reading from a pending asynchronous selector (for the purpose of working alongside Suspense). Instead, this hook returns a `Loadable`, which is an object with the following interface:

---

```jsx
function useRecoilValueLoadable<T>(state: RecoilValue<T>): Loadable<T>
```
- `state`: an [`atom`](/docs/api-reference/core/atom) or [`selector`](/docs/api-reference/core/selector) that _may_ have some asynchronous operations. The status of the returned loadable will depend on the status of the provided state selector.

<<<<<<< HEAD
返回一个 `Loadable`.

该 hook 用来读取异步的 selector。使用此 hook 会使组件隐式地订阅给定的 state。

与 `useRecoilValue()` 不同，当从一个挂起的异步 selector 中读取值时，这个 hook 不会抛出一个 `Promise`（为了可以和 Suspense 一起使用）。而是会返回一个 `Loadable`，这是一个具有以下接口的对象：
=======
Returns a `Loadable` which has the interface:
>>>>>>> 78d7c93b23261f3dcfae1680a3480b1d4b9db7e7

- `state`：表示 selector 的状态。可选的值有 `'hasValue'`，`'hasError'`，`'loading'`。
- `contents`：此值代表 `Loadable` 的结果。如果状态为 `hasValue`，则值为实际结果；如果状态为 `hasError`，则会抛出一个错误对象；如果状态为 `loading`，则值为 `Promise`。
- `getValue()`：如果有错误，这个函数会抛出这个错误。如果 selector 仍在加载中，它会抛出一个 Promise。否则，它就会返回这个 selector resolve 的值。
- `toPromise()`：返回一个 `Promise`，当 selector resolve 时它也会 resolve。如果该 selector 是异步的或者已经 resolve 了，它就会返回一个立即 resolve 的 `Promise`。

---

<<<<<<< HEAD
- `state`：一个 _可能_ 有一些异步操作的 [`selector`](/docs/api-reference/core/selector) 。给定 selector 的状态决定了返回的 loadable 的状态。

### 示例
=======
### Example
>>>>>>> 78d7c93b23261f3dcfae1680a3480b1d4b9db7e7

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
