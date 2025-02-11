import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import AuthPage from "./pages/AuthPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    // errorElement: <ErrorPage />,
    children: [
      { path: "/", element: < AuthPage /> },
      { path: "/signin", element: < AuthPage /> },
    ],
  },
]);

function App() {
  return (
    <div
      className="h-screen w-screen items-center justify-center bg-cover bg-center text-white"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/462162/pexels-photo-462162.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
      }}
    >
      <RouterProvider router={router} />;
    </div>
  );
}

export default App;
