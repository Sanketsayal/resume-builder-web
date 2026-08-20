// import { useEffect } from "react";
// import { getCurrentUser } from "../api/authApi";

export function DashboardPage() {
  // useEffect(() => {
  //   async function getUser() {
  //     try {
  //       const response = await getCurrentUser();
  //       console.log(response);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  //   getUser();
  // }, [])
  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900">
        Dashboard
      </h1>

      <p className="mt-2 text-slate-600">
        Welcome to your resume builder.
      </p>
    </div>
  );
}