'use client'

import { ShoppingCart } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"

import { Product, Size } from "@/types"
import { Currency } from "@/components/ui/currency"
import { Button } from "@/components/ui/button"
import { SizesSelect } from "./sizes-select"
import { useCart } from "@/hooks/use-cart"

interface InfoProps {
    data: Product
    sizes: Size[]
}

export const Info: React.FC<InfoProps> = ({
    data,
    sizes
}) => {
    const sizeIds = data.sizes.map((size) => size.sizeId)
    const correctSizes = sizes.filter((size) => sizeIds.includes(size.id))
    const [selectedSize, setSelectedSize] = useState<Size>(sizes[0]);

    const cart = useCart()

    const addToCart = () => {
        if (!selectedSize) {
            toast.error('Please select a size.')
        }
        cart.addItem({ product: data, size: selectedSize })
    }

    return (
        <div>
            <h1 className='text-3xl font-bold text-gray-900'>{data.name}</h1>
            <div className="mt-3 flex items-end justify-between">
                <p className='text-2xl text-gray-900' >
                    <Currency value={data?.price} />
                </p>
            </div>
            <hr className="my-4" />
            <div className="flex flex-col gap-y-6">
                <div className="flex items-center gap-x-4">
                    <h3 className="font-semibold text-black">Size:</h3>
                    <div>
                        <SizesSelect data={correctSizes} onSizeChange={setSelectedSize} />
                    </div>
                </div>
                <div className="flex items-center gap-x-4">
                    <h3 className="font-semibold text-black">Color:</h3>
                    <div className="h-6 w-6 rounded-full border border-gray-600" style={{ backgroundColor: data?.color?.value }} />
                </div>
            </div>
            <div className="mt-10 flex items-center gap-x-3">
                <Button className='flex items-center gap-x-2' onClick={addToCart}>
                    Add To Cart
                    <ShoppingCart />
                </Button>
            </div>
        </div>
    )
}