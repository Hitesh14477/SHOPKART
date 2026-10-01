import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { useAuth } from "../context/AuthContext.jsx";

function Profile() {
    const { user, updateProfile } = useAuth();
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [form, setForm] = useState({ name: "", phone: "" });
    const initial = user?.name?.trim()?.charAt(0)?.toUpperCase() || "U";

    useEffect(() => {
        setForm({
            name: user?.name || "",
            phone: user?.phone || ""
        });
    }, [user]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((current) => ({
            ...current,
            [name]: name === "phone" ? value.replace(/\D/g, "").slice(0, 10) : value
        }));
    };

    const handleCancel = () => {
        setForm({ name: user?.name || "", phone: user?.phone || "" });
        setEditing(false);
        setError("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSaving(true);
        setError("");
        setSuccess("");
        try {
            await updateProfile(form);
            setEditing(false);
            setSuccess("Your profile has been updated.");
        } catch (requestError) {
            setError(requestError.response?.data?.message || "Could not update your profile. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    const fieldClass = "mt-1.5 w-full rounded-md border border-[#DDE1D7] bg-white px-3 py-2.5 text-sm text-[#20281F] outline-none transition focus:border-[#4A7856]";

    return (
        <div className="min-h-screen bg-[#F7F5EE] text-[#20281F]">
            <Navbar />

            <main className="mx-auto max-w-3xl px-5 pb-12 pt-28 sm:px-6">
                <header className="mb-6">
                    <p className="mb-2 text-xs font-medium uppercase tracking-[0.1em] text-[#4A7856]">Account</p>
                    <h1 className="font-serif text-3xl font-medium">Your profile</h1>
                </header>

                <section className="border border-[#E5E7DF] bg-white p-5 sm:p-7">
                    <div className="flex items-center justify-between gap-4 border-b border-[#EEF0E9] pb-5">
                        <div className="flex min-w-0 items-center gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#EDF1E9] font-serif text-xl text-[#35573E]">
                                {initial}
                            </div>
                            <div className="min-w-0">
                                <h2 className="truncate text-base font-semibold">{user?.name || "Shopkart customer"}</h2>
                                <p className="mt-1 truncate text-sm text-[#777A70]">{user?.email || ""}</p>
                            </div>
                        </div>
                        {!editing && (
                            <button
                                type="button"
                                onClick={() => { setEditing(true); setSuccess(""); }}
                                className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-md bg-[#4A7856] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#35573E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A7856]"
                            >
                                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                                    <path d="m13.9 3.1 3 3L7 16l-4 1 1-4L13.9 3.1Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="m11.8 5.2 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                                Edit profile
                            </button>
                        )}
                    </div>

                    {error && <p role="alert" className="mt-5 border border-[#E6C9C2] bg-[#FBF3F1] px-3 py-2.5 text-sm text-[#9C5147]">{error}</p>}
                    {success && <p role="status" className="mt-5 border border-[#D7E2D4] bg-[#F3F7F1] px-3 py-2.5 text-sm text-[#35573E]">{success}</p>}

                    {editing ? (
                        <form onSubmit={handleSubmit} className="pt-5">
                            <div className="space-y-4">
                                <label className="block text-sm font-medium text-[#596057]" htmlFor="profile-name">
                                    Full name
                                    <input id="profile-name" name="name" value={form.name} onChange={handleChange} className={fieldClass} required autoComplete="name" />
                                </label>
                                <label className="block text-sm font-medium text-[#596057]" htmlFor="profile-email">
                                    Email address
                                    <input id="profile-email" type="email" value={user?.email || ""} className={`${fieldClass} cursor-not-allowed bg-[#F7F5EE] text-[#777A70]`} readOnly aria-describedby="profile-email-note" />
                                    <span id="profile-email-note" className="mt-1.5 block text-xs font-normal text-[#85897E]">Email address can’t be changed.</span>
                                </label>
                                <label className="block text-sm font-medium text-[#596057]" htmlFor="profile-phone">
                                    Phone number
                                    <input id="profile-phone" name="phone" type="tel" value={form.phone} onChange={handleChange} className={fieldClass} required minLength={10} maxLength={10} autoComplete="tel" />
                                </label>
                            </div>
                            <div className="mt-6 flex flex-wrap gap-3 border-t border-[#EEF0E9] pt-5">
                                <button type="submit" disabled={saving} className="rounded-md bg-[#20281F] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#4A7856] disabled:opacity-60">
                                    {saving ? "Saving..." : "Save changes"}
                                </button>
                                <button type="button" onClick={handleCancel} disabled={saving} className="rounded-md border border-[#D6DCCF] bg-white px-5 py-2.5 text-sm font-medium text-[#596057] transition-colors hover:bg-[#F4F2EC] disabled:opacity-60">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                        <dl className="divide-y divide-[#EEF0E9]">
                            <div className="grid gap-1 py-4 sm:grid-cols-[140px_1fr] sm:gap-4">
                                <dt className="text-sm text-[#777A70]">Full name</dt>
                                <dd className="break-words text-sm font-medium">{user?.name || "—"}</dd>
                            </div>
                            <div className="grid gap-1 py-4 sm:grid-cols-[140px_1fr] sm:gap-4">
                                <dt className="text-sm text-[#777A70]">Email address</dt>
                                <dd className="break-all text-sm font-medium">{user?.email || "—"}</dd>
                            </div>
                            <div className="grid gap-1 py-4 sm:grid-cols-[140px_1fr] sm:gap-4">
                                <dt className="text-sm text-[#777A70]">Phone number</dt>
                                <dd className="text-sm font-medium">{user?.phone || "—"}</dd>
                            </div>
                        </dl>
                    )}
                </section>

                <Link to="/products" className="mt-5 inline-block text-sm font-medium text-[#4A7856] transition-colors hover:text-[#35573E]">
                    Continue shopping →
                </Link>
            </main>
        </div>
    );
}

export default Profile;
