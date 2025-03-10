'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Params = {
  token: string;
}

export default function VerifyEmail() {
  const router = useRouter();
  const params = useParams() as Params;
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/verify-email/${params.token}`, {
          method: 'GET',
        });

        const data = await response.json();
        const { token, user } = data;

        if (!response.ok) {
          throw new Error(data.message || 'Verification failed');
        }

        setStatus('success');
        setMessage(data.message || 'Email verified successfully!');
  
        // Store JWT token and user details in localStorage
        localStorage.setItem('authToken', token);
        localStorage.setItem('_id', user._id);
        localStorage.setItem('name', user.name);
        localStorage.setItem('email', user.email);
        localStorage.setItem('role', user.role);
        localStorage.setItem('imageUrl', user.imageUrl);

        console.log('image url is:', user.imageUrl)

        // Redirect to login after successful verification
        setTimeout(() => {
          router.push(`/${user.role}/dashboard`);
        }, 3000);
      } catch (error: any) {
        setStatus('error');
        setMessage(error.message || 'Verification failed. Please try again.');
      }
    };

    if (params.token) {
      verifyEmail();
    }
  }, [params.token, router]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Email Verification
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {status === 'loading' && (
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-center">Verifying your email...</p>
            </div>
          )}

          {status === 'success' && (
            <Alert variant="default" className="bg-green-50 border-green-200">
              <AlertDescription>
                <div className="space-y-2">
                  <p className="font-medium text-green-800">{message}</p>
                  <p className="text-sm text-green-600">
                    Redirecting to login page...
                  </p>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {status === 'error' && (
            <Alert variant="destructive">
              <AlertDescription>
                <div className="space-y-4">
                  <p>{message}</p>
                  <p className="text-sm">
                    Please try again or contact support if the problem persists.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => router.push('/login')}
                    className="w-full"
                  >
                    Go to Login
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 