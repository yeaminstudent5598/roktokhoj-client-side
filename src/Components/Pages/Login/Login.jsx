import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

const Login = () => {


  const {signIn, user} = useAuth();
  const navigate = useNavigate();
    const location = useLocation();
    

    const from = location.state?.from?.pathname || '/';

        


  const handleLogin = event => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    signIn(email, password) 
    .then(result => {
      const user = result.user;
      console.log(user);
      navigate(from, {replace: true});
      Swal.fire({
        title: 'Success!',
        text: 'You have logged in successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    })
}
    return (
        <div>
          <div className="hero bg-red-500 min-h-screen">
  <div className="hero-content text-center text-white flex-col lg:flex-row">
    <div className="lg:w-1/2 px-6">
      <h1 className="text-5xl font-bold mb-4">Welcome to RoktoKhoj</h1>
      <p className="mb-6">Join us in saving lives. Donate blood and make a difference in someone’s life today.</p>
      <a href="#about" className="btn btn-outline btn-white">Learn More</a>
    </div>
    <div className="lg:w-1/2 bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold mb-4">Login to Start</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input name="email" type="email" placeholder="Enter your email" className="input text-black input-bordered w-full" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input name="password" type="password" placeholder="Enter your password" className="input text-black input-bordered w-full" required />
          <label className="label mt-2">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary w-full">Login</button>
        </div>
      </form>
      <p className="mt-4 text-black text-center">
        New to RoktoKhoj? <Link to="/signUp" className="text-blue-500">Sign up</Link >
      </p>
    </div>
  </div>
</div>
            

        </div>
    );
};

export default Login;