import { Fragment, use, useEffect, useState } from "react"
import { Button } from "../../components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../../components/ui/sheet";
import Form from "../../components/common/form";
import { addProductFormElements } from "../../config";
import ProductImageUpload from "../../components/admin-view/image-upload";
import { useDispatch, useSelector } from "react-redux";
import { addNewProduct, deleteProduct, editProduct, getAllProducts } from "../../store/admin/products-slice";
import { toast } from "sonner";
import AdminProductTile from "../../components/admin-view/product-tile";

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
    const [currentEditedId, setCurrentEditedId] = useState(null);
    const dispatch = useDispatch();
    const { listOfProducts } = useSelector(state => state.adminProduct)

    function onSubmit(event) {
        event.preventDefault();
        console.log(currentEditedId, 'id');
        
        currentEditedId !== null ? 
        dispatch(editProduct({
            id: currentEditedId , formData
        })).then((data) => {
            console.log(data, 'edit');
            console.log("hey");
            
            if(data?.payload?.success) {
                console.log("heyy");
                
                dispatch(getAllProducts());
                setFormData(initialFormData);
                setAddProductDialog(false);
                setCurrentEditedId(null);
            }
        }) : 
        dispatch(addNewProduct({
            ...formData,
            image: uploadedimageURL
        })).then((data) => {
            if(data?.payload?.success) {
                dispatch(getAllProducts());
                setImageFile(null);
                setAddProductDialog(false);
                setFormData(initialFormData);
                alert("Product added successfully");
            }
        });
    } 

    function handleDelete(getCurrentProductId) {
        console.log(getCurrentProductId);
        dispatch(deleteProduct(getCurrentProductId)).
        then((data) => {
            if(data?.payload?.success) {
                dispatch(getAllProducts());
            }
        })
    }

    function isFormValid() {
        return Object.keys(formData)
        .map((key) => formData[key] !== "")
        .every((item) => item);
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
            <div className="grid gap-6 lg:grid-cols-4 md:grid-cols-3">
                {
                    listOfProducts && listOfProducts.length > 0
                    ? listOfProducts.map((productItem) => (
                        <AdminProductTile key={productItem._id}
                            product = {productItem}
                            setCurrentEditedId = {setCurrentEditedId}
                            setAddProductDialog = {setAddProductDialog}
                            setFormData = {setFormData}
                            handleDelete = {handleDelete}
                        />
                    )) : null
                }
            </div>
            <Sheet open = {addProductDialog} onOpenChange = {() => {
                setAddProductDialog(false);
                setCurrentEditedId(null);
                setFormData(initialFormData);
            }}>
                <SheetContent side="right" className='overflow-auto w-100 bg-white z-[50] shadow-lg'>
                    <SheetHeader>
                        <SheetTitle>
                            {
                                currentEditedId !== null ? 
                                'Edit Product' : 'Add New Product'
                            }
                        </SheetTitle>
                    </SheetHeader>
                    <ProductImageUpload 
                        imageFile = {imageFile} 
                        setImageFile = {setImageFile} 
                        uploadedimageURL = {uploadedimageURL} 
                        setuploadedImageURL = {setuploadedImageURL} 
                        setImageLoading={setImageLoading}
                        imageLoading = {imageLoading}
                        isEditMode = {currentEditedId !== null}
                    />
                    <div className="p-6">
                        <Form 
                        onSubmit={onSubmit}
                        formController={addProductFormElements} 
                        formData={formData} 
                        setFormData={setFormData}
                        buttonText={currentEditedId !== null ? "Edit" : "Add"}
                        isBtnDisabled={!isFormValid()}
                        ></Form>
                    </div>
                </SheetContent>
            </Sheet>
        </Fragment>
    )
}

export default AdminProducts