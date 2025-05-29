import { Link, useNavigate } from "react-router-dom";
import Form from "../../components/common/form.jsx";
import { registerFormControls } from "../../config/index.js";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/auth-slice/index.js";
import { LogIn } from "lucide-react";


export default function Signup() {

    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        password: ''
    })

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function onSubmitHandler(event){
        event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
        // console.log(data);
        if (data?.payload?.success) {
            alert(data?.payload?.message);
            navigate("/auth/signin");
        } else {
            alert(data?.payload?.message);
        }
    });
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