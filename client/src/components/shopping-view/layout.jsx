import { Outlet } from "react-router-dom"

function ShoppingLayout() {
    return <div className="flex flex-col bg-white overflow-hidden">
        {/* Header Component */}
        <main className="flex flex-1 w-full">
            <Outlet/>
        </main>
    </div>
}

export default ShoppingLayout