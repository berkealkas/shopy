import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { closeModal } from '../store/slices/modalSlice'
import { emptyCart } from '../store/slices/cartSlice'
import Cards from 'react-credit-cards-2'
import 'react-credit-cards-2/dist/es/styles-compiled.css'
import toast from 'react-hot-toast'

const CreditCard = () => {
    const [state, setState] = useState({
        number: '',
        expiry: '',
        cvc: '',
        name: '',
        focus: '',
    })

    const dispatch = useDispatch()

    const handlePayment = () => {
        dispatch(closeModal())
        dispatch(emptyCart())
        toast.success('Successfully Purchased')
      }

    const handleInputChange = (evt) => {
        const { name, value } = evt.target

        if (name === 'expiry') {
            const formattedValue = value.replace(/\D/g, '')
            let updatedValue = ''

            if (formattedValue.length > 0) {
                updatedValue = formattedValue[0]

                if (formattedValue.length > 1) {
                    updatedValue += formattedValue[1]
                    if (formattedValue.length > 2) {
                        updatedValue += '/' + formattedValue.slice(2, 4)
                    }
                }
            }

            setState((prev) => ({ ...prev, [name]: updatedValue }))
        }
        else {
            setState((prev) => ({ ...prev, [name]: value }))
        }
    }

    const handleInputFocus = (evt) => {
        setState((prev) => ({ ...prev, focus: evt.target.name }))
    }

    const isButtonDisabled = () => {
        return (
            state.number.length < 16 ||
            state.expiry.length < 5 ||
            state.cvc.length < 3 ||
            state.name === ''
        )
    }

    return (
        <div>
            <Cards
                number={state.number}
                expiry={state.expiry}
                cvc={state.cvc}
                name={state.name}
                focused={state.focus}
            />
            <form className='mt-5'>
                <div className='grid grid-cols-2 gap-y-5 gap-x-5'>
                    <input
                        className='border rounded-lg py-1.5 pl-1 text-gray-900 placeholder:text-gray-400'
                        type="tel"
                        name="number"
                        placeholder="Card Number"
                        maxLength='16'
                        value={state.number}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                    />

                    <input
                        className='border rounded-lg py-1.5 pl-1 text-gray-900 placeholder:text-gray-400'
                        type="text"
                        name="name"
                        placeholder="Name"
                        maxLength='15'
                        value={state.name}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                    />

                    <input
                        className='border rounded-lg py-1.5 pl-1 text-gray-900 placeholder:text-gray-400'
                        type="tel"
                        name="expiry"
                        placeholder="Valid Thru"
                        maxLength='5'
                        value={state.expiry}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                    />

                    <input
                        className='border rounded-lg py-1.5 pl-1 text-gray-900 placeholder:text-gray-400'
                        type="tel"
                        name="cvc"
                        placeholder="CVC"
                        maxLength='3'
                        value={state.cvc}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                    />
                </div>

                <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent disabled:opacity-50 bg-blue-200 px-5 py-2 text-md font-bold text-blue-900 hover:bg-blue-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handlePayment}
                      disabled={isButtonDisabled()}
                    >
                      Pay
                    </button>
                  </div>
            </form>
        </div>
    )
}

export default CreditCard