import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AccountButton() {
    const supabase = createClient();
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);
    const [email, setEmail] = useState<string | null>(null);

    useEffect(() => {
        setIsMounted(true);
        const fetchUser = async () => {
            const { data: userData } = await supabase.auth.getUser();
            const userEmail = userData.user?.email || null;
            setEmail(userEmail);
        };
        fetchUser();
    }, [supabase]);

    const signOut = async (event: React.FormEvent) => {
        event.preventDefault();
        await supabase.auth.signOut();
        router.push("/auth/signin");
    };

    if (!isMounted) {
        return null;
    }

    const getInitial = (email: string | null) => {
        if (email) {
            return email.charAt(0).toUpperCase();
        }
        return "";
    };

    return (
        <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
                <li>
                    <details>
                        <summary className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center border-2 border-accent">
                                <span className="text-xl font-bold text-gray-800">{getInitial(email)}</span>
                            </div>
                            <span className="text-lg font-semibold">Account</span>

                        </summary>
                        <ul className="p-2 bg-base-100 rounded-t-none">
                            <li className="py-2 px-4 text-gray-800">
                                <span>{email}</span>
                            </li>
                            <li>
                                <button onClick={signOut} className="btn btn-secondary w-full">
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </details>
                </li>
            </ul>
        </div>
    );
}
