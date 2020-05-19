---
title: useRecoilState()
sidebar_label: useRecoilState()
---

返回一个数组，第一个元素是 state 的值，第二个元素是一个 setter 函数，调用该函数时会更新为给定 state 的值。

使用此 hook 会使组件隐式地订阅给定的 state。

---

- `state`: 一个 [`atom`](/docs/api-reference/core/atom) 或一个 _可写_ 的 [`selector`](/docs/api-reference/core/selector)。可写的 selector 在其定义的同时具有 `get` 和 `set` 函数，而只读 selector 只有一个 `get`。

当组件同时需要读写状态时，推荐使用该 hook。

### 示例

```jsx
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
