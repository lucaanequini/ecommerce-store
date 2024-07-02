'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"

import { Product, Size } from "@/types"
import { Currency } from "@/components/ui/currency"

interface ProductCardProps {
    data: Product
    sizes: Size[]
}

export const ProductCard: React.FC<ProductCardProps> = ({
    data
}) => {
    const router = useRouter()
    const handleClick = () => {
        router.push(`/product/${data?.id}`)
    }

    return (
        <div onClick={handleClick} className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
            {/* Images and Actions */}
            <div className="aspect-square rounded-xl bg-gray-100 relative">
                <Image
                    src={data?.images?.[0].url}
                    fill
                    alt="image"
                    className="aspect-square object-cover rounde-md"
                />
            </div>
            {/* Description */}
            <div>
                <p className="font-semibold text-lg">{data.name}</p>
                <p className="text-sm text-gray-500">{data.category?.name}</p>
            </div>
            {/* Price */}
            <div className="flex items-center justify-between">
                <Currency value={data?.price} />
            </div>
        </div>
    )
}