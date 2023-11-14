import CartItem from "../components/CartItem"
import { Link } from "react-router-dom"

export default function Cart() {
    return (
        <div className="min-h-screen bg-[#131313] text-white">
            <div className="flex justify-center items-center pt-6">
                <Link to='/' className="text-3xl font-bold">Shopy</Link>
            </div>
            <CartItem />
        </div>
    )
}