import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Eye, EyeOff } from "lucide-react"

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
})

import { useAuth } from "@/contexts/AuthContext"
import { toast } from "sonner"

export default function LoginPage() {
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const isAdmin = values.email === "admin@soulparking.co.id" && values.password === "admin123";
    const isUser = values.email === "user@soulparking.co.id" && values.password === "password";

    if (isAdmin || isUser) {
        login(values.email)
    } else {
        toast.error("Invalid credentials. Please try again.")
    }
  }

  function onError(errors: any) {
    if (errors.email) {
        toast.error(errors.email.message)
    }
    if (errors.password) {
        toast.error(errors.password.message)
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50/50 p-4">
        <Card className="w-full max-w-[400px] border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-3xl p-2 sm:p-6">
            <CardHeader className="flex flex-col items-center space-y-4 pb-2">
                {/* Logo */}
                {/* Logo Placeholder */}
                <div className="h-16 w-16 mb-2 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                    <span className="text-white font-bold text-2xl">SP</span>
                </div>
                
                <div className="text-center space-y-1.5">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Sign In</h1>
                    <p className="text-sm text-gray-500">
                        Enter your credentials to access your dashboard.
                    </p>
                </div>
                
                {/* Demo Credentials */}
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-xl w-full">
                    <p className="text-xs font-semibold text-blue-900 mb-1">Demo Credentials:</p>
                    <div className="space-y-1">
                        <p className="text-[10px] text-blue-700">Admin: <span className="font-mono font-semibold">admin@soulparking.co.id</span> / <span className="font-mono font-semibold">admin123</span></p>
                        <p className="text-[10px] text-blue-700">Users: <span className="font-mono font-semibold">user@soulparking.co.id</span> / <span className="font-mono font-semibold">password</span></p>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pt-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-5">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-gray-700">Email</FormLabel>
                            <FormControl>
                            <Input 
                                placeholder="name@example.com" 
                                {...field} 
                                className="bg-gray-50 border-gray-200 focus:bg-white transition-all duration-200 h-10 rounded-xl"
                            />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-gray-700">Password</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input 
                                        type={showPassword ? "text" : "password"} 
                                        placeholder="••••••••" 
                                        {...field} 
                                        className="bg-gray-50 border-gray-200 focus:bg-white transition-all duration-200 h-10 rounded-xl pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <Button 
                        type="submit" 
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold h-11 rounded-xl shadow-lg shadow-orange-500/10 transition-all hover:scale-[1.01]"
                    >
                        Sign In
                    </Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="flex justify-center pb-2">
                <p className="text-sm text-gray-500">
                    Don't have an account?{" "}
                    <Link to="/register" className="font-semibold text-primary hover:underline">
                        Register
                    </Link>
                </p>
            </CardFooter>
        </Card>
    </div>
  )
}
