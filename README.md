# 🧩 react-handy-helper

**A collection of lightweight, reusable React hooks for debounce, throttle, and filter-based logic.**

> Perfect for responsive UIs, input control, and search filtering.

---

## 📆 Installation

```bash
npm install react-handy-helper
```

Ensure `react` is installed as a peer dependency:

```bash
npm install react
```

---

## 🔧 Hooks Overview

| Hook                   | Description                                |
| ---------------------- | ------------------------------------------ |
| `useDebouncedCallback` | Delay callback execution                   |
| `useThrottledCallback` | Limit callback frequency                   |
| `useSearchFilter`      | Manage filter object with debounce support |

---

## ⏱ useDebouncedCallback

Delay the execution of a function until after a given wait time since the last call. Useful for search inputs and avoiding rapid triggers.

### ✅ Example

```js
import { useDebouncedCallback } from 'react-handy-helper'

const [debounced] = useDebouncedCallback((value) => {
  console.log('Debounced:', value)
}, 500)

<input onChange={(e) => debounced(e.target.value)} />
```

### 📘 API

```ts
const [debouncedFn, { cancel, flush }] = useDebouncedCallback(
  callback: Function,
  delay: number,
  maxWait?: number
)
```

* `delay`: Wait time in ms
* `maxWait` (optional): Forces call if reached
* `cancel()`: Cancel pending call
* `flush()`: Immediately invoke pending call

---

## 🚀 useThrottledCallback

Throttle the execution of a function to ensure it's only called once within a time window.

### ✅ Example

```js
import { useThrottledCallback } from 'react-handy-helper'

const throttled = useThrottledCallback((value) => {
  console.log('Throttled:', value)
}, 1000)

<input onChange={(e) => throttled(e.target.value)} />
```

### 📘 API

```ts
const throttledFn = useThrottledCallback(
  callback: Function,
  limit: number
)
```

* `limit`: Minimum time (in ms) between calls

---

## 🔍 useSearchFilter

Manages a filter object with helpers for updating fields and a built-in debounced search key.

### ✅ Example

```js
import { useSearchFilter } from 'react-handy-helper'

const {
  filter,
  handleFilter,
  handleFilterByKey,
  handleFilterDebounce
} = useSearchFilter()

<input
  onChange={(e) => handleFilterDebounce(e.target.value)}
  placeholder="Search..."
/>

handleFilterByKey('type', 'week')
handleFilter({ from: '2024-01-01', to: '2024-01-07' })
```

### 📘 API

```ts
const {
  filter,
  handleFilter,
  handleFilterByKey,
  handleFilterDebounce
} = useSearchFilter(initialFilter?: object)
```

* `filter`: Current filter object
* `handleFilter(obj)`: Merge into filter
* `handleFilterByKey(key, value)`: Update specific key
* `handleFilterDebounce(value)`: Debounced update to `search` key

---

## 🧪 Playground

Run the interactive demo locally:

```bash
npm run play
```

Includes real-time input handling using:

* `useDebouncedCallback`
* `useThrottledCallback`
* `useSearchFilter`


## 📝 License

MIT © [Piyush Prashant](https://github.com/piyushprashant93)

---

