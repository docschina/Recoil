---
title: selectorFamily(options)
sidebar_label: selectorFamily()
---

返回一个函数，该函数返回一个只读的 `RecoilValueReadOnly` 或者可写的 `RecoilState` selector。

`selectorFamily` 是一个功能强大的模式，类似于 [`selector`](/docs/api-reference/core/selector)，但允许你将参数传递给 `selector` 的 `get` 和 `set` 回调。`selectorFamily()` 工具函数的返回值是一个函数，该函数可以使用自定义的参数进行调用并会翻译一个 selector。对每个唯一参数值，该函数都将返回相同的 selector 实例。

---
Read-only selector family:
```jsx
function selectorFamily<T, P: Parameter>({
  key: string,

  get: P => ({
    get: GetRecoilValue
    getCallback: GetCallback<T>,
  }) =>
    T | Promise<T> | Loadable<T> | WrappedValue<T> | RecoilValue<T>,

  dangerouslyAllowMutability?: boolean,
}): P => RecoilValueReadOnly<T>
```

Writable selector family:
```jsx
function selectorFamily<T, P: Parameter>({
  key: string,

  get: P => ({
    get: GetRecoilValue
    getCallback: GetCallback<T>,
  }) =>
    T | Promise<T> | Loadable<T> | WrappedValue<T> | RecoilValue<T>,

  set: P => (
    {
      get: GetRecoilValue,
      set: SetRecoilValue,
      reset: ResetRecoilValue,
    },
    newValue: T | DefaultValue,
  ) => void,

  dangerouslyAllowMutability?: boolean,

  cachePolicy_UNSTABLE?: CachePolicy,
}): P => RecoilState<T>
```

Where

```jsx
type ValueOrUpdater<T> =  T | DefaultValue | ((prevValue: T) => T | DefaultValue);

type GetRecoilValue = <T>(RecoilValue<T>) => T;
type SetRecoilValue = <T>(RecoilState<T>, ValueOrUpdater<T>) => void;
type ResetRecoilValue = <T>(RecoilState<T>) => void;

type GetCallback<T> =
  <Args, Return>(
    callback: ({node: RecoilState<T>, ...CallbackInterface}) => (...Args) => Return,
  ) => (...Args) => Return;

type CachePolicy =
  | {eviction: 'lru', maxSize: number}
  | {eviction: 'keep-all'}
  | {eviction: 'most-recent'};
```

- `key` - 用于内部识别 atom 的唯一字符串。相对于整个应用程序中的其他 atom 和 selector，该字符串应该是唯一的。
- `get` - 传递给命名回调对象的函数，与 `selector()` 接口相同，该回调将返回 selector 的值。这是一个包装函数，该函数通过调用 selector 族函数获取参数。
- `set?` - 它应该是一个带有命名回调对象的函数，与 `selector()` 接口相同。这也是一个包装函数，该函数通过调用 selector 族函数获取参数。
- `cachePolicy_UNSTABLE` - 定义内部选择器缓存的行为，用于**构成 family 的各个选择器**（它不控制存储在 family 中选择器的数量）。在有许多依赖关系变化的选择器应用程序中，控制内存占用非常有用。
  - `eviction` - 可以设置为 `lru`（需要设置 `maxSize`），`keep-all`（默认值），或者设置为 `most-recent`。当缓存大小超过 `maxSize` 时，`lru` 缓存策略将从选择器缓存中移除最近较少使用的值。`keep-all` 策略将意味着所有选择器的依赖关系以及它们的值将无限期地存储在选择器缓存中。而 `most-recent` 策略将使用一个大小为 1 的缓存，并将只保留最近保存的依赖关系和它们的值。
  - 注意与 `lru` 一起使用的 `maxSize` 属性并不控制其本身的最大 Size，它仅控制组成 family 的单个选择器中使用的驱逐策略。
  - 注意，缓存会根据一个包含所有依赖关系及其值的 key 来存储选择器的值。这意味着内部选择器缓存的大小既取决于选择器值的大小，也取决于所有依赖关系的唯一值数量。
  - 注意，默认的驱逐策略（目前是 "保持所有"）在未来可能会改变。

---

<<<<<<< HEAD
`selectorFamily` 本质上提供了从参数到选择器的映射。因为参数通常是使用族在调用站点上生成的，并且我们希望等效的参数重新使用相同的基础选择器，所以默认情况下它使用值相等而不是引用相等。（有一个不稳定的 API 可以调整此行为）。这对可用于参数的类型施加了限制。请使用原始类型或可以序列化的对象。Recoil 使用可以支持对象和数组的自定义序列化程序，某些容器（例如ES6 Sets和Maps）不改变对象键顺序，支持Symbols、Iterables，并可用 `toJSON` 属性来进行自定义序列化（例如类似不可变容器之类的库）。在参数中使用函数或可变对象（如 Promises）都有可能造成问题。
=======
The `selectorFamily()` essentially provides a map from the parameter to a selector.  You only need to provide a single key for the atom family and it will generate a unique key for each underlying selector.

## Parameter Type
```jsx
type Primitive = void | null | boolean | number | string;
interface HasToJSON {
  toJSON(): Parameter;
}
type Parameter =
  | Primitive
  | HasToJSON
  | $ReadOnlyArray<Parameter>
  | $ReadOnly<{[string]: Parameter}>
  | $ReadOnlySet<Parameter>
  | $ReadOnlyMap<Parameter, Parameter>;
```
There are restrictions on the type you can use as the family `Parameter`.  They may be generated at different callsites and we want equivalent parameters to reference the same underlying selector.  Therefore, parameters are compared using value-equality and must be serializable.  Using functions or mutable objects, such as Promises, in parameters is problematic.  To be serializable it must be either:
  * A primitive value
  * An array, object, `Map`, or `Set` of serializable values
  * Contain a `toJSON()` method which returns a serializable value, similar to `JSON.stringify()`
>>>>>>> 1cab3616a526107f0111fa6448cbc753645d300d

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
    set(formState, prevState => ({...prevState, [field]: newValue})),
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

## Cache 策略配置

`cachePolicy_UNSTABLE` 属性允许你配置 family 中的 **单个选择器** 的缓存行为。此属性可用于减少具有大量更改依赖项大量选择器的应用程序内存。请参阅 [选择器缓存策略配置文档](/docs/api-reference/core/selector#cache-policy-configuration)。
