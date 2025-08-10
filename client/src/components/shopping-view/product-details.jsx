import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button.jsx";
import { Dialog, DialogContent } from "../ui/dialog.jsx";
import { Separator } from "../ui/separator.jsx";
import { setProductDetails } from "../../store/shopping/products-slice";
import { addToCart } from "../../store/shopping/cart-slice";


function ProductDetailsDialog({open, setOpen, productDetails}) {
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.auth)

    function handleAddToCart(getCurrentProductId) {
            dispatch(addToCart({userId : user.id, productId : getCurrentProductId, quantity : 1}))
            .then((data) => {
                if(data?.payload?.success) {
                    dispatch(fetchCartItems(user?.id));
                    alert("Product added to cart successfully!")
                }
            });
            
        }
        
        function handleDialogClose() {
            setOpen(false);
            dispatch(setProductDetails());
        }

    return (
        <Dialog open={open} onOpenChange={handleDialogClose}>
            <DialogContent className="bg-white grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
                <div className="relative overflow-hidden rounded-lg">
                    <img
                        src={productDetails?.image}
                        alt={productDetails?.title}
                        width={600}
                        height={600}
                        className="aspect-square w-full object-cover"
                    />
                </div>
                <div className="">
                    <div>
                        <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
                        <p className="text-muted-foreground text-2xl mb-5 mt-4">
                        {productDetails?.description}
                        </p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p
                        className={`text-3xl font-bold text-primary ${
                            productDetails?.salePrice > 0 ? "line-through" : ""
                        }`}
                        >
                        ${productDetails?.price}
                        </p>
                        {productDetails?.salePrice > 0 ? (
                        <p className="text-2xl font-bold text-muted-foreground">
                            ${productDetails?.salePrice}
                        </p>
                        ) : null}
                    </div>
                    <div className="mt-5 mb-5">
                        <Button className="bg-black text-white w-full" onClick={() => handleAddToCart(
                    productDetails?._id)
                }>
                            Add to Cart
                        </Button>
                    </div>
                    <Separator/>
                </div>
                
            </DialogContent>
        </Dialog>
    )
}

export default ProductDetailsDialog;