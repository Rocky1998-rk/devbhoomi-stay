


import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
  const { login, logout, isAuthenticated } = useAuth();

  return (
    <>
      <h1>Owner Dashboard</h1>

      <h2>{isAuthenticated ? "Logged In" : "Not Logged In"}</h2>

      <button
        onClick={() =>
          login(
            {
              name: "Rocky",
              role: "owner",
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