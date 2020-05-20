---
title: useResetRecoilState()
---

返回一个函数，用来把给定 state 重置为其初始值。

---

- `state`：一个可写的 Recoil state

<<<<<<< HEAD
### 示例
=======
### Example

```jsx
import {todoListState} from "../atoms/todoListState";

const TodoResetButton = () => {
  const resetList = useResetRecoilState(todoListState);
  return <button onClick={resetList}>Reset</button>;
};
```
>>>>>>> 84bc80a8dd9c84be2b5eda6c4eef1aeb02df1bd9
