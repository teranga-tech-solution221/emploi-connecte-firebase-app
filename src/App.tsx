
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

// Pages
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import LoadingAnimation from "./pages/LoadingAnimation";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
import Applications from "./pages/Applications";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Page d'accueil - accessible à tous, mais redirige vers le dashboard si connecté */}
            <Route path="/" element={<Index />} />
            
            {/* Routes d'authentification - accessibles seulement si non connecté */}
            <Route 
              path="/auth/login" 
              element={
                <ProtectedRoute redirectIfAuthenticated to="/loading-animation">
                  <Login />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/auth/register" 
              element={
                <ProtectedRoute redirectIfAuthenticated to="/loading-animation">
                  <Register />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/auth/forgot-password" 
              element={
                <ProtectedRoute redirectIfAuthenticated>
                  <ForgotPassword />
                </ProtectedRoute>
              } 
            />
            
            {/* Page d'animation après connexion */}
            <Route 
              path="/loading-animation" 
              element={
                <ProtectedRoute>
                  <LoadingAnimation />
                </ProtectedRoute>
              } 
            />
            
            {/* Routes protégées - accessibles seulement si connecté */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
            <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
            <Route path="/applications" element={<ProtectedRoute><Applications /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            
            {/* Route 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
