
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/auth/login");
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "UC";
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">Emploi Connecté</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Avatar className="h-10 w-10 border-2 border-indigo-500">
                <AvatarImage src={currentUser?.photoURL || ""} alt="Profile" />
                <AvatarFallback>
                  {getInitials(currentUser?.displayName)}
                </AvatarFallback>
              </Avatar>
              <span className="ml-2 text-gray-700">{currentUser?.displayName || currentUser?.email}</span>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              Log out
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left sidebar */}
          <div className="col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Your personal information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center mb-6">
                  <Avatar className="h-24 w-24 border-2 border-indigo-500">
                    <AvatarImage src={currentUser?.photoURL || ""} alt="Profile" />
                    <AvatarFallback>
                      {getInitials(currentUser?.displayName)}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="mt-4 text-xl font-semibold">{currentUser?.displayName || "User"}</h2>
                  <p className="text-gray-500">{currentUser?.email}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Email</span>
                    <span className="font-medium">{currentUser?.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Account type</span>
                    <span className="font-medium">Job Seeker</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Member since</span>
                    <span className="font-medium">
                      {currentUser?.metadata.creationTime 
                        ? new Date(currentUser.metadata.creationTime).toLocaleDateString() 
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline">Edit Profile</Button>
              </CardFooter>
            </Card>
          </div>

          {/* Main content */}
          <div className="col-span-1 md:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Welcome back!</CardTitle>
                <CardDescription>
                  Here's what's happening with your job search
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                    <h3 className="font-medium text-blue-700">Applications</h3>
                    <p className="text-3xl font-bold mt-2">0</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                    <h3 className="font-medium text-green-700">Interviews</h3>
                    <p className="text-3xl font-bold mt-2">0</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                    <h3 className="font-medium text-purple-700">Saved Jobs</h3>
                    <p className="text-3xl font-bold mt-2">0</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Tabs defaultValue="jobs">
                  <TabsList>
                    <TabsTrigger value="jobs">Available Jobs</TabsTrigger>
                    <TabsTrigger value="applications">My Applications</TabsTrigger>
                    <TabsTrigger value="saved">Saved Jobs</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent>
                <TabsContent value="jobs" className="space-y-4">
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium text-gray-500 mb-2">No job listings available</h3>
                    <p className="text-gray-400">Job listings will appear here as they become available</p>
                  </div>
                </TabsContent>
                <TabsContent value="applications" className="space-y-4">
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium text-gray-500 mb-2">No applications yet</h3>
                    <p className="text-gray-400">Your job applications will appear here</p>
                  </div>
                </TabsContent>
                <TabsContent value="saved" className="space-y-4">
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium text-gray-500 mb-2">No saved jobs</h3>
                    <p className="text-gray-400">Jobs you save will appear here</p>
                  </div>
                </TabsContent>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
