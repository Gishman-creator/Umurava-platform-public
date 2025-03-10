'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Mail } from "lucide-react";

export default function UnverifiedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Email Verification Required
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <Mail className="h-4 w-4" />
            <AlertDescription>
              <p>We've sent a verification email to your inbox. Please check your email and click the verification link to activate your account.</p>
            </AlertDescription>
          </Alert>

          <div className="space-y-2 text-center">
            <p className="text-sm text-gray-600">
              Once verified, you can proceed to login.
            </p>
            <Button
              variant="outline"
              onClick={() => router.push('/login')}
            >
              Go to Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 