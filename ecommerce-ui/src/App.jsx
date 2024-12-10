import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { useState, useEffect, createContext, useContext } from "react";
import NavBar from "./Components/NavBar";
import Products from "./pages/Products";
import Dashboard from "./pages/Dashboard";
import DashboardProducts from "./pages/dashboard/DashboardProducts";

const queryClient = new QueryClient();
const AuthUserContext = createContext(null);

export const useAuthUser = () => {
  return useContext(AuthUserContext);
};

const getValueFromLocalstorage = () => {
  const authUser = localStorage.getItem("authUser");
  console.log(typeof authUser, authUser);
  return authUser ? JSON.parse(authUser) : null;
};

function HomeLayout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
function GuestRoutes() {
  const { authUser } = useAuthUser();
  if (authUser) return <Navigate to="/" />;
  return <Outlet />;
}
function ProtectedRoutes(){
  const {authUser} = useAuthUser();
  if (!authUser) return <Navigate to="/sign-in"/>;
  return <Outlet/>;
}
function AdminRoutes(){
  const {authUser} = useAuthUser();
  if (authUser.roles.includes("Admin")) return <Outlet />;
  return <Navigate to="/sign-in"/> ;
}

function App() {
  const [authUser, setAuthUser] = useState(getValueFromLocalstorage);

  useEffect(() => {
    localStorage.setItem("authUser", JSON.stringify(authUser));
  }, [authUser]);

  // setUser({name, email, role})
  return (
    <AuthUserContext.Provider value={{ authUser, setAuthUser }}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route element={<HomeLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
            </Route>
            <Route element={<ProtectedRoutes />}>
              <Route path="/orders" element={<h2>Orders Page</h2>} />
              <Route path="/profile" element={<h2>Profile Page</h2>} />
            </Route>
            <Route element={<AdminRoutes/>}>
              <Route element={<Dashboard/>} >
              <Route path="/dashboard/products" element={<DashboardProducts/>} />
              </Route>
              <Route element={<Dashboard/>} >
              <Route path="/dashboard/orders" element={<h2>Orders List</h2>} />
              </Route>
              <Route element={<Dashboard/>} >
              <Route path="/dashboard/users" element={<h2>Users List</h2>} />
              </Route>
            </Route>
            <Route element={<GuestRoutes />}>
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </AuthUserContext.Provider>
  );
}

export default App;
