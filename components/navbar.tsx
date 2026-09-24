"use client";

import { Briefcase } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import SignOutButton from "./sign-out-btn";
import { useSession } from "@/lib/auth/auth-client";


export default function Navbar(){
    const {data: session} = useSession()
    return(
     <nav className="border-b border-b-gray-200 bg-white">
        <div className="container mx-auto flex h-16 items-center px-4 justify-between">
            <Link href="/" className="flex item-centre gap-2 text-xl font-semibold text-primary">
            <Briefcase/>
            job tracker
            </Link> 
            <div className="flex items-center gap-4">
                {session?.user ? (
                    <>
                    <Link href="/dashboard">
                    <Button 
                    variant="ghost"
                    className="text-gray-700 hover:text-black"
                    >
                        dashboard
                    </Button>
                    </Link>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="relative h-8 w-8 rounded-full">

                                <Avatar>
                                    <AvatarFallback className="bg-primary text-white">
                                        {session.user.name[0].toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="w-56" align="end">
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        {session.user.name}
                                        </p>
                                    <p className="text-xs leading-none text-muted-foreground">
                                        {session.user.email}
                                        </p>
                                </div>
                            </DropdownMenuLabel>
                        <SignOutButton/>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    </>
                    ) :(
                    <>

                <Link href="sign-in" >
                <Button variant="ghost" className="text-gray-700"> log in</Button> 
                </Link>
                <Link href="sign-up">
                <Button className="bg-primary hover:primary/90">
                    start for free
                    </Button>
                </Link>
                </>
                )}
            </div>
        </div>
    </nav>
    );
}
