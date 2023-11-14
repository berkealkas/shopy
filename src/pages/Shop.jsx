import ProductsList from "../components/ProductsList"
import { Link } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import CartBadge from "../components/CartBadge"

export default function Shop() {
    return (
        <div className="min-h-screen bg-[#131313]">
            <div className="flex justify-center items-center pt-3 text-3xl font-bold">
                <div className="">
                    <Link to='/' className="text-white ">Shopy</Link>
                </div>
                <div className="absolute right-0 md:pr-24 pr-5 text-white">
                    <Link to='/cart'><CartBadge /></Link>
                </div>
            </div>
            <div>
                <ProductsList />
            </div>
            <Toaster position="top-left" />
        </div>
    )
}