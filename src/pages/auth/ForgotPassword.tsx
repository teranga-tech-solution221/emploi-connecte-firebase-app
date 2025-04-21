
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, ArrowLeft } from "lucide-react";

const ForgotPassword = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter your email address",
      });
      return;
    }

    try {
      setLoading(true);
      // In a real implementation, you would call firebase.auth().sendPasswordResetEmail(email)
      
      // For now, we just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitted(true);
      toast({
        title: "Email sent",
        description: "Check your email for password reset instructions",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
        <div className="w-full max-w-md">
          <Card className="w-full shadow-xl">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Check your email</CardTitle>
              <CardDescription className="text-center">
                We've sent you password reset instructions
              </CardDescription>
            </CardHeader>
            
            <CardContent className="flex flex-col items-center py-8">
              <div className="bg-blue-50 p-6 rounded-full mb-6">
                <Mail className="h-12 w-12 text-indigo-600" />
              </div>
              <p className="text-center text-gray-600 mb-6">
                We've sent an email to <strong>{email}</strong> with instructions to reset your password.
              </p>
              <p className="text-center text-gray-500 text-sm">
                If you don't see the email, check your spam folder.
              </p>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setSubmitted(false)}
              >
                Try again with a different email
              </Button>
              <div className="text-center text-sm">
                <Link to="/auth/login" className="text-indigo-600 hover:underline font-medium flex items-center justify-center">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to login
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-600">Emploi Connecté</h1>
          <p className="text-slate-600 mt-2">Reset your password</p>
        </div>
        
        <Card className="w-full shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Forgot your password?</CardTitle>
            <CardDescription className="text-center">
              Enter your email address and we'll send you a link to reset your password
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-indigo-600 hover:bg-indigo-700" 
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center">
                    <span className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-white rounded-full" />
                    Sending email...
                  </div>
                ) : (
                  "Send reset link"
                )}
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="flex justify-center">
            <Link to="/auth/login" className="text-indigo-600 hover:underline font-medium flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to login
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
