import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Lock, Mail } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-500">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Settings</h2>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <div className="grid gap-6">
        {/* Profile Section */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
               <User className="h-5 w-5 text-primary" />
               <CardTitle>Profile Information</CardTitle>
            </div>
            <CardDescription>Update your account profile details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                 <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                 <Input id="name" defaultValue="Parking Staff" className="pl-9" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                 <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                 <Input id="email" defaultValue="user@soulparking.co.id" className="pl-9" />
              </div>
            </div>
            <div className="flex justify-end">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-md shadow-orange-500/20">
                    Save Changes
                </Button>
            </div>
          </CardContent>
        </Card>

        {/* Security Section */}
        <Card className="border-none shadow-sm">
           <CardHeader>
            <div className="flex items-center gap-2">
               <Lock className="h-5 w-5 text-primary" />
               <CardTitle>Security</CardTitle>
            </div>
            <CardDescription>Manage your password and security preferences.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="grid gap-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
             <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input id="confirm-password" type="password" />
            </div>
             <div className="flex justify-end">
                <Button variant="outline" className="text-secondary border-secondary hover:bg-secondary/10">
                    Update Password
                </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
