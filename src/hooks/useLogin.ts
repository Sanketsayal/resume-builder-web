import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { login } from "../api/auth.api";
import { useAuth } from "../context/AuthContext";

export function useLogin() {
  const navigate = useNavigate();
  const auth = useAuth();

  return useMutation({
    mutationFn: login,

    onSuccess: (response) => {
      auth.setUser(response.user);

      navigate("/");
    },
  });
}
