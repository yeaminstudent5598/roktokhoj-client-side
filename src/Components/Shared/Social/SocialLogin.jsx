import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";

const SocialLogin = () => {

    const {googleSignIn} = useAuth();
    
    const navigate = useNavigate();

    const handleGoogleSignIn = () =>{
        googleSignIn()
        .then(result => {
            console.log(result.user);
            navigate('/')
        })

    }
    return (
        <div className="p-4 items-center w-full">
            <div className="divider"></div>
            <button onClick={handleGoogleSignIn} className="btn w-full btn-warning"> <FaGoogle></FaGoogle>Login With Google</button>
        </div>
    );
};

export default SocialLogin;