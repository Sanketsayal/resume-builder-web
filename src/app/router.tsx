import { createBrowserRouter } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import RootLayout from "../layouts/RootLayout";
import { ForgotPasswordPage } from "../pages/auth/ForgotPasswordPage";
import { LoginPage } from "../pages/auth/LoginPage";
import { RegisterPage } from "../pages/auth/RegisterPage";
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
      {
        element: <AuthLayout />,

        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "register",
            element: <RegisterPage />,
          },
          {
            path: "forgot-password",
            element: <ForgotPasswordPage />,
          },
        ],
      },

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
            element: <ResumeListPage />,
          },

          {
            path: "resumes/new",
            element: <ResumeCreatePage />,
          },

          {
            path: "resumes/:resumeId",
            element: <ResumeEditorPage />,
          },

          {
            path: "resumes/:resumeId/preview",
            element: <ResumePreviewPage />,
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
