---
title: <RecoilRoot ...props />
sidebar_label: <RecoilRoot />
---

提供了上下文，并且 atom 有值。此组件必须是所有使用 Recoil hook 的根组件。其中多个根组件可以并存；atom 在不同根组件的内部有着不同的值。如果它们互相嵌套了，则最内部的根组件会完全覆盖其他所有的外部根组件。

---

**Props**:
<<<<<<< HEAD
- `initializeState?`: `({set, setUnvalidatedAtomValues}) => void`。
  - 可选函数，可使用 [`MutableSnapshot`](/docs/api-reference/core/Snapshot#Transforming_Snapshots) 来初始化全局状态。
=======
- `initializeState?`: `(MutableSnapshot => void)`
  - An optional function that takes a [`MutableSnapshot`](/docs/api-reference/core/Snapshot#transforming-snapshots) to initialize the `<RecoilRoot>` atom state.  This sets up the state for the initial render and is not intended for subsequent state changes or async initialization.  Use hooks such as [`useSetRecoilState()`](/docs/api-reference/core/useSetRecoilState) or [`useRecoilCallback()`](/docs/api-reference/core/useRecoilCallback) for async state changes.
>>>>>>> 54fa001b814683eb57952781d4d3c66282980178


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
