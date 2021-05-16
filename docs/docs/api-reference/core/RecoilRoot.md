---
title: <RecoilRoot ...props />
sidebar_label: <RecoilRoot />
---

<<<<<<< HEAD
提供了上下文，并且 atom 有值。此组件必须是所有使用 Recoil hook 的根组件。其中多个根组件可以并存；atom 在不同根组件的内部有着不同的值。如果它们互相嵌套了，则最内部的根组件会完全覆盖其他所有的外部根组件。

---

**Props**:
- `initializeState?`: `({set, setUnvalidatedAtomValues}) => void`。
  - 可选函数，可使用 [`MutableSnapshot`](/docs/api-reference/core/Snapshot#Transforming_Snapshots) 来[初始化](/docs/api-reference/core/Snapshot#state-initialization) `<RecoilRoot>` 类型的 atom 状态。This sets up the state for the initial render and is not intended for subsequent state changes or async initialization.  Use hooks such as [`useSetRecoilState()`](/docs/api-reference/core/useSetRecoilState) or [`useRecoilCallback()`](/docs/api-reference/core/useRecoilCallback) for async state changes.
=======
Provides the context in which atoms have values. Must be an ancestor of any component that uses any Recoil hooks.

---

### Props
- `initializeState?`: `(MutableSnapshot => void)`
  - An optional function that takes a [`MutableSnapshot`](/docs/api-reference/core/Snapshot#transforming-snapshots) to [initialize](/docs/api-reference/core/Snapshot#state-initialization) the `<RecoilRoot>` atom state.  This sets up the state for the initial render and is not intended for subsequent state changes or async initialization.  Use hooks such as [`useSetRecoilState()`](/docs/api-reference/core/useSetRecoilState) or [`useRecoilCallback()`](/docs/api-reference/core/useRecoilCallback) for async state changes.
- `override?`: `boolean`
  - Defaults to `true`. This prop only matters when this `<RecoilRoot>` is nested within another `<RecoilRoot>`. If `override` is `true`, this root will create a new Recoil scope. If override is `false`, this `<RecoilRoot>` will perform no function other than rendering its children, thus children of this root will access the Recoil values of the nearest ancestor RecoilRoot.
>>>>>>> 41a0a03a68240ffabc782806f369c3164d7ae9bc

### Using Multiple `<RecoilRoot>`'s

Multiple `<RecoilRoot>`'s  may co-exist and represent independent providers/stores of atom state; atoms will have distinct values within each root. This behavior remains the same when you nest one root inside anther one (inner root will mask outer roots), unless you specify `override` to be `false` (see "Props").

<<<<<<< HEAD
`<RecoilRoot>` 表示 atom state 的独立的 providers/stores。注意，缓存可以跨根节点共享，如 selector 缓存。 Selector 的评估对于缓存或日志必须幂等，因此跨根结点缓存不应该是个问题，但是可能会被观测到或者引起重复查询。
=======
Note that caches, such as selector caches, may be shared across roots.  Selector evaluations must be idempotent except for caching or logging, so this should not be a problem, but may be observable or may cause redundant queries to be cached across roots.
>>>>>>> 41a0a03a68240ffabc782806f369c3164d7ae9bc

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
