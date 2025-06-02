import { Outlet } from "react-router-dom"
import ShoppingHeader from "./Header"

function ShoppingLayout() {
    return <div className="flex flex-col bg-white overflow-hidden">
        <ShoppingHeader/>
        <main className="flex flex-1 w-full">
            <Outlet/>
        </main>
    </div>
}

export default ShoppingLayout