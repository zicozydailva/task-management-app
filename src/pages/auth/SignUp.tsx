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

        handleGenericSuccess("Account Created Succesfully");
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
    <div className="flex h-screen w-screen flex-col bg-background bg-gradient-to-br from-blue-200 to-blue-300 px-5 md:px-24">
      <header className="py-6"></header>
      <main className="flex w-full justify-center">
        <form className="w-full md:w-[450px]" onSubmit={handleSubmit}>
          <h1 className="mb-6 text-xl font-bold text-primary">
            Create An Account
          </h1>
          <div className="space-y-3 mb-6">
            <Input
              name="firstName"
              label="First Name"
              placeholder="John@gmail.com"
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
      </main>
    </div>
  );
};

export default SignUp;
