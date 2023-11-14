import { useSelector, useDispatch } from "react-redux"
import { incrementQuantity, decrementQuantity, changeQuantity, removeItem, totalPrice } from "../store/slices/cartSlice"
import { openModal } from "../store/slices/modalSlice"
import Modal from "./Modal"
import { Toaster } from "react-hot-toast"
import { GoTrash } from 'react-icons/go'

export default function CartItem() {
    const dispatch = useDispatch()
    const cartItems = useSelector((state) => state.cart.cart)
    const cartTotal = useSelector((state) => state.cart.cartTotal)
    const modal = useSelector((state) => state.modal.modal)

    const handleModalClick = () => {
        dispatch(openModal())
    }

    const handleClickIncrement = (id) => {
        const product = cartItems.find(item => item.id === id);

        if (product && product.quantity < 10) {
            dispatch(incrementQuantity({ id }));
            dispatch(totalPrice())
        }
    }

    const handleClickDecrement = (id) => {
        const product = cartItems.find(item => item.id === id);
        
        if (product && product.quantity > 1) {
            dispatch(decrementQuantity({ id }));
            dispatch(totalPrice())
        }
    }
    
    const handleChangeQuantity = (id, newQuantity) => {
        dispatch(changeQuantity({id, newQuantity}))
        dispatch(totalPrice())
    }

    const handleRemoveItem = (id) => {
        dispatch(removeItem({ id }))
        dispatch(totalPrice())
    }

    return (
        <div>            
            <div className="py-6">
                <div>
                    {cartItems.length === 0 ? (
                        <p className="flex justify-start ml-20 text-2xl font-bold">Your cart is empty</p>
                    ) : (
                        <div className="grid grid-cols-2 space-x-20">
                            <div>
                                <div className="flex justify-start ml-20 text-3xl font-bold">
                                    <h1>Cart List</h1>
                                </div>
                                {cartItems.map((item) => (
                                    <div key={item.id} className="grid grid-cols-4 items-center justify-items-center bg-white text-black text-lg font-bold w-[90%] rounded-lg ml-20 mt-5 px-5 py-1">
                                        <div>
                                            <img src={item.image} alt={item.id} className="w-32 h-28 py-2 object-contain"/>
                                        </div>
                                        <h3>{item.title}</h3>
                                        <div className="flex flex-col items-center gap-y-5">
                                            <p>${item.price * item.quantity || item.price}</p>
                                            <div className="flex items-center">
                                                <button onClick={() => handleClickDecrement(item.id)} className="border px-2 h-8 text-xl">-</button>
                                                <input 
                                                    value={item.quantity}
                                                    onChange={(e) => handleChangeQuantity(item.id, Math.min(parseInt(e.target.value), 10))} 
                                                    type="tel" 
                                                    className="border w-10 h-8 pl-3 outline-none"
                                                />
                                                <button onClick={() => handleClickIncrement(item.id)} className="border px-2 h-8 text-xl">+</button>
                                            </div>
                                        </div>
                                        <button className="text-2xl" onClick={() => handleRemoveItem(item.id)}><GoTrash /></button>
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center justify-center fixed mt-28 right-96">
                                <div className="border rounded-xl w-72 text-xl space-y-14 bg-white">
                                    <div className="flex items-center justify-between mt-5 mx-5 text-black font-bold">
                                        <h1 className="">Total</h1>
                                        <h1 className="font-bold">${cartTotal}</h1>
                                    </div>
                                    <div onClick={handleModalClick} className="flex justify-center mt-10 bg-blue-900 text-white py-3 rounded-xl cursor-pointer">
                                        <button className="font-bold">Confirm Order</button>
                                    </div>
                                    {modal && <Modal show={modal}/>}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Toaster position="top-right"/>
        </div>
    )
}