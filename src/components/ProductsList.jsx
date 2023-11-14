import { fetchProducts } from '../store/thunks/fetchProducts'
import { useThunk } from '../hooks/use-thunk'
import { useEffect } from "react"
import { useSelector } from "react-redux"
import ProductsListItem from "./ProductsListItem"

export default function ProductsList() {

    const [doFetchProducts, isLoadingProducts, loadingProductsError] = useThunk(fetchProducts)

    const { data } = useSelector((state) => {
        return state.products
    })

    useEffect(() => {
        doFetchProducts()
    }, [doFetchProducts])

    let content

    if (isLoadingProducts) {
        content = <div>Loading...</div>
    }
    else if (loadingProductsError) {
        content = <div>Error</div>
    }
    else {
        content = data.map((product) => {
            return <ProductsListItem key={product.id} product={product}/>
        })
    }

    return (
        <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 justify-items-center pt-10 2xl:mx-14">
            {content}
        </div>
    )
}