---
title: waitForAny(dependencies)
sidebar_label: waitForAny()
---

<<<<<<< HEAD
一个返回一组表示请求依赖项当前状态的 [`Loadables`](/docs/api-reference/core/Loadable) 的并发 helper 方法。它将一直等待，直到至少有一个依赖项可用。
=======
A concurrency helper that returns a set of [`Loadable`s](/docs/api-reference/core/Loadable) for the current state of the requested dependencies.  It waits until at least one of the dependencies is available.
>>>>>>> c54cb9bb7e1733d7150dc58ecac2ceb93e4dd4b2

依赖项可以作为元组数组提供，也可以作为对象中的命名依赖项提供。

---

```jsx
function waitForAny(dependencies: Array<RecoilValue<>>):
  RecoilValueReadOnly<UnwrappedArrayOfLoadables>
```

```jsx
function waitForAny(dependencies: {[string]: RecoilValue<>}):
  RecoilValueReadOnly<UnwrappedObjectOfLoadables>
```
---

`waitForAny()` 类似于 [`waitForNone()`](/docs/api-reference/utils/waitForNone)，只是它要等到至少有一个依赖项具有可用的值 (或错误) ，而不是立即返回。
