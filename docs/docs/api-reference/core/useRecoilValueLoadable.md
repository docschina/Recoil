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

返回一个具有以下接口的 `Loadable`：

- `state`：表示 selector 的状态。可选的值有 `'hasValue'`，`'hasError'`，`'loading'`。
- `contents`：此值代表 `Loadable` 的结果。如果状态为 `hasValue`，则值为实际结果；如果状态为 `hasError`，则会抛出一个错误对象；如果状态为 `loading`，则值为 `Promise`。

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
