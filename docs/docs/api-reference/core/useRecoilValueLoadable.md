---
title: useRecoilValueLoadable(state)
sidebar_label: useRecoilValueLoadable()
---

返回一个 `Loadable`.

该 hook 用来读取异步的 selector。该 hook 会隐式地订阅给定 state 的组件。

与 `useRecoilValue()` 不同，当从一个挂起的异步 selector 中读取值时，这个 hook 不会抛出一个 `Promise`（为了可以和 Suspense 一起使用）。而是会返回一个 `Loadable`，这是一个具有以下接口的对象：

- `state`：表示 selector 的状态。可选的值有 `'hasValue'`，`'hasError'`，`'loading'`。
- `getValue()`：如果有错误，这个函数会抛出这个错误。如果 selector 仍在加载中，它会抛出一个 Promise。否则，它就会返回这个 selector resolve 的值。
- `toPromise()`：返回一个 `Promise`，当 selector resolve 时它也会 resolve。如果该 selector 是异步的或者已经 resolve 了，它就会返回一个立即 resolve 的 `Promise`。

---

- `state`：一个 _可能_ 有一些异步操作的 [`selector`](/docs/api-reference/core/selector) 。给定 selector 的状态决定了返回的 loadable 的状态。

### 示例

```jsx
```
