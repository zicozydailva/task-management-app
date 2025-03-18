import { ChangeEvent, FormEvent, useState } from "react";
import Input from "../../components/input";
import Button from "../../components/button";
import { handleError, handleGenericSuccess } from "../../utils/notify";
import useDashboardApi from "../../utils/api/dashboard.api";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const { signUpHandler } = useDashboardApi();
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await signUpHandler(data);

      if (res?.token.accessToken) {
        localStorage.setItem("accessToken", res.token.accessToken);
        localStorage.setItem("refreshToken", res.token.refreshToken);
        localStorage.setItem("sessionId", res.token.sessionId);

        handleGenericSuccess("Account Created Successfully");
        navigate("/auth/login");
      }
      setLoading(false);
    } catch (e) {
      handleError(e);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col md:flex-row">
      {/* Image Section (Hidden on Mobile) */}
      <div
        className="hidden md:flex md:w-1/2 bg-blue-400 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1542626991-cbc4e32524cc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFuYWdlbWVudHxlbnwwfHwwfHx8MA%3D%3D')",
          objectFit: "contain",
        }}
      ></div>

      {/* Form Section */}
      <div className="h-screen flex w-full md:w-1/2 flex-col justify-center items-center bg-gradient-to-br from-blue-200 to-blue-300 px-5 md:px-24">
        <form className="w-full max-w-md" onSubmit={handleSubmit}>
          <h1 className="mb-6 text-xl font-bold text-primary">
            Create An Account
          </h1>
          <div className="space-y-3 mb-6">
            <Input
              name="firstName"
              label="First Name"
              placeholder="John"
              value={data.firstName}
              onChange={handleChange}
            />
            <Input
              name="lastName"
              label="Last Name"
              placeholder="Doe"
              value={data.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-3">
            <Input
              name="email"
              label="Email"
              placeholder="admin@gmail.com"
              value={data.email}
              onChange={handleChange}
            />
            <Input
              name="password"
              label="Password"
              placeholder="*********"
              type="password"
              value={data.password}
              onChange={handleChange}
            />
          </div>
          <div className="mt-4 text-sm text-primary flex justify-between">
            <span className="text-black">
              Already have an account?{" "}
              <a className="font-bold cursor-pointer" href="/auth/login">
                Login
              </a>{" "}
            </span>
            <a href={"#"}>Forgot Password?</a>
          </div>
          <Button
            className="mt-10"
            type="submit"
            loading={loading}
            disabled={
              !(data.firstName && data.lastName && data.email && data.password)
            }
          >
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
