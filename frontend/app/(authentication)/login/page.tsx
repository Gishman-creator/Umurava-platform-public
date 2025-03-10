"use client"

import { use, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"

export default function LoginForm() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      console.log("Login attempt:", formData);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });
  
      console.log(response);
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Login failed:", errorData);
        setError('Invalid credentials or email not verified');
        return;
      }
  
      const data = await response.json();
      const { token, user } = data;
  
      // Store JWT token and user details in localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('_id', user._id);
      localStorage.setItem('name', user.name);
      localStorage.setItem('email', user.email);
      localStorage.setItem('role', user.role);
      localStorage.setItem('imageUrl', user.imageUrl);
  
      // Navigate to the appropriate dashboard based on the user role
      router.push(`/${user.role}/dashboard`);
    } catch (err) {
      console.error(err);
      setError('Invalid credentials or email not verified');
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
            { error && (<p className="text-sm text-red-500 text-center">{error}</p>)}
            <Button type="submit" className="w-full bg-primary text-white" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account? <Link href="/signup" className="text-primary font-medium">Sign up</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
