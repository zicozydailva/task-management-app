import { ChangeEvent, FormEvent, useState } from "react";
import Input from "../../components/input";
import Button from "../../components/button";
import { handleError, handleGenericSuccess } from "../../utils/notify";
import useDashboardApi from "../../utils/api/dashboard.api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { loginHandler } = useDashboardApi();
  const navigate = useNavigate();

  const [data, setData] = useState({
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
      const res = await loginHandler(data);

      if (res?.token.accessToken) {
        localStorage.setItem("accessToken", res.token.accessToken);
        localStorage.setItem("refreshToken", res.token.refreshToken);
        localStorage.setItem("sessionId", res.token.sessionId);

        handleGenericSuccess("Login Successful");
        navigate("/dashboard");
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
            "url('https://plus.unsplash.com/premium_photo-1723291359453-aea7e6bcbebd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bWFuYWdlbWVudHxlbnwwfHwwfHx8MA%3D%3D')",
        }}
      ></div>

      {/* Login Form Section */}
      <div className="flex w-full md:w-1/2 flex-col justify-center items-center bg-gradient-to-br from-blue-200 to-blue-300 px-5 md:px-24">
        <form className="w-full max-w-md" onSubmit={handleSubmit}>
          <h1 className="mb-6 text-xl font-bold text-primary">
            Login To Dashboard
          </h1>
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
              Don't have an account?{" "}
              <a className="font-bold cursor-pointer" href="/auth/signup">
                Sign Up
              </a>{" "}
            </span>
            <a href={"#"}>Forgot Password?</a>
          </div>
          <Button
            className="mt-10"
            type="submit"
            loading={loading}
            disabled={!(data.email && data.password)}
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
