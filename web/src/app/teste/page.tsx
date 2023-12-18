import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";

export default function Teste() {


    const session = getSession();

    if (!session) {
        redirect('/api/auth/login');
    }

    return (
        <div>
            <h1>Teste</h1>
        </div>
    )
}