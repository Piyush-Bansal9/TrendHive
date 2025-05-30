import { Fragment, useState } from "react"
import { Button } from "../../components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../../components/ui/sheet";
import Form from "../../components/common/form";

function AdminProducts() {
    const [addProductDialog, setAddProductDialog] = useState(false);
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
                    <div className="py-6">
                        <Form ></Form>
                    </div>
                </SheetContent>
            </Sheet>
        </Fragment>
    )
}

export default AdminProducts