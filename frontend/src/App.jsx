import { AuthProvider } from "./context/AuthContext";
import { MessagesProvider } from "./context/MessagesContext";
import Navigation from "./lib/Navigation";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <AuthProvider>
      <MessagesProvider>
        <div
          className="h-screen w-screen items-center justify-center bg-cover bg-center text-white"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/462162/pexels-photo-462162.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
          }}
        >
          <Navigation />
          <ToastContainer />
        </div>
      </MessagesProvider>
    </AuthProvider>
  );
}

export default App;
