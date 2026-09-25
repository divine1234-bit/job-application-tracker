"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { signOut } from "@/lib/auth/auth-client"
import { useState } from "react"


export default function SignOutButton() {

    const [loading, setLoading] = useState(false)

    async function handleSignOut() {
        if (loading) return

        setLoading(true)

        try {
            const result = await signOut();
            if (result.error) {
                setLoading(false)
                alert("Error signing out");
                return
            }

            // Do a full navigation so the server and the client both start
            // with the cleared session after logging out.
            window.location.replace("/sign-in")
        } catch {
            setLoading(false)
            alert("Error signing out");
        }
    }

    return (
        <DropdownMenuItem
            disabled={loading}
            onSelect={(event) => {
                event.preventDefault()
                void handleSignOut()
            }}
            
        >
            Log out
        </DropdownMenuItem>
    )
}
