
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function SignOutButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/auth/signin");
  };

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email}!
      <form action={signOut}>
        <button type="submit" className="btn btn-secondary">
          SignOut
        </button>
      </form>
    </div>
  ) : (
    <Link href="/login" className="btn btn-primary">
      Login
    </Link>
  );
}
