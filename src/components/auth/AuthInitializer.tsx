import { type PropsWithChildren, useEffect } from "react";

import { useAuth } from "../../context/AuthContext";
import { useCurrentUser } from "../../hooks/useCurrentUser";

export default function AuthInitializer({ children }: PropsWithChildren) {
  const auth = useAuth();

  const me = useCurrentUser();

  useEffect(() => {
    if (me.isPending) {
      return;
    }

    if (me.isSuccess) {
      auth.setUser(me.data.user);
    }

    auth.setLoading(false);
  }, [me.status]);

  if (auth.isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return children;
}
