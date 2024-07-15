import getBillboard from "@/actions/get-billboard"
import getProducts from "@/actions/get-products"

import { Container } from "@/components/ui/container"
import { Billboard } from "@/components/billboard"
import { ProductList } from "@/components/product-list"

export const revalidate = 0

const HomePage = async () => {
    const products = await getProducts({ isFeatured: true })
    const billboard = await getBillboard('85f549cf-39c7-4813-89b1-d4ec10c8902a')
    return (
        <Container>
            <div className="space-y-10 pb-10">
                <Billboard data={billboard} />
                <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
                    <ProductList title='Featured Products' items={products} sizes={[]} />
                </div>
            </div>
        </Container>
    )
}

export default HomePage