import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "../../components/ui/dropdown-menu"
import PorductFilter from "../../components/shopping-view/filter"
import { Button } from "../../components/ui/button"
import { ArrowUpDownIcon } from "lucide-react"
import { sortOptions } from "../../config"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { getAllFilteredProducts, getProductDetails } from "../../store/shopping/products-slice"
import ShoppingProductTile from "../../components/shopping-view/product-tile"
import { useSearchParams } from "react-router-dom"
import ProductDetailsDialog from "../../components/shopping-view/product-details"
import { addToCart, fetchCartItems } from "../../store/shopping/cart-slice"

function createSearchParamHelper(filterParams) {
    const queryParams = [];
    for (const [key, value] of Object.entries(filterParams)) {
        if (Array.isArray(value) && value.length > 0) {
        const paramValue = value.join(",");
        queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
        }
    }
    console.log(queryParams, "queryParams");
    return queryParams.join("&");
}

function ShoppingListing() {
    const dispatch = useDispatch();
    const {listOfProducts, productDetails} = useSelector((state) => state.shoppingProduct)
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [openDeatilsDialog, setOpenDetailsDialog] = useState(false);
    const {user} = useSelector(state => state.auth);

    function handleSort(value) {
        setSort(value);
    }

    function handleFilter(getCurrentSection, getCurrentOption) {
        let cpyFilters = { ...filters };
        const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getCurrentSection);

        if (indexOfCurrentSection === -1) {
            cpyFilters = {
            ...cpyFilters,
            [getCurrentSection]: [getCurrentOption],
        };
        } else {
            const indexOfCurrentOption =
            cpyFilters[getCurrentSection].indexOf(getCurrentOption);

            if (indexOfCurrentOption === -1)
            cpyFilters[getCurrentSection].push(getCurrentOption);
            else cpyFilters[getCurrentSection].splice(indexOfCurrentOption, 1);
        }

        setFilters(cpyFilters);
        sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
    }

    function handleGetProductDetails(getCurrentProductId) {
        console.log(getCurrentProductId);
        dispatch(getProductDetails(getCurrentProductId));
    }

    function handleAddToCart(getCurrentProductId) {
        dispatch(addToCart({userId : user.id, productId : getCurrentProductId, quantity : 1}))
        .then((data) => {
            if(data?.payload?.success) {
                dispatch(fetchCartItems(user?.id));
                alert("Product added to cart successfully!")
            }
        });
        
    }

    // Default values on page-reload;
    useEffect(() => {
        setSort("price-lowtohigh");
        setFilters(JSON.parse(sessionStorage.getItem("filters")) || {})
    }, [searchParams])

    // Update the search address whenever filters are changed(checked or unchecked)
    useEffect(() => {
        if(filters && Object.keys(filters).length > 0) {
            const createQueryString = createSearchParamHelper(filters)
            setSearchParams(new URLSearchParams(createQueryString))
        }
    }, [filters])

    useEffect(() => {  
        if(filters !== null && sort !== null)
        dispatch(getAllFilteredProducts({filterParams: filters, sortParams : sort}));
    }, [dispatch, sort, filters]);

    useEffect(() => {
        if(productDetails !== null) setOpenDetailsDialog(true);
    }, [productDetails])

    
    return <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
        <PorductFilter
            filters={filters}
            handleFilter={handleFilter }
        />
        <div className="bg-background w-full rounded-lg shadow-sm">
            <div className="p-4 border-b flex items-center justify-between">
                <h2 className="text-lg font-extrabold">All Products</h2>
                <div className="flex items-center gap-3">
                    <span className="text-muted-foreground">
                        {listOfProducts?.length} Products
                    </span>
                    <DropdownMenu className="bg-white z-[50] shadow-lg">
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-1"
                            >
                                <ArrowUpDownIcon className="h-4 w-4"/>
                                <span>Sort By</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align = "end" className = "w-[200px]">
                            <DropdownMenuRadioGroup className="bg-white z-[50] shadow-lg" value = {sort} onValueChange = {handleSort}>
                                {
                                    sortOptions.map(sortitem => <DropdownMenuRadioItem value={sortitem.id} key={sortitem.id} className="hover:bg-gray-100">
                                        {sortitem.label}
                                    </DropdownMenuRadioItem>)
                                }
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                        {
                            listOfProducts && listOfProducts.length > 0 ?
                            listOfProducts.map(productItem => <ShoppingProductTile key={productItem._id} product={productItem}
                                    handleGetProductDetails={handleGetProductDetails}
                                    handleAddToCart={handleAddToCart }
                                />)
                            : null
                        }
            </div>
        </div>
        <ProductDetailsDialog open={openDeatilsDialog} setOpen={setOpenDetailsDialog} productDetails={productDetails}/>
    </div>
}

export default ShoppingListing