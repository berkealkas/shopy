import Shop from "./pages/Shop"
import Cart from "./pages/Cart"
import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <div>
      <Routes>
          <Route path='/' element={<Shop />}/>
          <Route path='cart' element={<Cart />}/>
        </Routes>
    </div>
  )
}

export default App
