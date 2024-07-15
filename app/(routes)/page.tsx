import getBillboard from "@/actions/get-billboard"
import getProducts from "@/actions/get-products"

import { Container } from "@/components/ui/container"
import { Billboard } from "@/components/billboard"
import { ProductList } from "@/components/product-list"

export const revalidate = 0

const HomePage = async () => {
    const products = await getProducts({ isFeatured: true })
    const billboard = await getBillboard('77072fbd-6f51-4bad-ac26-e9f945cc6a47')
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