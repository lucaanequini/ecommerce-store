import qs from 'query-string';

import { Product, ProductSize } from "@/types";


interface Query {
    categoryId?: string
    colorId?: string
    sizeId?: string
    isFeatured?: boolean
}


const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

const getProducts = async (query: Query): Promise<Product[]> => {
    const url = qs.stringifyUrl({
        url: URL,
        query: {
            colorId: query.colorId,
            categoryId: query.categoryId,
            isFeatured: query.isFeatured
            // Note que sizeId não é mais passado aqui
        }
    });

    const res = await fetch(url);
    const products: Product[] = await res.json();

    // Filtrar produtos pelo sizeId, se sizeId for fornecido
    if (query.sizeId) {
        return products.filter(product =>
            product.sizes.some((size: ProductSize) => size.sizeId === query.sizeId)
        );
    }

    return products;
}

export default getProducts