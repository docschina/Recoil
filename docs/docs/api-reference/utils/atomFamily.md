---
title: atomFamily(options)
sidebar_label: atomFamily()
---

返回一个返回可写的 `RecoilState` [atom](/docs/api-reference/core/atom) 函数。

---

```jsx
function atomFamily<T, P: Parameter>({
  key: string,

  default?:
    | T
    | Promise<T>
    | Loadable<T>
    | WrappedValue<T>
    | RecoilValue<T>
    | (P => T | Promise<T> | Loadable<T> | WrappedValue<T> | RecoilValue<T>),

  effects?:
    | $ReadOnlyArray<AtomEffect<T>>
    | (P => $ReadOnlyArray<AtomEffect<T>>),

  dangerouslyAllowMutability?: boolean,
}): P => RecoilState<T>
```

<<<<<<< HEAD
- `key` —— 一个在内部用来标识 atom 的唯一字符串。在整个应用中，该字符串必须相对于其他 atom 和 selector 保持唯一。
- `default` —— atom 的初始值。它可以是一个直接的值，一个代表默认值的`RecoilValue` 或 `Promise`，或者一个获得默认值的函数。回调函数被传递给 `atomFamily` 函数被调用时使用的参数的副本。
- `effects_UNSTABLE` —— 一个可选的数组，或回调函数，用于根据 [Atom Effects](/docs/guides/atom-effects) 的族参数获取数组。
- `dangerouslyAllowMutability` —— Recoil 依赖 atom 状态的变化来知道何时通知使用原 atom 组件重新渲染。如果一个 atom 的值发生了变异，它可能会绕过这个，并导致状态发生变化，而不正确地通知订阅组件。为了防止这种情况，所有存储的值都被冻结。在某些情况下，我们可能希望使用这个选项来覆盖这一点。

---

一个 `atom` 是一个有 _Recoil_ 的状态。一个 atom 是由你的应用程序在每个 `<RecoilRoot>` 创建和注册。但是，如果你的状态不是全局的呢？如果你的状态是与一个控件的特定实例，或与一个特定的元素相关联呢？例如，也许你的应用程序是一个 UI 原型设计工具，用户可以动态地添加元素，每个元素都有状态，比如说它的位置。理想情况下，每个元素都会有自己的状态 atom。你可以通过备忘录模式自己实现这一点。但是， _Recoil_ 通过 `atomFamily` 为你提供了这种模式。一个 atom 家族代表一个 atom 的集合。当你调用 `atomFamily` 时，它将返回一个函数，根据你传入的参数提供 `RecoilState` atom。

`atomFamily` 本质上提供了一个从参数到 atom 的映射。你只需要为 `atomFamily` 提供一个 key，它将为每个底层 atom 生成一个唯一的 key。这些 atom 的 key 可用于持久化，因此必须在不同的应用执行中保持稳定。参数也可能在不同的调用站生成，我们希望同等的参数使用相同的底层 atom。因此，对于 `atomFamily` 参数，我们使用值等价法而不是引用等价法。这对可用于参数的类型进行了限制。`atomFamily` 接受原始类型，或数组或对象，它们可以包含数组、对象或原始类型。
=======
- `key` - A unique string used to identify the atom internally. This string should be unique with respect to other atoms and selectors in the entire application.
- `default` - The initial value of the atom.  Like an atom, it may either be a value directly or a `Promise`, [`Loadable`](/docs/api-reference/core/Loadable), wrapped value, or another atom/selector that represents the default value.  Atom families can also be a function that is passed a parameter and returns the default for that family member.  If not provided, the atom will start in a pending state and trigger Suspense.
- `effects` - An optional array, or callback to get the array based on the family parameter, of [Atom Effects](/docs/guides/atom-effects).
- `dangerouslyAllowMutability` - Recoil depends on atom state changes to know when to notify components that use the atoms to re-render.  If an atom's value were mutated, it may bypass this and cause state to change without properly notifying subscribing components.  To help protect against this all stored values are frozen.  In some cases it may be desireable to override this using this option.

---

