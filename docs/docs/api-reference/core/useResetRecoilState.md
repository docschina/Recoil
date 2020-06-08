---
title: useResetRecoilState(state)
sidebar_label: useResetRecoilState()
---

返回一个函数，用来把给定 state 重置为其初始值。

---

<<<<<<< HEAD
- `state`：一个可写的 Recoil state
=======
```jsx
function useResetRecoilState<T>(state: RecoilState<T>): () => void;
```

- `state`: a writeable Recoil state
>>>>>>> 78d7c93b23261f3dcfae1680a3480b1d4b9db7e7

### 示例

```jsx
import {todoListState} from "../atoms/todoListState";

const TodoResetButton = () => {
  const resetList = useResetRecoilState(todoListState);
  return <button onClick={resetList}>Reset</button>;
};
```
