"use client";

import Link from "next/link";
import { useUserAuth } from "./_utils/auth-context";

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  async function handleLogin() {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleLogout() {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">Week 8</h1>

      {!user && (
        <button
          onClick={handleLogin}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Login with GitHub
        </button>
      )}

      {user && (
        <div className="space-y-4">
          <p>
            Welcome, {user.displayName} ({user.email})
          </p>

          <div className="space-x-4">
            <Link href="/week-8/shopping-list" className="text-blue-400 underline">
              Go to Shopping List
            </Link>

            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </main>
  );
}