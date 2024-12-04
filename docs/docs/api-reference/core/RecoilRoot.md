---
title: <RecoilRoot ...props />
sidebar_label: <RecoilRoot />
---

提供了上下文，并且 atom 有值。此组件必须是所有使用 Recoil hook 的根组件。

---

### Props
<<<<<<< HEAD
- `initializeState?`: `({set, setUnvalidatedAtomValues}) => void`。
  - 可选函数，可使用 [`MutableSnapshot`](/docs/api-reference/core/Snapshot#Transforming_Snapshots) 来[初始化](/docs/api-reference/core/Snapshot#state-initialization) `<RecoilRoot>` 类型的 atom 状态。这为初始渲染设置了状态，并不打算用于后续的状态变化或异步的初始化。使用类似 [`useSetRecoilState()`](/docs/api-reference/core/useSetRecoilState) 或 [`useRecoilCallback()`](/docs/api-reference/core/useRecoilCallback) 的 hook 来同步状态的变化。
=======
- `initializeState?`: `(MutableSnapshot => void)`
  - An optional function that takes a [`MutableSnapshot`](/docs/api-reference/core/Snapshot#transforming-snapshots) to [initialize](/docs/api-reference/core/Snapshot#state-initialization) the `<RecoilRoot>` atom state.  This sets up the state for the initial render and is not intended for subsequent state changes or async initialization.  Use hooks such as [`useSetRecoilState()`](/docs/api-reference/core/useSetRecoilState) or [`useRecoilCallback()`](/docs/api-reference/core/useRecoilCallback) for async state changes.  [Atom effects](/docs/guides/atom-effects) can be used for easier initialization of dynamic atoms and co-locating initialization logic with atom definitions.  Atom effect initializations take precedence over `initializeState`.
>>>>>>> efeea915f57df6cd988517c264c934bfb8d740f2
- `override?`: `boolean`
 - 默认为 `true`。这个 prop 只有在这个 `<RecoilRoot>` 被嵌套在另一个 `<RecoilRoot>` 中时才重要。如果 `override` 为 `true`，这个根将创建一个新的 Recoil 范围。如果 `override` 为 `false`，这个 `<RecoilRoot>` 除了渲染它的子代外，将不执行任何功能，因此这个根的子代将访问最近的祖先 RecoilRoot 的 Recoil 值。

### 使用多个 `<RecoilRoot>`

多个 `<RecoilRoot>` 可以共存，代表 atom 状态的独立提供者/存储者；atom 在每个根中拥有不同的值。当你将一个根嵌入到另一个根中时，这一行为保持不变（内部根将覆盖外部根），除非你将 `override` 设为 `false`（详见 `Props`）。

<<<<<<< HEAD
注意，缓存可以跨根节点共享，如 selector 缓存。 Selector 的评估对于缓存或日志必须幂等，因此跨根结点缓存不应该是个问题，但是可能会被观测到或者引起重复查询。
请注意，缓存（如 selector 缓存）可以跨根节点共享。Selector 求值除了缓存或日志必须幂等，所以夸根节点缓存应该不是问题，但可能会被观测到，或者可能导致在根之间缓存冗余查询。
=======
Note that caches, such as selector caches, may be shared across roots. Selector evaluations must be idempotent except for caching or logging, so this should generally not be a problem, however it is observable and may cause redundant queries to be cached across roots.  Caches may be cleared using [`useRecoilRefresher_UNSTABLE()`](/docs/api-reference/core/useRecoilRefresher).
>>>>>>> efeea915f57df6cd988517c264c934bfb8d740f2

### 示例

```jsx
import {RecoilRoot} from 'recoil';

function AppRoot() {
  return (
    <RecoilRoot>
      <ComponentThatUsesRecoil />
    </RecoilRoot>
  );
}
```
