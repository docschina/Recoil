---
title: <RecoilRoot ...props />
sidebar_label: <RecoilRoot />
---

提供了上下文，并且 atom 有值。此组件必须是所有使用 Recoil hook 的根组件。其中多个根组件可以并存；atom 在不同根组件的内部有着不同的值。如果它们互相嵌套了，则最内部的根组件会完全覆盖其他所有的外部根组件。

---

<<<<<<< HEAD
- `props`
  - `initializeState?`：`({set, setUnvalidatedAtomValues}) => void`.
    - 此函数会在 RecoilStore 第一次渲染的时候被调用，可以用来设置 atom 的初始值。需要提供 2 个参数：
      - `set`：`<T>(RecoilValue<T>, T) => void`
        - 把单个 atom 的初始值设置为所传入的值，
      - `setUnvalidatedAtomValues`：`(Map<string, mixed>) => void`
        - 设置任意个 atom 的初始值，这些 atom 的 key 就是所传入 map 的 key。和 `useSetUnvalidatedAtomValues` 一样，每个 atom 的 validator 都会在它即将被读取的时候调用，如果设置 atom 时没有配置 validator，会导致异常。
=======
- `props` - ***NOTE:*** **This API is expected to change.**
  - `initializeState?`: `({set, setUnvalidatedAtomValues}) => void`.
    - A function that will be called when RecoilStore is first rendered which can set initial values for atoms. It is provided with two arguments:
      - `set`: `<T>(RecoilValue<T>, T) => void`
        - Sets the initial value of a single atom to the provided value.
      - `setUnvalidatedAtomValues`: `(Map<string, mixed>) => void`
        - ***NOTE:*** **This API is expected to change.**
        - Sets the initial value for any number of atoms whose keys are the keys in the provided map. As with `useSetUnvalidatedAtomValues`, the validator for each atom will be called when it is next read, and setting an atom without a configured validator will result in an exception.
>>>>>>> 3b6769a0471ea70a44fa1584882208599138bcb4

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
