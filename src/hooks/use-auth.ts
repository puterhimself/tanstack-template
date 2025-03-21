import { useState, useEffect } from 'react';
import { useToast } from '~/components/ui/use-toast';
import { trpc } from '~/lib/trpc/client';

interface User {
  id: string;
  name?: string | null;
  email: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();
  
  // tRPC mutations
  const registerMutation = trpc.auth.register.useMutation();
  const loginMutation = trpc.auth.login.useMutation();
  const logoutMutation = trpc.auth.logout.useMutation();
  
  // Initialize auth state from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedSessionId = localStorage.getItem('sessionId');
    
    if (storedUser && storedSessionId) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse user from localStorage', error);
      }
    }
    
    setLoading(false);
  }, []);

  // Register a new user
  const register = async (name: string, email: string, password: string, confirmPassword: string) => {
    try {
      const result = await registerMutation.mutateAsync({
        name,
        email,
        password,
        confirmPassword,
      });

      if (result.success) {
        toast({
          title: "Registration successful",
          description: "You can now log in with your credentials",
        });
        return true;
      }
      return false;
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Registration failed",
          description: error.message,
          variant: "destructive",
        });
      }
      return false;
    }
  };

  // Login a user
  const login = async (email: string, password: string) => {
    try {
      const result = await loginMutation.mutateAsync({
        email,
        password,
      });

      if (result.success && result.user && result.sessionId) {
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('sessionId', result.sessionId);
        setUser(result.user);
        toast({
          title: "Login successful",
          description: `Welcome back, ${result.user.name || 'User'}!`,
        });
        return true;
      }
      return false;
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive",
        });
      }
      return false;
    }
  };

  // Logout a user
  const logout = async () => {
    const sessionId = localStorage.getItem('sessionId');
    if (!sessionId) {
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('sessionId');
      return true;
    }

    try {
      const result = await logoutMutation.mutateAsync({
        sessionId,
      });

      if (result.success) {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('sessionId');
        toast({
          title: "Logout successful",
          description: "You have been logged out",
        });
        return true;
      }
      return false;
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Logout failed",
          description: error.message,
          variant: "destructive",
        });
      }
      return false;
    }
  };

  return {
    user,
    loading,
    register,
    login,
    logout,
    isAuthenticated: !!user,
  };
} 