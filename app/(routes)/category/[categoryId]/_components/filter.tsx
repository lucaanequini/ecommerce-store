'use client'

import qs from 'query-string'
import { useRouter, useSearchParams } from "next/navigation"

import { Color, Size } from "@/types"
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface FilterProps {
    data: (Size | Color)[]
    name: string
    valueKey: string
}

export const Filter: React.FC<FilterProps> = ({
    data,
    name,
    valueKey
}) => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const selectedValues = searchParams.get(valueKey)?.split(',') || [];

    const onClick = (id: string) => {
        const current = qs.parse(searchParams.toString());
        let updatedSelectedValues = [...selectedValues];

        if (selectedValues.includes(id)) {
            updatedSelectedValues = updatedSelectedValues.filter(value => value !== id);
        } else {
            updatedSelectedValues.push(id);
        }

        const query = {
            ...current,
            [valueKey]: updatedSelectedValues.join(',')
        };

        if (updatedSelectedValues.length === 0) {
            delete query[valueKey];
        }

        router.push(`${window.location.pathname}?${qs.stringify(query)}`);
    };

    return (
        <div className='mb-8'>
            <h3 className='text-lg font-semibold'>{name}</h3>
            <hr className='my-4' />
            <div className='flex flex-wrap gap-2'>
                {data.map((filter) => (
                    <div key={filter.id} className='flex items-center'>
                        <Button className={cn('rounded-md text-sm text-gray-800 p-2 bg-white border border-gray-300',
                            selectedValues.includes(filter.id) && 'bg-black text-white')
                        }
                            onClick={() => onClick(filter.id)}
                        >
                            {filter.name}
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    )
}