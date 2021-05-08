---
title: class Loadable
sidebar_label: Loadable
---

`Loadable` 对象代表 Recoil [atom](/docs/api-reference/core/atom) 或 [selector](/docs/api-reference/core/selector) 的当前状态。此状态可能有一个可用值，也可能处于错误状态，或者是仍处于 pending 状态的异步解析。一个 `Loadable` 有如下接口：

- `state`：atom 或 selector 的当前状态。可能的值有 `'hasValue'`、`'hasError'` 或者 `'loading'`。
- `contents`：此 `Loadable`表示的值。如果 state 的值是 `hasValue`，它就是实际值；如果 state 的值是 `hasError`，它就是被抛出 `Error` 对象；如果 state 的值是 `loading`，那么你可以使用 `toPromise()` 得到一个 `Promise` 的值。

Loadables 还包含用于访问当前状态的 helper 方法。**注意这些 API 并不稳定**：

- `getValue()` - 访问与 React Suspense 和 Recoil selectors 语义匹配的值的方法。如果 state 有一个值，那么它回返回一个值；如果它有一个错误，那么它会抛出那个错误；如果它仍然挂起，那么它会暂停执行或者渲染以传播挂起状态。
- `toPromise()`- 返回一个将在selector执行完毕后执行的 `Promise`。如果此 selector 是同步执行的或者已经执行完毕，它会返回一个能立即执行的 `Promise`。
- `valueMaybe()` - 如果有值便返回值，否则返回 `undefined`。
- `valueOrThrow()` - 如果有值便返回值，否则抛出错误。
- `map()` - 接受一个用来转换 Loadable 值的函数并返回一个带有已转换值的新 Loadable。转换函数取得该值的一个参数并返回新值，它也可以抛出错误或者挂起。

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
```
