import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useLogin } from "../../hooks/useLogin";
import { type LoginFormData, loginSchema } from "../../schemas/login.schema";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function LoginForm() {
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  function onSubmit(data: LoginFormData) {
    loginMutation.mutate(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <Input placeholder="Email" {...register("email")} />

        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Input
          type="password"
          placeholder="Password"
          {...register("password")}
        />

        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <Button
        className="w-full cursor-pointer"
        disabled={loginMutation.isPending}
        type="submit"
      >
        {loginMutation.isPending ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
}
