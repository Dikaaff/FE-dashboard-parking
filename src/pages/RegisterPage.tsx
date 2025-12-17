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
import { useNavigate, Link } from "react-router-dom"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Eye, EyeOff } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
})

export default function RegisterPage() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    // Mock register
    navigate("/dashboard")
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50/50 p-4">
        <Card className="w-full max-w-[400px] border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-3xl p-2 sm:p-6">
            <CardHeader className="flex flex-col items-center space-y-4 pb-2">
                {/* Logo */}
                <div className="h-16 w-16 mb-2">
                    <img 
                        src="/src/assets/logo.png" 
                        alt="Logo" 
                        className="h-full w-full object-contain"
                    />
                </div>
                
                <div className="text-center space-y-1.5">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Sign Up</h1>
                    <p className="text-sm text-gray-500">
                        Create a new account to access the dashboard.
                    </p>
                </div>
            </CardHeader>
            <CardContent className="pt-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-gray-700">Full Name</FormLabel>
                            <FormControl>
                            <Input 
                                placeholder="John Doe" 
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
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold h-11 rounded-xl shadow-lg shadow-orange-500/10 transition-all hover:scale-[1.01] mt-2"
                    >
                        Sign Up
                    </Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="flex justify-center pb-2">
                <p className="text-sm text-gray-500">
                    Already have an account?{" "}
                    <Link to="/login" className="font-semibold text-primary hover:underline">
                        Login
                    </Link>
                </p>
            </CardFooter>
        </Card>
    </div>
  )
}
