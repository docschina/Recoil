---
title: <RecoilRoot ...props />
sidebar_label: <RecoilRoot />
---

提供了上下文，并且 atom 有值。此组件必须是所有使用 Recoil hook 的根组件。其中多个根组件可以并存；atom 在不同根组件的内部有着不同的值。如果它们互相嵌套了，则最内部的根组件会完全覆盖其他所有的外部根组件。

---

**Props**:
- `initializeState?`: `({set, setUnvalidatedAtomValues}) => void`。
  - 可选函数，可使用 [`MutableSnapshot`](/docs/api-reference/core/Snapshot#Transforming_Snapshots) 来初始化全局状态。


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
