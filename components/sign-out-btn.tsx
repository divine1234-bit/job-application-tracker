"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { signOut } from "@/lib/auth/auth-client"
import { useRouter } from "next/navigation"
import { useState } from "react"


export default function SignOutButton() {

    const router = useRouter()
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

            router.replace("/sign-in")
            router.refresh()
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
