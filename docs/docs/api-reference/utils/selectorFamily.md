---
title: selectorFamily(options)
sidebar_label: selectorFamily()
---

返回一个函数，该函数返回一个只读的 `RecoilValueReadOnly` 或者可写的 `RecoilState` selector。

`selectorFamily` 是一个功能强大的模式，类似于 [`selector`](/docs/api-reference/core/selector)，但允许你将参数传递给 `selector` 的 `get` 和 `set` 回调。`selectorFamily()` 工具函数的返回值是一个函数，该函数可以使用自定义的参数进行调用并会翻译一个 selector。对每个唯一参数值，该函数都将返回相同的 selector 实例。

---

```jsx
function selectorFamily<T, Parameter>({
  key: string,

  get: Parameter => ({get: GetRecoilValue}) => Promise<T> | RecoilValue<T> | T,

  dangerouslyAllowMutability?: boolean,
}): Parameter => RecoilValueReadOnly<T>
```

```jsx
function selectorFamily<T, Parameter>({
  key: string,

  get: Parameter => ({get: GetRecoilValue}) => Promise<T> | RecoilValue<T> | T,

  set: Parameter => (
    {
      get: GetRecoilValue,
      set: SetRecoilValue,
      reset: ResetRecoilValue,
    },
    newValue: T | DefaultValue,
  ) => void,

  dangerouslyAllowMutability?: boolean,

  cachePolicy_UNSTABLE?: CachePolicy,
}): Parameter => RecoilState<T>
```

Where

```jsx
type ValueOrUpdater<T> =  T | DefaultValue | ((prevValue: T) => T | DefaultValue);
type GetRecoilValue = <T>(RecoilValue<T>) => T;
type SetRecoilValue = <T>(RecoilState<T>, ValueOrUpdater<T>) => void;
type ResetRecoilValue = <T>(RecoilState<T>) => void;

type CachePolicy =
  | {eviction: 'lru', maxSize: number}
  | {eviction: 'keep-all'}
  | {eviction: 'most-recent'};
```

<<<<<<< HEAD
- `key` - 用于内部识别 atom 的唯一字符串。相对于整个应用程序中的其他 atom 和 selector，该字符串应该是唯一的。
- `get` - 传递给命名回调对象的函数，与 `selector()` 接口相同，该回调将返回 selector 的值。这是一个包装函数，该函数通过调用 selector 族函数获取参数。
- `set?` - 它应该是一个带有命名回调对象的函数，与 `selector()` 接口相同。这也是一个包装函数，该函数通过调用 selector 族函数获取参数。
=======
- `key` - A unique string used to identify the atom internally. This string should be unique with respect to other atoms and selectors in the entire application.
- `get` - A function that is passed an object of named callbacks that returns the value of the selector, the same as the `selector()` interface. This is wrapped by a function which is passed the parameter from calling the selector family function.
- `set?` - An optional function that will produce writeable selectors when provided. It should be a function that takes an object of named callbacks, same as the `selector()` interface. This is again wrapped by another function with gets the parameters from calling the selector family function.
- `cachePolicy_UNSTABLE` - Defines the behavior of the internal selector cache for **the invidual selectors** that make up the family (it does not control the number of selectors that are stored in the family). Can be useful to control the memory footprint in apps that have selectors with many changing dependencies.
  - `eviction` - can be set to `lru` (which requires that a `maxSize` is set), `keep-all` (default), or `most-recent`. An `lru` cache will evict the least-recently-used value from the selector cache when the size of the cache exceeds `maxSize`. A `keep-all` policy will mean all selector dependencies and their values will be indefinitely stored in the selector cache. A `most-recent` policy will use a cache of size 1 and will retain only the most recently saved set of dependencies and their values.
  - Note the `maxSize` property used alongside `lru` does not control the max size of the family itself, it only controls the eviction policy used in the invidiual selectors that make up the family.
  - Note the cache stores the values of the selector based on a key containing all dependencies and their values. This means the size of the internal selector cache depends on both the size of the selector values as well as the number of unique values of all dependencies.
  - Note the default eviction policy (currently `keep-all`) may change in the future.
>>>>>>> b4617a5807a606a1344280ba6185be5702da07af

---

`selectorFamily` 本质上提供了从参数到选择器的映射。因为参数通常是使用族在调用站点上生成的，并且我们希望等效的参数重新使用相同的基础选择器，所以默认情况下它使用值相等而不是引用相等。（有一个不稳定的 API 可以调整此行为）。这对可用于参数的类型施加了限制。请使用原始类型或可以序列化的对象。Recoil 使用可以支持对象和数组的自定义序列化程序，某些容器（例如ES6 Sets和Maps）不改变对象键顺序，支持Symbols、Iterables，并可用 `toJSON` 属性来进行自定义序列化（例如类似不可变容器之类的库）。在参数中使用函数或可变对象（如 Promises）都有可能造成问题。

## 示例

```jsx
const myNumberState = atom({
  key: 'MyNumber',
  default: 2,
});

const myMultipliedState = selectorFamily({
  key: 'MyMultipliedNumber',
  get: (multiplier) => ({get}) => {
    return get(myNumberState) * multiplier;
  },

  // 可选 set
  set: (multiplier) => ({set}, newValue) => {
    set(myNumberState, newValue / multiplier);
  },
});

function MyComponent() {
  // 默认为 2
  const number = useRecoilValue(myNumberState);

  // 默认为 200
  const multipliedNumber = useRecoilValue(myMultipliedState(100));

  return <div>...</div>;
}
```

## 异步查询示例

Selector 族对于将参数传递给查询也很有用。注意，使用 selector 来抽象这样的查询仍然应该是 “纯” 函数，对于给定的一组输入值和依赖值，它们总是返回相同的结果。更多相关示例，请参见 [指南](/docs/guides/asynchronous-data-queries)。

```jsx
const myDataQuery = selectorFamily({
  key: 'MyDataQuery',
  get: (queryParameters) => async ({get}) => {
    const response = await asyncDataRequest(queryParameters);
    if (response.error) {
      throw response.error;
    }
    return response.data;
  },
});

function MyComponent() {
  const data = useRecoilValue(myDataQuery({userID: 132}));
  return <div>...</div>;
}
```

## 销毁示例

```jsx
const formState = atom({
  key: 'formState',
  default: {
    field1: "1",
    field2: "2",
    field3: "3",
  },
});

const formFieldState = selectorFamily({
  key: 'FormField',
  get: field => ({get}) => get(formState)[field],
  set: field => ({set}, newValue) =>
    set(formState, prevState => {...prevState, [field]: newValue}),
});

const Component1 = () => {
  const [value, onChange] = useRecoilState(formFieldState('field1'));
  return (
    <>
      <input value={value} onChange={onChange} />
      <Component2 />
    </>
  );
}

const Component2 = () => {
  const [value, onChange] = useRecoilState(formFieldState('field2'));
  return (
    <input value={value} onChange={onChange} />
  );
}
```

## Cache policy configuration

The `cachePolicy_UNSTABLE` property allows you to configure the caching behavior of **individual selectors** that make up the family. This property can be useful for reducing memory in applications that have a large number of selectors that have a large number of changing dependencies.  Please see the [selector cache policy configuration documentation](/docs/api-reference/core/selector#cache-policy-configuration).
