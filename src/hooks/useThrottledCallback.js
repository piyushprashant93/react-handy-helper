import { useRef, useCallback } from 'react'

export function useThrottledCallback(callback, limit) {
    const lastCall = useRef(0)
    const timeout = useRef(null)
    const pendingArgs = useRef([])

    const throttled = useCallback((...args) => {
        const now = Date.now()
        const timeSinceLastCall = now - lastCall.current

        if (timeSinceLastCall >= limit) {
            callback(...args)
            lastCall.current = now
        } else {
            pendingArgs.current = args

            if (!timeout.current) {
                timeout.current = setTimeout(() => {
                    callback(...pendingArgs.current)
                    lastCall.current = Date.now()
                    timeout.current = null
                }, limit - timeSinceLastCall)
            }
        }
    }, [callback, limit])

    return throttled
}
