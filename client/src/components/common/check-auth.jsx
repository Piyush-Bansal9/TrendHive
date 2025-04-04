import { Navigate, useLocation } from "react-router-dom"

export default function CheckAuth({isAuthenticated, user, children}) {
    const location = useLocation() ;
    // useLocation gives the current location/path of the page.

    if(!isAuthenticated && !(location.pathname.includes("/signup") || location.pathname.includes("/signin"))) {
        return <Navigate to="/auth/signin" />
    }

    if(isAuthenticated && (location.pathname.includes('/signup') || location.pathname.includes('/signin'))) {
        if(user?.role === 'admim') {
            return <Navigate to="/admin/dashboard" />
        }else {
            return <Navigate to="/shopping/home" />
        }
    }

    if(isAuthenticated && user?.role !== 'admin' && location.pathname.includes('admin')) {
        return <Navigate to="/unauth-page" />
    }

    if(isAuthenticated && user?.role === 'admin' && location.pathname.includes('shopping')) {
        return <Navigate to="/admin/dashboard" />
    }

    return <div>{children}</div>
}