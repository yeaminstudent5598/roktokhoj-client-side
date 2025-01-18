import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useNavigate } from "react-router-dom";
import SocialLogin from "../../Shared/Social/SocialLogin";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [districtData, setDistrictData] = useState([]);
  const [upazilaData, setUpazilaData] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [selectedDistrictId, setSelectedDistrictId] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  useEffect(() => {
    fetch("/districts.json")
      .then((res) => res.json())
      .then((data) => {
        const districts = data[2]?.data || [];
        setDistrictData(districts);
      })
      .catch((err) => console.error("Error loading districts:", err));
  }, []);

  useEffect(() => {
    fetch("/upazilas.json")
      .then((res) => res.json())
      .then((data) => {
        const upazilas = data[2]?.data || [];
        setUpazilaData(upazilas);
      })
      .catch((err) => console.error("Error loading upazilas:", err));
  }, []);

  useEffect(() => {
    if (selectedDistrictId) {
      const filtered = upazilaData.filter(
        (upazila) => upazila.district_id === selectedDistrictId
      );
      setFilteredUpazilas(filtered);
    } else {
      setFilteredUpazilas([]);
    }
  }, [selectedDistrictId, upazilaData]);

  const onSubmit = async (data) => {
    try {
      const imageFile = new FormData();
      imageFile.append("image", data.image[0]);

      const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      const imageUrl = res.data.data.display_url;

      const result = await createUser(data.email, data.password);
      const loggedUser = result.user;

      await updateUserProfile(data.name, imageUrl);

      const userInfo = {
        name: data.name,
        email: data.email,
        bloodGroup: data.bloodGroup,
        upazila: data.upazila,
        image: imageUrl,
      };

      const dbRes = await axiosPublic.post("/users", userInfo);

      if (dbRes.data.insertedId) {
        console.log("User profile added to database");
        reset();
        navigate("/");
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center md:w-1/2 lg:text-left">
          <h1 className="text-5xl font-bold">Sign Up Now</h1>
          <p className="py-6">
            Join our platform and explore exciting opportunities. Registration
            is simple and secure.
          </p>
        </div>

        <div className="card bg-base-100 md:w-1/2 max-w-sm shrink-0 shadow-2xl">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card-body space-y-4"
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                placeholder="Enter your name"
                className="input input-bordered"
              />
              {errors.name && (
                <span className="text-red-600">{errors.name.message}</span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Avatar</span>
              </label>
              <input
                type="file"
                {...register("image", { required: "Avatar is required" })}
                className="input input-bordered"
              />
              {errors.image && (
                <span className="text-red-600">{errors.image.message}</span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Blood Group</span>
              </label>
              <select
                {...register("bloodGroup", { required: "Blood group is required" })}
                className="input input-bordered"
              >
                <option value="">Select a blood group</option>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                  (group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  )
                )}
              </select>
              {errors.bloodGroup && (
                <span className="text-red-600">{errors.bloodGroup.message}</span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">District</span>
              </label>
              <select
                {...register("district", { required: "District is required" })}
                className="input input-bordered"
                onChange={(e) => setSelectedDistrictId(e.target.value)}
              >
                <option value="">Select a district</option>
                {districtData.map((district) => (
                  <option key={district.id} value={district.id}>
                    {district.name}
                  </option>
                ))}
              </select>
              {errors.district && (
                <span className="text-red-600">{errors.district.message}</span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Upazila</span>
              </label>
              <select
                {...register("upazila", { required: "Upazila is required" })}
                className="input input-bordered"
              >
                <option value="">Select an upazila</option>
                {filteredUpazilas.map((upazila) => (
                  <option key={upazila.id} value={upazila.name}>
                    {upazila.name}
                  </option>
                ))}
              </select>
              {errors.upazila && (
                <span className="text-red-600">{errors.upazila.message}</span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Enter a valid email address",
                  },
                })}
                placeholder="Enter your email"
                className="input input-bordered"
              />
              {errors.email && (
                <span className="text-red-600">{errors.email.message}</span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  pattern: {
                    value:
                      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/,
                    message:
                      "Password must include uppercase, lowercase, number, and special character",
                  },
                })}
                placeholder="Enter your password"
                className="input input-bordered"
              />
              {errors.password && (
                <span className="text-red-600">{errors.password.message}</span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                placeholder="Confirm your password"
                className="input input-bordered"
              />
              {errors.confirmPassword && (
                <span className="text-red-600">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
            </div>
          </form>
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
