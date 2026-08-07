import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login(
      {
        _id: "1",
        name: "Rocky Kumar",
        email: "rocky@gmail.com",
        role: "admin",
      },
      "demo-jwt-token"
    );

    navigate("/admin/dashboard");
  };

  return (
    <div>
      <h1>Login Page</h1>

      <button onClick={handleLogin} className="btn btn-primary border">
        Login as Admin
      </button>
    </div>
  );
};

export default Login;