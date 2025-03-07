import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/store";

const Basiclayout = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  React.useEffect(() => {
    
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  return <Outlet />;
};

export default Basiclayout;