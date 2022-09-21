---
title: class Loadable
sidebar_label: Loadable
---

`Loadable` 对象代表 Recoil [atom](/docs/api-reference/core/atom) 或 [selector](/docs/api-reference/core/selector) 的当前状态。此状态可能有一个可用值，也可能处于错误状态，或者是仍处于 pending 状态的异步解析。一个 `Loadable` 有如下接口：

<<<<<<< HEAD
- `state`：atom 或 selector 的当前状态。可能的值有 `'hasValue'`、`'hasError'` 或者 `'loading'`。
- `contents`：此 `Loadable`表示的值。如果 state 的值是 `hasValue`，其值为实际值；如果 state 的值是 `hasError`，其值为被抛出 `Error` 对象；如果 state 的值是 `loading`，那么你可以使用 `toPromise()` 得到一个 `Promise`。
=======
- `state`: The current state of the atom or selector.  Possible values are `'hasValue'`, `'hasError'`, or `'loading'`.
- `contents`: The value represented by this `Loadable`.  If the state is `hasValue`, it is the actual value, if the state is `hasError` it is the `Error` object that was thrown, and if the state is `loading`, then a `Promise` of the value.
>>>>>>> 102f2bf6288d8ccd62111ec046275148faa99fa2

Loadable 还包含用于访问当前状态的 helper 方法。**注意这些 API 并不稳定**：

<<<<<<< HEAD
- `getValue()` - 访问与 React Suspense 和 Recoil selectors 语义匹配的值的方法。如果 state 有值，那么它会返回该值；如果它为错误信息，那么它会抛出该错误；如果它仍然处于 pending 状态，那么它会暂停执行或者渲染以传递 pending 状态。
- `toPromise()`：返回值为 selector 执行完毕后执行的 `Promise`。如果此 selector 是同步执行的或者已经执行完毕，它会返回一个立即执行的 `Promise`。
- `valueMaybe()` - 如果有值则返回该值，否则返回 `undefined`。
- `valueOrThrow()` - 如果有值则返回该值，否则抛出错误。
- `map()` - 接受一个用以转换 Loadable 值的函数，并返回一个带有转换后值的新 Loadable。转换函数取得该值的参数并返回新值，它也可以抛出错误或者 suspense。
=======
- `getValue()` - Method to access the value that matches the semantics of React Suspense and Recoil selectors.  If the state has a value then it returns a value, if it has an error then it throws that error, and if it is still pending then it suspends execution or rendering to propagate the pending state.
- `toPromise()`: returns a `Promise` that will resolve when the selector has resolved. If the selector is synchronous or has already resolved it returns a `Promise` that resolves immediately.
- `valueMaybe()` - Returns the value if available, otherwise returns `undefined`
- `valueOrThrow()` - Returns the value if available or throws an Error.
- `map(callback)` - Takes a function to transform the value of the Loadable and returns a new `Loadable` with the transformed value.  The transformation function gets a parameter of the parent Loadable's value and you can return the new value for the new Loadable; it also propagates thrown errors or suspense.  Your callback function can return either a new value, a `Promise` or `Loadable` of a new value, or it can throw an error.  This method is comparable to `.then()` for Promises.
>>>>>>> 102f2bf6288d8ccd62111ec046275148faa99fa2

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

## Creating Loadables

The `RecoilLoadable` interface can be imported to create your own `Loadable` objects.

```jsx
interface RecoilLoadable {
  function of<T>(T | Promise<T>, Loadable<T>): Loadable<T>;
  function error<T>(mixed): Loadable<T>;
  function all(Array<mixed | Loadable<mixed> | Promise<mixed>>): Loadable<Array<mixed>>;
  function all({[string]: mixed | Loadable<mixed> | Promise<mixed>}): Loadable<{[string]: mixed}>;
  function loading(): Loadable<empty>;
  function isLoadable(mixed): boolean;
}
```

### Examples

```jsx
RecoilLoadable.of(123);

RecoilLoadable.error(new Error('ERROR'));

RecoilLoadable.all([
  RecoilLoadable.of(1),
  RecoilLoadable.of(10),
  RecoilLoadable.of(100),
]).map(([a, b, c]) => a+b+c);
```

Loadables may represent asynchronous values:

```jsx
// Asynchronously resolves to 123
RecoilLoadable.of(Promise.resolve(123));
```

Similar to `Promise.resolve()`, `RecoilLoadable.of()` can accept literal values as well as Loadables or Promises, which will be unpacked:

```jsx
// All resolve to 'x'
RecoilLoadable.of('x');
RecoilLoadable.of(RecoilLoadable.of('x'));
RecoilLoadable.of(Promise.resolve('x'));
```

Likewise, similar to `Promise.all()`, `RecoilLoadable.all()` can accept arrays of Loadables, Promises, or literal values:

```jsx
// Resolves to [1, 2, 3]
RecoilLoadable.all([1, RecoilLoadable.of(2), Promise.resolve(3)]);

// Resolves to {value: 1, loadable: 2, promise: 3}
RecoilLoadable.all({
  value: 1,
  loadable: RecoilLoadable.of(2),
  promise: Promise.resolve(3),
});

// Never resolves
RecoilLoadable.loading();
```
