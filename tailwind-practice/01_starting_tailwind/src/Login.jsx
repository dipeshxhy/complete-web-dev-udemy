const Login = () => {
  return (
    <div className="bg-slate-900 shadow-gray-900 shadow-2xl text-white w-96 p-8 rounded-md">
      <h2 className="text-3xl font-semibold text-center">Login</h2>
      <form action="" className=" flex flex-col gap-y-3">
        <div className="flex flex-col gap-2 mb-3">
          <label className="text-lg font-semibold" htmlFor="email">
            Email:
          </label>
          <input
            className="px-2.5 py-2 border0 outline-none  focus:ring-1 focus:ring-purple-500 bg-gray-800 text-lg text-white rounded-md"
            type="text"
            id="email"
            name="email"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-lg font-semibold" htmlFor="password">
            Password:
          </label>
          <input
            className="px-2.5 py-2 border0 outline-none  focus:ring-1 focus:ring-purple-500 bg-gray-800 text-lg  text-white  rounded-md"
            type="password"
            id="password"
            name="password"
          />
        </div>
        <button
          className="mt-4 w-full duration-400 transition border-0 outline-0 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};
export default Login;
