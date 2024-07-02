'use client'

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Size } from "@/types"

interface SizesSelectProps {
    data: Size[]
    onSizeChange: (size: Size) => void
}

export const SizesSelect: React.FC<SizesSelectProps> = ({
    data,
    onSizeChange
}) => {
    const [selected, setSelected] = useState<Size>(data[0])

    const onSelect = (size: Size) => {
        setSelected(size)
        onSizeChange(size)
    }
    return (
        <div className="flex gap-x-2">
            {data.map((size) => (
                <Button key={size.id} onClick={() => onSelect(size)} className={cn('rounded-md px-3 py-2 border border-black bg-white text-black',
                    selected?.id === size.id ? 'border-blue-500 border-2' : ''
                )}>
                    {size.value}
                </Button>
            ))}
        </div>
    )
}