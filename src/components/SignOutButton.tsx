import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignOutButton() {
    const supabase = createClient();
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const signOut = async (event: React.FormEvent) => {
        event.preventDefault();
        await supabase.auth.signOut();
        router.push("/auth/signin");
    };

    if (!isMounted) {
        return null;
    }

    return (
        <div className="flex items-center gap-4">
            <form onSubmit={signOut}>
                <button type="submit" className="btn btn-secondary">
                    SignOut
                </button>
            </form>
        </div>
    );
}
