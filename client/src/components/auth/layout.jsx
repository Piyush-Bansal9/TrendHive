import { Outlet } from "react-router-dom";

function AuthLayout(){
    return <div className="flex h-screen w-screen bg-black justify-center items-center">
        <div className="flex w-full max-w-md h-[500px] bg-white rounded-4xl shadow-lg divide-x divide-gray-300">
            <div className="w-1/2 h-full text-4xl flex justify-center items-center bg-gray-200">TrendHive</div>
            <div className="w-1/2 flex justify-center items-center bg-white"><Outlet/></div>
        </div>
    </div>
}

export default AuthLayout;
