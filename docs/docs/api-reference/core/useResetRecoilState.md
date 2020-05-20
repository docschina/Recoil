---
title: useResetRecoilState()
---

返回一个函数，用来把给定 state 重置为其初始值。

---

- `state`：一个可写的 Recoil state

### 示例

```jsx
import {todoListState} from "../atoms/todoListState";

const TodoResetButton = () => {
  const resetList = useResetRecoilState(todoListState);
  return <button onClick={resetList}>Reset</button>;
};
```
