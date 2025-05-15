import { useCallback, useMemo, useState } from 'react'
import _ from 'lodash'

const defaultData = {
    type: 'day',
    from: null,
    to: null,
    search: ''
}

export function useSearchFilter(initialData = defaultData) {
    const [filter, setFilter] = useState(initialData)

    const handleFilter = (data) => {
        if (!data) {
            setFilter({ ...initialData })
        } else {
            setFilter((prev) => ({
                ...prev,
                ...data
            }))
        }
    }

    const handleFilterByKey = (key, value) => {
        setFilter((prev) => ({
            ...prev,
            [key]: value
        }))
    }

    // Debounced version of handleFilterByKey for `search` field
    const handleFilterDebounce = useMemo(() => {
        return _.debounce((value) => {
            setFilter((prev) => ({
                ...prev,
                search: value
            }))
        }, 500)
    }, [])

    return {
        filter,
        handleFilter,
        handleFilterByKey,
        handleFilterDebounce
    }
}
