import { useState } from "react"
import { Link } from "react-router-dom";
import Form from "../../components/common/form";
import { loginformControls } from "../../config";

export default function Signin() {
    const [formData, setFormData] = useState();
    function onSubmitHandler(event) {

    }
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