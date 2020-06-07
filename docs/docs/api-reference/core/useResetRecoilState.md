---
title: useResetRecoilState(state)
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
>>>>>>> 3b6769a0471ea70a44fa1584882208599138bcb4

### 示例

```jsx
import {todoListState} from "../atoms/todoListState";

const TodoResetButton = () => {
  const resetList = useResetRecoilState(todoListState);
  return <button onClick={resetList}>Reset</button>;
};
```
