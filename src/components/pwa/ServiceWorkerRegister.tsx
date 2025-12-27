"use client"

import { useEffect } from "react"

export function ServiceWorkerRegister() {
    useEffect(() => {
        if (
            typeof window !== "undefined" &&
            "serviceWorker" in navigator &&
            process.env.NODE_ENV === "production"
        ) {
            navigator.serviceWorker
                .register("/sw.js")
                .catch((error) => {
                    console.error("SW registration failed: ", error)
                })
        }
    }, [])

    return null
}
