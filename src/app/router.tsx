import { createBrowserRouter } from "react-router-dom";

// import ForgotPasswordPage from "@/features/auth/pages/ForgotPasswordPage";
// import RegisterPage from "@/features/auth/pages/RegisterPage";
// import ResetPasswordPage from "@/features/auth/pages/ResetPasswordPage";
import GuestRoute from "../components/auth/GuestRoute";
import ProtectedRoute from "../components/auth/ProtectedRoutes";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import RootLayout from "../layouts/RootLayout";
import LoginPage from "../pages/auth/LoginPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import { NotFoundPage } from "../pages/errors/NotFoundPage";
import { ProfilePage } from "../pages/profile/ProfilePage";
import { ResumeCreatePage } from "../pages/resume/ResumeCreatePage";
import { ResumeEditorPage } from "../pages/resume/ResumeEditorPage";
import { ResumeListPage } from "../pages/resume/ResumeListPage";
import { ResumePreviewPage } from "../pages/resume/ResumePreviewPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFoundPage />,

    children: [
      // Guest Routes
      {
        element: <GuestRoute />,

        children: [
          {
            element: <AuthLayout />,

            children: [
              {
                path: "login",
                element: <LoginPage />,
              },
              // {
              //   path: "register",
              //   element: <RegisterPage />,
              // },
              // {
              //   path: "forgot-password",
              //   element: <ForgotPasswordPage />,
              // },
              // {
              //   path: "reset-password/:token",
              //   element: <ResetPasswordPage />,
              // },
            ],
          },
        ],
      },

      // Protected Routes
      {
        element: <ProtectedRoute />,

        children: [
          {
            element: <DashboardLayout />,

            children: [
              {
                index: true,
                element: <DashboardPage />,
              },

              {
                path: "profile",
                element: <ProfilePage />,
              },

              {
                path: "resumes",
                children: [
                  {
                    index: true,
                    element: <ResumeListPage />,
                  },
                  {
                    path: "new",
                    element: <ResumeCreatePage />,
                  },
                  {
                    path: ":resumeId",
                    element: <ResumeEditorPage />,
                  },
                  {
                    path: ":resumeId/preview",
                    element: <ResumePreviewPage />,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
