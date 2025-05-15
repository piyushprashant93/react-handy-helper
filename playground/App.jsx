import React, { useState } from 'react'
import {
  useDebouncedCallback,
  useThrottledCallback,
  useSearchFilter
} from 'react-handy-helper'

export default function App() {
  const [input, setInput] = useState('')
  const [debouncedLogs, setDebouncedLogs] = useState([])
  const [throttledLogs, setThrottledLogs] = useState([])

  const [debounced] = useDebouncedCallback((val) => {
    setDebouncedLogs((prev) => [...prev, `Debounced: ${val}`])
  }, 600)

  const throttled = useThrottledCallback((val) => {
    setThrottledLogs((prev) => [...prev, `Throttled: ${val}`])
  }, 600)

  const {
    filter,
    handleFilterDebounce
  } = useSearchFilter({
    type: 'day',
    from: null,
    to: null,
    search: ''
  })

  const handleChange = (e) => {
    const val = e.target.value
    setInput(val)
    debounced(val)
    throttled(val)
    handleFilterDebounce(val)
  }

  return (
    <div style={{ padding: 40, fontFamily: 'sans-serif' }}>
      <h1>🧩 useDebouncedCallback vs useThrottledCallback + useSearchFilter</h1>

      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Type here..."
        style={{
          padding: '10px',
          fontSize: '16px',
          width: '300px',
          marginBottom: '20px',
        }}
      />

      <div>
        <h4>🔍 useSearchFilter.search: {filter.search}</h4>
      </div>

      <div style={{ display: 'flex', gap: '40px', marginTop: '30px' }}>
        <div>
          <h3>⏱ Debounced Logs</h3>
          <ul>
            {debouncedLogs.map((log, i) => (
              <li key={i}>{log}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3>🚀 Throttled Logs</h3>
          <ul>
            {throttledLogs.map((log, i) => (
              <li key={i}>{log}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
