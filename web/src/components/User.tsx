'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { redirect } from 'next/navigation';

export default function User() {

    const { user } = useUser();

    return (
        <div>
            <h1>{user?.name}</h1>
        </div>
    )
}