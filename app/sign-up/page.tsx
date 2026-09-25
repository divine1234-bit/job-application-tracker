"use client";


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {signUp} from '@/lib/auth/auth-client'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import LoadingScreen from "@/components/loading-screen";

export default function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
        const [loading, setLoading] = useState(false);

        async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
            e.preventDefault();

            setError("");
            setLoading(true);

            try{
                const result = await signUp.email({
                    name,
                    email,
                    password,
                });

                if (result.error){
                    setError(result.error.message ?? "failed to sign up")
                    setLoading(false)
                } else {
                    window.location.assign("/dashboard");
                }
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Unable to reach the authentication server. Please try again."
                )
                setLoading(false)
            }
        } 

    if (loading) {
        return <LoadingScreen message="Creating your account..." />;
    }

    return ( <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-white p-4">
        <Card className="w-full max-w-md border-gray-200 shadow-lg">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-black">
                    sign up
                </CardTitle>
                <CardDescription className="text-gray-600">
                    Create an account to start tracking your job applications
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit} className="space-y-4"> 
                <CardContent className="space-y-4">
                    {error && (
                        <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                            {error}
                        </div>
                    )}
                    <div className="space-y-4">
                        <Label htmlFor="name"  className="text-gray-700">name</Label>
                        <Input id="name" type="text" placeholder="john doe" value={name} onChange={(e) =>setName(e.target.value)} required 
                        className="border-gray-300 focus:border-primary focus:ring-primary"
></Input>
                    </div>

                     <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-700">email</Label>
                        <Input id="email" type="email"  placeholder="you@example.com" value={email}
                         onChange={(e) =>setEmail(e.target.value)} required className="border-gray-300 focus:border-primary focus:ring-primary"></Input>
                    </div>

                     <div className="space-y-2">
                        <Label htmlFor="password" className="text-gray-700">password</Label>
                        <Input id="password" type="password"
                         value={password} onChange={(e) =>setPassword(e.target.value)} minLength={8} required                 className="border-gray-300 focus:border-primary focus:ring-primary"
></Input>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90"
                    disabled={loading}
>
                        {loading ? "creating account..." : "sign Up"}
                    </Button>
                    <p className="text-center text-sm text-gray-600" >Dont have an account? {" "}
                          <Link href="/sign-up"  className="font-medium text-primary hover:underline">sign up</Link></p>
                </CardFooter>
            </form>
        </Card>
    </div>
    );
}
