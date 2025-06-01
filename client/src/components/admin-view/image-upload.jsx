import { useEffect, useRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";


export default function ProductImageUpload({imageFile, setImageFile, uploadedimageURL, setuploadedImageURL, setImageLoading, imageLoading}) {

    const inputRef = useRef(null);

    function imageChangeHandler(event) {
        console.log(event.target.files);
        const selectedFile = event.target.files?.[0];
        if(selectedFile) setImageFile(selectedFile)
        
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDrop(event) {
        event.preventDefault();
        console.log(event);
        const droppedFile = event.dataTransfer.files?.[0];
        if(droppedFile) setImageFile(droppedFile);
    }

    function handleRemoveImage(){
        setImageFile(null);
        if(inputRef.current) {
            inputRef.current.value = "";
        }
    }

    async function uploadImagetoCloudinary() {
        setImageLoading(true);
        const data = new FormData();
        data.append("my_file", imageFile);
        const response = await axios.post("http://localhost:5000/api/admin/products/upload-image", data);
        console.log(response);
        if(response?.data?.success) {
            setuploadedImageURL(response.data.result.url);
            setImageLoading(false);
        }
        
    }

    useEffect(() => {
        if(imageFile !== null) uploadImagetoCloudinary(); 
    }, [imageFile])

    return <div className='w-full max-w-md mx-auto mt-4'>
        <Label className="text-lg font-semibold mb-2 block text-center">Upload Image</Label>
        <div onDragOver={handleDragOver} onDrop={handleDrop} className="border-2 border-dashed rounded-lg p-4">
            <Input id="image-upload" 
            type="file" 
            className="hidden" 
            ref = {inputRef} 
            onChange = {imageChangeHandler}/>
            {
                !imageFile ? (
                    <Label
                        htmlFor = "image-upload"
                        className= " flex flex-col items-center justify-center h-32 cursor-pointer "
                    >
                        <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
                        <span>Drag & drop or click to upload image</span>
                    </Label>
                ) : (
                    imageLoading ? 
                    <Skeleton className='h-10 bg-gray-100'/> :
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <FileIcon className="w-8 text-primary mr-2 h-8" />
                        </div>
                        <p className="text-sm font-medium">{imageFile.name}</p>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-foreground"
                            onClick={handleRemoveImage}
                        >
                            <XIcon className="w-4 h-4" />
                            <span className="sr-only">Remove File</span>
                        </Button>
                    </div>
                )
            }
        </div>
    </div>
}
