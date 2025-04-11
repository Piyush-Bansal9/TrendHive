import { Link } from "react-router-dom";
import Form from "../../components/common/form.jsx";
import { registerFormControls } from "../../config/index.js";
import { useState } from "react";

export default function Signup() {

    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        password: ''
    })

    function onSubmitHandler(event){
        
    }
    return (
        <div className='mx-auto w-full max-w-md space-y-12'>
            <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-foreground">
                    Create new account
                </h1>
                <p className="mt-2">
                    Already have an account ?
                    <Link
                        className="font-medium ml-2 text-primary hover:underline"
                        to="/auth/signin"
                    >
                        Login
                    </Link>
                </p>
            </div>
            <Form
                formController={registerFormControls}
                buttonText={'Sign Up'}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmitHandler}
            />
        </div>
    )
}