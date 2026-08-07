import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
  const { login, logout, isAuthenticated } = useAuth();

  return (
    <>
      <h1>Admin Dashboard</h1>

      <h2>{isAuthenticated ? "Logged In" : "Not Logged In"}</h2>

      <button
        onClick={() =>
          login(
            {
              name: "Rocky",
              role: "admin",
            },
            "demo-token"
          )
        }
      >
        Login
      </button>

      <button onClick={logout}>Logout</button>
    </>
  );
};

export default Dashboard;