An `atom` represents a piece of state with _Recoil_. An atom is created and registered per `<RecoilRoot>` by your app. But, what if your state isn’t global? What if your state is associated with a particular instance of a control, or with a particular element? For example, maybe your app is a UI prototyping tool where the user can dynamically add elements and each element has state, such as its position. Ideally, each element would get its own atom of state. You could implement this yourself via a memoization pattern. But, _Recoil_ provides this pattern for you with the `atomFamily()` utility. An Atom Family represents a collection of atoms. When you call `atomFamily()` it will return a function which provides the `RecoilState` atom based on the parameters you pass in.

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
The `atomFamily()` essentially provides a map from the parameter to an atom.  You only need to provide a single key for the atom family and it will generate a unique key for each underlying atom.  These atom keys can be used for persistence, and so must be stable across application executions.

There are restrictions on the type you can use as the family `Parameter`.  They may be generated at different callsites and we want equivalent parameters to reference the same underlying atom.  Therefore, parameters are compared using value-equality and must be serializable.  To be serializable it must be either:
  * A primitive value
  * An array, object, `Map`, or `Set` of serializable values
  * Contain a `toJSON()` method which returns a serializable value, similar to `JSON.stringify()`
>>>>>>> 3afa6422dc627900c4bc154fe857921ae8f6ebb9

## 示例

```jsx
const elementPositionStateFamily = atomFamily({
  key: 'ElementPosition',
  default: [0, 0],
});

function ElementListItem({elementID}) {
  const position = useRecoilValue(elementPositionStateFamily(elementID));
  return (
    <div>
      Element: {elementID}
      Position: {position}
    </div>
  );
}
```

## Family Defaults

`atomFamily()` 与简单的 [`atom()`](/docs/api-reference/core/atom) 的选项几乎相同。然而，默认值也可以被参数化。这意味着你可以提供一个函数，它接收参数值并返回实际的默认值。比如说

```jsx
const myAtomFamily = atomFamily({
  key: ‘MyAtom’,
  default: param => defaultBasedOnParam(param),
});
```

对于基于其他状态的动态默认值，可以使用 [`selectorFamily()`](/docs/api-reference/utils/selectorFamily)，它可以访问参数的值。不要只用 `selector()` 来做 `atomFamily()`  的默认值，因为会产生重复的键。

```jsx
const myAtomFamily = atomFamily({
  key: ‘MyAtom’,
  default: selectorFamily({
    key: 'MyAtom/Default',
    get: param => ({get}) => {
      const otherAtomValue = get(otherState);
      return computeDefaultUsingParam(otherAtomValue, param);
    },
  }),
});
```

## 订阅

与试图用所有元素的状态图来存储一个单独的 atom 相比，为每个元素使用这种模式的一个好处是，它们都保持着各自的订阅。因此，更新一个元素的值将只导致订阅了该 atom 的 React 组件更新。

## 作用域 atoms

有时，你可能想通过其他的 prop、Context 或者部分状态来 “划分” 原子状态。比如：

```jsx
const viewWidthForPaneState = atomFamily<number, PaneID>({
  key: 'ViewWidthForPane',
  default: 42,
});

function PaneView() {
  const paneID = useContext(PaneIDContext);
  const viewWidth = useRecoilValue(viewWidthForPaneState(paneID));
  ...
}
```

如果你想通过其他的 Recoil 状态来划分范围，并希望避免在每次调用时查找范围参数，你可以使用 [`selector()`](/docs/api-reference/core/selector) 进行包装，这对你来说可能非常有用：

```jsx
const viewWidthState = selector({
  key: 'ViewWidth',
  get: ({get}) => viewWidthForPane(get(currentPaneState)),
  set: ({get, set}, newValue) => set(viewWidthForPane(get(currentPaneState)), newValue),
});

function PaneView() {
  const viewWidth = useRecoilValue(viewWidthState);
  ...
}
```

## 持久性

<<<<<<< HEAD
持久 observer 将把每个参数值的状态持久化为一个独特的 atom，并根据所使用的参数值的序列化而有一个独特的 key。因此，只使用基元或包含基元的简单复合对象的参数是很重要的；自定义类或函数是不允许的。
=======
Persistence observers and [atom effects](/docs/guides/atom-effects) will sync the state for each parameter value as a distinct atom with a unique key based on serialization of the parameter value used. Therefore, it is important to [serializable parameters](/docs/api-reference/utils/atomFamily#parameter-type). Custom classes or functions are not allowed.
>>>>>>> 3afa6422dc627900c4bc154fe857921ae8f6ebb9
