import { useRef, useCallback } from 'react'

export function useDebouncedCallback(callback, delay, maxWait) {
    const timeout = useRef(null)
    const lastInvoke = useRef(0)
    const argsRef = useRef([])

    const cancel = () => {
        if (timeout.current) clearTimeout(timeout.current)
        timeout.current = null
        argsRef.current = []
    }

    const flush = () => {
        if (argsRef.current.length) {
            callback(...argsRef.current)
            argsRef.current = []
            lastInvoke.current = Date.now()
        }
    }

    const debounced = useCallback((...args) => {
        argsRef.current = args
        const now = Date.now()

        if (timeout.current) clearTimeout(timeout.current)

        if (maxWait && now - lastInvoke.current >= maxWait) {
            flush()
        } else {
            timeout.current = setTimeout(flush, delay)
        }
    }, [callback, delay, maxWait])

    return [debounced, { cancel, flush }]
}
