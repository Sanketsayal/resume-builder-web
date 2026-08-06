import LoginForm from "../../components/auth/loginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-3xl font-bold">Welcome Back</h1>

        <p className="mb-6 text-gray-500">Sign in to your account</p>

        <LoginForm />
      </div>
    </div>
  );
}
