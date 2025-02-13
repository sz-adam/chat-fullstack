import { AuthProvider } from "./context/AuthContext";
import Navigation from "./lib/Navigation";

function App() {
  return (
    <AuthProvider>
    
      <div
        className="h-screen w-screen items-center justify-center bg-cover bg-center text-white"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/462162/pexels-photo-462162.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
        }}
      >
        <Navigation />
      </div>
    </AuthProvider>
  );
}

export default App;
