---
title: useRecoilValueLoadable()
sidebar_label: useRecoilValueLoadable()
---

<<<<<<< HEAD
返回一个 `Loadable`.
=======
```jsx
function useRecoilValueLoadable<T>(state: RecoilValue<T>): Loadable<T>
```

Returns a `Loadable`.
>>>>>>> f2edd6bec9db35bd999e692b046556827f22f44e

该 hook 用来读取异步的 selector。使用此 hook 会使组件隐式地订阅给定的 state。

与 `useRecoilValue()` 不同，当从一个挂起的异步 selector 中读取值时，这个 hook 不会抛出一个 `Promise`（为了可以和 Suspense 一起使用）。而是会返回一个 `Loadable`，这是一个具有以下接口的对象：

<<<<<<< HEAD
- `state`：表示 selector 的状态。可选的值有 `'hasValue'`，`'hasError'`，`'loading'`。
- `getValue()`：如果有错误，这个函数会抛出这个错误。如果 selector 仍在加载中，它会抛出一个 Promise。否则，它就会返回这个 selector resolve 的值。
- `toPromise()`：返回一个 `Promise`，当 selector resolve 时它也会 resolve。如果该 selector 是异步的或者已经 resolve 了，它就会返回一个立即 resolve 的 `Promise`。

---

- `state`：一个 _可能_ 有一些异步操作的 [`selector`](/docs/api-reference/core/selector) 。给定 selector 的状态决定了返回的 loadable 的状态。
=======
- `state`: indicates the status of the selector. Possible values are `'hasValue'`, `'hasError'`, `'loading'`.
- `contents`: The value represented by this `Loadable`.  If the state is `hasValue`, it is the actual value, if the state is `hasError` it is the `Error` object that was thrown, and if the state is `loading`, then it is a `Promise` of the value.
- `getValue()`: if there is an error, this function throws the error. If selector is still loading, it throws a Promise. Otherwise it returns the value that the selector resolved to.
- `toPromise()`: returns a `Promise` that will resolve when the selector has resolved. If the selector is synchronous or has already resolved, it returns a `Promise` that resolves immediately.

---

- `state`: an [`atom`](/docs/api-reference/core/atom) or [`selector`](/docs/api-reference/core/selector) that _may_ have some asynchronous operations. The status of the returned loadable will depend on the status of the provided state selector.
>>>>>>> f2edd6bec9db35bd999e692b046556827f22f44e

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
