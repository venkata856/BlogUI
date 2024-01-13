import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

function LogOut() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    setAuth({});
    navigate(from, { replace: true });
  });

  return <div>LogOut</div>;
}

export default LogOut;
