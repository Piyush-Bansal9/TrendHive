import { use, useState } from "react"
import { Link } from "react-router-dom";
import Form from "../../components/common/form";
import { loginformControls } from "../../config";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/auth-slice";

export default function Signin() {
    const [formData, setFormData] = useState(
        {
            email: '',
            password: ''
        }
    );
    const dispatch = useDispatch();
    function onSubmitHandler(event) {
        event.preventDefault()
        dispatch(loginUser(formData))
        // .then( (data) => {
        //     if(data?.payload?.success){
        //         toast({
        //             title: data?.payload?.message
        //         })
        //     }
        //     else{
        //         toast({
        //             title: data?.payload?.message,
        //             variant: 'destructive'
        //         })
        //     }
        // } )
    }
    console.log(formData);
    return (
        <div className="mx-auto max-w-md w-full space-y-12">
            <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-foreground">
                    Sign in to your account
                </h1>
                <p className="mt-2">
                    Dont't have an account ?
                    <Link
                        className="font-medium ml-2 text-primary hover:underline"
                        to="/auth/signup"
                    >
                        Signup
                    </Link>
                </p>
            </div>
            <Form
                formController={loginformControls}
                buttonText={'Log In'}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmitHandler}
            />
        </div>
    )
}