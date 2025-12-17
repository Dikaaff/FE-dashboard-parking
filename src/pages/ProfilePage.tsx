import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-500">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Profile</h2>
        <p className="text-muted-foreground">View and manage your personal information.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        {/* Main Profile Card */}
        <Card className="md:col-span-2 border-none shadow-sm h-fit">
            <CardHeader className="flex flex-col items-center text-center pb-2">
                <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-3xl mb-4 relative overflow-hidden">
                    US
                    {/* <AvatarImage src="/path-to-image.jpg" /> */}
                </div>
                <CardTitle className="text-xl">User</CardTitle>
                <CardDescription>Parking Operator</CardDescription>
                <Badge variant="secondary" className="mt-2 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-0">
                    Active Status
                </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid gap-1">
                    <p className="text-sm font-medium text-muted-foreground">Role</p>
                    <p className="text-sm">Operator</p>
                </div>
                <div className="grid gap-1">
                    <p className="text-sm font-medium text-muted-foreground">Joined Date</p>
                    <p className="text-sm">January 15, 2023</p>
                </div>
                <div className="grid gap-1">
                    <p className="text-sm font-medium text-muted-foreground">Department</p>
                    <p className="text-sm">Operations</p>
                </div>
            </CardContent>
        </Card>

        {/* Details Section */}
        <div className="md:col-span-5 space-y-6">
            <Card className="border-none shadow-sm">
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details here.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" defaultValue="Active" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" defaultValue="User" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" defaultValue="user@soulparking.co.id" disabled />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" defaultValue="+62 812 3456 7890" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="address">Address</Label>
                            <Input id="address" defaultValue="Jakarta, Indonesia" />
                        </div>
                    </div>
                    <div className="flex justify-end pt-4">
                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Save Changes</Button>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your latest actions in the dashboard.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                                <div className="h-8 w-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0 mt-0.5">
                                    <Calendar className="h-4 w-4" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium">Generated Monthly Report</p>
                                    <p className="text-xs text-muted-foreground">Today, 10:23 AM</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  )
}
