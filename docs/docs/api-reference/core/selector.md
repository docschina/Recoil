---
title: selector(options)
sidebar_label: selector()
---

根据传入该函数的选项，返回一个可写的或只读的 Recoil 状态。

你可以吧派生状态当作把 state 传入一个纯函数的输出值，此函数可以通过某种方式改变传入的 state。

---

- `options`
  - `key`：一个在内部用来标识 atom 的唯一字符串。在整个应用中，该字符串必须相对于其他 atom 和 selector 保持唯一。
  - `get`：一个传入具有如下属性的对象作为第一个参数的函数：
    - `get`：一个用来从其他 atom 或 selector 获取值的函数。所有传入该函数的 atom 或 selector 将会隐式地被添加到此 selector 的一个**依赖**列表中。如果这个 selector 的任何一个依赖发生改变，这个 selector 就会重新计算值。
  - `set?`：如果设置了该属性，selector 就会返回一个**可写**的 state。该函数需要传入具有如下属性的对象作为其第一个参数：
    - `get`：一个用来从其他 atom 或 selector 或缺值的函数。该函数不会为 selector 订阅给定的 atom 或 selector。
    - `set`：一个用来设置 Recoil 状态的函数。第一个参数时 Recoil 的 state，第二个参数时新的值。

### 示例 (同步)

```javascript
import {atom, selector, useRecoilState} from 'recoil';

const tempFahrenheit = atom({
  key: 'tempFahrenheit',
  default: 32,
});

const tempCelcius = selector({
  key: 'tempCelcius',
  get: ({get}) => ((get(tempFahrenheit) - 32) * 5) / 9,
  set: ({set}, newValue) => set(tempFahrenheit, (newValue * 9) / 5 + 32),
});

function TempCelcius() {
  const [tempF, setTempF] = useRecoilState(tempFahrenheit);
  const [tempC, setTempC] = useRecoilState(tempCelcius);

  const addTenCelcius = () => setTempC(tempC + 10);
  const addTenFahrenheit = () => setTempF(tempF + 10);

  return (
    <div>
      Temp (Celcius): {tempC}
      <br />
      Temp (Fahrenheit): {tempF}
      <br />
      <button onClick={addTenCelcius}>Add 10 Celcius</button>
      <br />
      <button onClick={addTenFahrenheit}>Add 10 Fahrenheit</button>
    </div>
  );
}
```

### 示例 (异步)
