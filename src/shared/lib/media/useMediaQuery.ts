import { useEffect, useState } from 'react'

/**
 * @param query - The media query to track.
 * @returns The current state of the media query (true if the query matches, false otherwise).
 * @public
 */
export const useMediaQuery = (query: string): boolean => {
    const getMatches = (query: string): boolean => {
        return window.matchMedia(query).matches
    }

    const [matches, setMatches] = useState<boolean>(() => {
        return getMatches(query)
    })

    // Handles the change event of the media query.
    function handleChange() {
        setMatches(getMatches(query))
    }

    useEffect(() => {
        const matchMedia = window.matchMedia(query)

        // Triggered at the first client-side load and if query changes
        handleChange()

        // Use deprecated `addListener` and `removeListener` to support Safari < 14 (#135)
        if (matchMedia.addListener) {
            matchMedia.addListener(handleChange)
        } else {
            matchMedia.addEventListener('change', handleChange)
        }

        return () => {
            if (matchMedia.removeListener) {
                matchMedia.removeListener(handleChange)
            } else {
                matchMedia.removeEventListener('change', handleChange)
            }
        }
    }, [query])

    return matches
}
