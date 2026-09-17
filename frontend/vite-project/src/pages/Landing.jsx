import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="min-h-screen bg-[#F7F5EE] text-[#20281F]">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-[#DFE4D6]">
        <h1 className="text-2xl font-serif tracking-wide">
          <Link to={'/'}>
            shopkart<span className="text-[#B98A3E]">.</span>
          </Link>
        </h1>

        <div className="flex gap-4 font-sans text-sm">
          <Link
            to="/login"
            className="px-4 py-2 hover:text-[#4A7856]"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-4 py-2 bg-[#4A7856] text-white rounded-sm"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex items-center justify-center min-h-[80vh] px-6">
        <div className="text-center max-w-2xl">

          <p className="font-sans text-sm text-[#4A7856] mb-4">
            SIMPLE. MODERN. YOURS.
          </p>

          <h1 className="text-5xl md:text-6xl font-serif leading-tight mb-6">
            Everything you need,
            <br />
            <span className="text-[#4A7856]">
              in one place.
            </span>
          </h1>

          <p className="font-sans text-[#6E7268] max-w-lg mx-auto mb-8 leading-relaxed">
            Discover products you'll love, shop effortlessly,
            and keep track of all your orders in one simple place.
          </p>

          <Link
            to="/register"
            className="inline-block px-7 py-3 bg-[#4A7856] hover:bg-[#35573E] text-white rounded-sm font-sans text-sm font-semibold"
          >
            Start Shopping
          </Link>

        </div>
      </main>

    </div>
  );
}

export default Landing;