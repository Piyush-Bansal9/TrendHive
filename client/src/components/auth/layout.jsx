import { Outlet } from "react-router-dom";

function AuthLayout(){
    return <div className="flex h-screen w-screen bg-red-300">
        <div className="flex justify-center items-center p-8 w-full">
            <div className="p-4">TrendHive</div>
            <Outlet/>
        </div>
    </div>
}

export default AuthLayout;
