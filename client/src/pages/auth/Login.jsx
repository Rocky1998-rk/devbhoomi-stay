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
        role: "owner",
      },
      "demo-jwt-token"
    );

    navigate("/owner/dashboard");
  };

  return (
    <div>
      <h1>Login Page</h1>

      <button onClick={handleLogin} className="btn btn-primary border flex items-center gap-2">
        Login 
      </button>
    </div>
  );
};

export default Login;