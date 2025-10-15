export default function Home() {
  return (
    <div className="flex h-[100vh] flex-col items-center bg-white pt-7">
      <div className="flex gap-1">
        <span className="text-gray-400">Don't have an account?</span>
        <a href="/create-account" className="text-red-400">
          Register
        </a>
      </div>
      <div className="flex gap-1">
        <span className="text-gray-400">Do you have an account?</span>
        <a href="/log-in" className="text-red-400">
          Log in
        </a>
      </div>
    </div>
  );
}
