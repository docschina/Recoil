---
title: atom(options)
sidebar_label: atom()
---

返回可写的 Recoil 状态。

---

- `options`
  - `key`：在内部用于标识 atom 的唯一字符串。在整个应用中，该字符串必须相对于其他 atom 和 selector 保持唯一。
  - `default`：atom 的初始值。

通常，你需要使用以下 hook 来与 atom 搭配使用。

- [`useRecoilState()`](/docs/api-reference/core/useRecoilState)：当你同时需要对 atom 进行读写时，使用此 hook。使用此 hook 会使组件订阅 atom。
- [`useRecoilValue()`](/docs/api-reference/core/useRecoilValue)：当你仅需要读取 atom 时，使用此 hook。使用此 hook 会使组件订阅 atom。
- [`useSetRecoilState()`](/docs/api-reference/core/useSetRecoilState)：当你仅需要写入 atom 时，使用此 hook。

在一些罕见的场景下，你需要在不订阅组件的情况下读取 atom 的值，请参考 [`useRecoilCallback()`](/docs/api-reference/core/useRecoilCallback)。

### 示例

```jsx
import {atom, useRecoilState} from 'recoil';

const counter = atom({
  key: 'myCounter',
  default: 0,
});

function Counter() {
  const [count, setCount] = useRecoilState(counter);
  const incrementByOne = () => setCount(count + 1);

  return (
    <div>
      Count: {count}
      <br />
      <button onClick={incrementByOne}>Increment</button>
    </div>
  );
}
```
