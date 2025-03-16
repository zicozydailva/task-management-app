import { ChangeEvent, FormEvent, useState } from "react";
import Input from "../../components/input";
import Button from "../../components/button";
import { handleGenericSuccess } from "../../utils/notify";
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
      console.log({ res });

      if (res?.token.accessToken) {
        localStorage.setItem("accessToken", res.token.accessToken);
        localStorage.setItem("refreshToken", res.token.refreshToken);
        localStorage.setItem("sessionId", res.token.sessionId);

        handleGenericSuccess("Login Successful");
        navigate("/dashboard");
      }
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col bg-background px-5 md:px-24">
      <header className="py-6"></header>
      <main className="mt-28 flex w-full justify-center md:mt-48">
        <form className="w-full md:w-[450px]" onSubmit={handleSubmit}>
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
          <div className="mt-4 text-sm text-primary">
            <a href={"/"}>Forgot Password?</a>
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
      </main>
    </div>
  );
};

export default Login;
