'use client'

import { useState, useEffect } from "react"

export const formatter = new Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL'
})

interface CurrencyProps {
    value?: string | number
}

export const Currency: React.FC<CurrencyProps> = ({
    value
}) => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null

    return (
        <div className="font-semibold">
            {formatter.format(Number(value))}
        </div>
    )
}