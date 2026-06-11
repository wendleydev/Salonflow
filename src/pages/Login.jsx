import logo from "../assets/logo_salon.webp";

function Login() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src={logo} alt="Logo" className="w-10 h-10" />
      <button className="bg-blue-500 text-black p-2 rounded-md">Login</button>
    </div>
  );
}

export default Login;
