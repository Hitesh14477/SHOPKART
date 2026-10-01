import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { useAuth } from "../context/AuthContext.jsx";

function Home() {
    const { user } = useAuth();
    const homeActionClass = "inline-flex min-h-11 items-center justify-center rounded-md border border-[#4A7856] bg-[#4A7856] px-5 py-3 text-sm font-medium text-white transition-colors hover:border-[#35573E] hover:bg-[#35573E]";

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div className="min-h-screen bg-[#F7F5EE] text-[#20281F]">
            <Navbar />

            <main className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-5 pb-12 pt-32 sm:px-6">
                <section className="w-full max-w-2xl text-center">
                    <p className="mb-4 text-xs font-medium uppercase tracking-[0.12em] text-[#4A7856]">
                        Welcome back{user.name ? `, ${user.name}` : ""}
                    </p>
                    <h1 className="font-serif text-4xl font-medium leading-tight sm:text-5xl">
                        Find something you’ll love.
                    </h1>
                    <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-[#6E7268]">
                        Browse the collection and save your favourites for later.
                    </p>
                    <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                        <Link
                            to="/products"
                            className={homeActionClass}
                        >
                            Browse products
                        </Link>
                          <Link
                            to="/wishlist"
                            className={homeActionClass}
                        >
                            View wishlist
                        </Link>
                        <Link
                            to="/cart"
                            className={homeActionClass}
                        >
                            View cart
                        </Link>
                      
                    </div>

                    <div className="mt-12 border-t border-[#DFE4D6] pt-6">
                        <h2 className="text-xs font-medium uppercase tracking-[0.1em] text-[#777A70]">
                            Shop by category
                        </h2>
                        <div className="mt-4 flex flex-wrap justify-center gap-2">
                            {["Electronics", "Clothing", "Books", "Fashion"].map((category) => (
                                <span
                                    key={category}
                                    className="border border-[#DFE4D6] bg-white px-3 py-2 text-xs font-medium text-[#596057]"
                                >
                                    {category}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Home;
