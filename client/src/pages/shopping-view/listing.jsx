import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "../../components/ui/dropdown-menu"
import PorductFilter from "../../components/shopping-view/filter"
import { Button } from "../../components/ui/button"
import { ArrowUpDownIcon } from "lucide-react"
import { sortOptions } from "../../config"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { getAllFilteredProducts } from "../../store/shopping/products-slice"
import ShoppingProductTile from "../../components/shopping-view/product-tile"

function ShoppingListing() {
    const dispatch = useDispatch();
    const {listOfProducts} = useSelector((state) => state.shoppingProduct)
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState(null);

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

    // Default values on page-reload;
    useEffect(() => {
        setSort("price-lowtohigh");
        setFilters(JSON.parse(sessionStorage.getItem("filters")) || {})
    }, [])

    useEffect(() => {
        dispatch(getAllFilteredProducts());
    }, [dispatch]);

    console.log(filters, 'filters');
    
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
                            listOfProducts.map(productItem => <ShoppingProductTile key={productItem._id} product={productItem} />)
                            : null
                        }
            </div>
        </div>
    </div>
}

export default ShoppingListing