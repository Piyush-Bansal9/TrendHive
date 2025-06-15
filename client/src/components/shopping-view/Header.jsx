import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react"
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { Button } from "../ui/button"
import { Label } from "../ui/label";
import { shoppingViewHeaderMenuItems } from "../../config";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/auth-slice";
import { useEffect, useState } from "react";
import UserCartWrapper from "./cart-wrapper";
import { fetchCartItems } from "../../store/shopping/cart-slice";

function MenuItems() {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    function handleNavigate(menuItem) {
        sessionStorage.removeItem("filters");
        const currentFilter = menuItem.id !== 'home' &&
        getCurrentMenuItem.id !== "products" ? 
        {
            category : [menuItem.id]
        } : null

        sessionStorage.setItem("filters", JSON.stringify(currentFilter));
        location.pathname.includes("listing") && currentFilter !== null
        ? setSearchParams(
            new URLSearchParams(`?category=${menuItem.id}`)
            )
        : navigate(menuItem.path);
    }
    return  (
        <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
            {shoppingViewHeaderMenuItems.map((menuItem) => (
            <Label
                onClick={() => {
                    handleNavigate(menuItem)
                }}
                className="text-sm font-medium cursor-pointer"
                key={menuItem.id}
            >
                {menuItem.label}
            </Label>
        ))}
        </nav>
    );
}

function HeaderRightContent() {
    const {user} = useSelector((state) => state.auth);
    const [openCartSheet, setOpenCartSheet] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {cartItems} = useSelector(state => state.shopCart)

    function handleLogout() {
        dispatch(logoutUser());
    }

    useEffect(() => {
        dispatch(fetchCartItems(user?.id));
    }, [dispatch]);

    return <div className="flex lg:items-center lg:flex-row flex-col gap-4">
        <Sheet open = {openCartSheet} onOpenChange = {() => setOpenCartSheet(false)}>
            <Button onClick= {() => setOpenCartSheet(true)} variant="outline" size="icon" className="relative">
                <ShoppingCart className="h-6 w-6"/>
                <span className="sr-only">User Cart</span>
            </Button>
            <UserCartWrapper 
                cartItems={
                    cartItems && cartItems.items && cartItems.items.length > 0
                        ? cartItems.items
                        : []
                }
                setOpenCartSheet={setOpenCartSheet}
            />
        </Sheet>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="bg-black rounded-full w-10 h-10">
                    <AvatarFallback className="bg-black text-white font-extrabold rounded-full w-10 h-10 flex items-center justify-center">
                        {user?.userName[0].toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent side = "right" className="w-56 bg-white shadow-lg z-50">
                <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuItem onClick ={() => navigate('/shopping/account')}>
                    <UserCog className="mr-2 h-4 w-4"/>Account
                </DropdownMenuItem>
                <DropdownMenuItem onClick = {handleLogout}>
                    <LogOut className="mr-2 h-4 w-4"/>LogOut
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
}




function ShoppingHeader() {
    const {isAuthenticated, user} = useSelector((state) => state.auth);
    console.log(user);

    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
            <Link to="/shop/home" className="flex items-center gap-2">
                <HousePlug className="h-6 w-6" />
                <span className="font-bold">Ecommerce</span>
            </Link>
            <div className="lg:hidden">
                <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="lg:hidden">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Toggle header menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-full max-w-xs bg-white z-[50] shadow-lg">
                    <MenuItems/>
                    <HeaderRightContent/>
                </SheetContent>
                </Sheet>
            </div>
            <div className="hidden lg:block">
                <MenuItems/>
            </div>
            <div className="hidden lg:block">
                <HeaderRightContent/>
            </div>
        </div>
    </header>
    )
}

export default ShoppingHeader