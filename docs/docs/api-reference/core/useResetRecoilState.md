---
title: useResetRecoilState(state)
sidebar_label: useResetRecoilState()
---

返回一个函数，用来把给定 state 重置为其初始值。

Using `useResetRecoilState()` allows a component to reset the state to its default value without subscribing the component to re-render whenever the state changes.

---

```jsx
function useResetRecoilState<T>(state: RecoilState<T>): () => void;
```

- `state`：一个可写的 Recoil state

### 示例

```jsx
import {todoListState} from "../atoms/todoListState";

const TodoResetButton = () => {
  const resetList = useResetRecoilState(todoListState);
  return <button onClick={resetList}>Reset</button>;
};
```
