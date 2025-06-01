import { Fragment, use, useEffect, useState } from "react"
import { Button } from "../../components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../../components/ui/sheet";
import Form from "../../components/common/form";
import { addProductFormElements } from "../../config";
import ProductImageUpload from "../../components/admin-view/image-upload";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../store/admin/products-slice";


const initialFormData = {
    image: null,
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    salePrice: "",
    totalStock: "",
};

function AdminProducts() {
    const [addProductDialog, setAddProductDialog] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [imageFile, setImageFile] = useState(null);
    const [uploadedimageURL, setuploadedImageURL] = useState("");
    const [imageLoading, setImageLoading] = useState(false);
    const dispatch = useDispatch();
    const { listOfProducts } = useSelector(state => state.adminProduct)

    function onSubmit() {

    }

    useEffect(() => {
        console.log("Dispatching getAllProducts..");
        
        dispatch(getAllProducts());
    }, [dispatch])

    console.log(listOfProducts, uploadedimageURL);
    
    return (
        <Fragment>
            <div className="mb-5 flex justify-end w-full">
                <Button className="bg-blue-600 text-white hover:bg-blue-700" onClick = {() => setAddProductDialog(true)}>Add New Product</Button>
            </div>
            <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-3"></div>
            <Sheet open = {addProductDialog} onOpenChange = {() => setAddProductDialog(false)}>
                <SheetContent side="right" className='overflow-auto w-100 bg-white z-[50] shadow-lg'>
                    <SheetHeader>
                        <SheetTitle>Add New Product</SheetTitle>
                    </SheetHeader>
                    <ProductImageUpload imageFile = {imageFile} setImageFile = {setImageFile} uploadedimageURL = {uploadedimageURL} setuploadedImageURL = {setuploadedImageURL} setImageLoading={setImageLoading}
                    imageLoading = {imageLoading}/>
                    <div className="p-6">
                        <Form 
                        onSubmit={onSubmit}
                        formController={addProductFormElements} formData={formData} setFormData={setFormData}
                        buttonText="Add Product"
                        ></Form>
                    </div>
                </SheetContent>
            </Sheet>
        </Fragment>
    )
}

export default AdminProducts