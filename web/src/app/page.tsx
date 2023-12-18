
import User from '@/components/User';
import { getAccessToken, getSession } from '@auth0/nextjs-auth0';
import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image'
import { redirect } from 'next/navigation';

export default async function Home() {

    const session = getSession();
    const { accessToken } = await getAccessToken();
    console.log(accessToken);

    // console.log(session);

    if (!session) {
        console.log('hue');
        redirect('/api/auth/login');
    }


    return (
        <div>
            <h1>Home</h1>
            <User />
            <a href="/api/auth/login">Login</a>
        </div>
    )
}
