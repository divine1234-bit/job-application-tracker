"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { signOut } from "@/lib/auth/auth-client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import LoadingScreen from "@/components/loading-screen"


export default function SignOutButton() {

    const router = useRouter()
    const [loading, setLoading] = useState(false)

    async function handleSignOut() {
        setLoading(true)

        try {
            const result = await signOut();
            if (result.data) {
                router.push("/sign-in")
            } else {
                setLoading(false)
                alert("Error signing out");
            }
        } catch {
            setLoading(false)
            alert("Error signing out");
        }
    }

    if (loading) {
        return <LoadingScreen message="Signing you out..." overlay />
    }

    return (
        <DropdownMenuItem
            onSelect={(event) => {
                event.preventDefault()
                void handleSignOut()
            }}
            
        >
            Log out
        </DropdownMenuItem>
    )
}
