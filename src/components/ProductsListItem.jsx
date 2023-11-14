import { useDispatch } from "react-redux"
import { addToCart, totalPrice } from "../store/slices/cartSlice"

export default function ProductsListItem({ product }) {
    const dispatch = useDispatch()
    const handleClick = (event) => {
        event.preventDefault()

        const cartItem = {
            title: product.title,
            price: product.price,
            image: product.images[0],
            id: product.id,
            quantity: 1
        }

        dispatch(addToCart(cartItem))
        dispatch(totalPrice())
    }

    return (
        <div>
            <div className="mb-5 text-xl">
                <div className="border border-gray-300 grid items-center justify-items-center pb-5 gap-y-3 rounded-2xl w-[280px] h-[380px] bg-white shadow-2xl shadow-black">
                    <div className="pt-4 relative">
                        <div className="p-4">
                            <img className="w-64 h-28 object-contain" src={product.images[0]} alt="" />
                        </div>
                        <div className="absolute top-1 right-2 bg-gray-300 rounded-xl px-2">
                            <p className="text-black text-sm">Stock {product.stock}</p>
                        </div>
                    </div>
                    <div className="">
                        {product.title}
                    </div>
                    <div className="font-bold">
                        ${product.price}
                    </div>
                    <button onClick={handleClick} disabled={product.stock <= 0} className="py-3 px-5 text-white disabled:opacity-20 bg-blue-800 rounded-xl">Add Cart</button>
                </div>
            </div>
        </div>

    )
}