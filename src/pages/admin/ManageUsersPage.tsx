import { useState } from 'react'
import { 
  Users, 
  UserPlus, 
  Search, 
  Edit2, 
  Trash2, 
  Shield,
  Filter,
  X,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { toast } from 'sonner'

interface UserData {
  id: string
  name: string
  email: string
  role: 'admin' | 'staff'
  assignedLocations: string[]
  status: 'active' | 'inactive'
  lastActive: string
}

const INITIAL_USERS: UserData[] = [
  {
    id: '1',
    name: 'Ahmad Staff',
    email: 'ahmad@soulparking.co.id',
    role: 'staff',
    assignedLocations: ['Yogyakarta', 'Surakarta'],
    status: 'active',
    lastActive: '2 mins ago'
  },
  {
    id: '2',
    name: 'Budi Bandung',
    email: 'budi@soulparking.co.id',
    role: 'staff',
    assignedLocations: ['Bandung'],
    status: 'active',
    lastActive: '1 hour ago'
  },
  {
    id: '3',
    name: 'Cici Jakarta',
    email: 'cici@soulparking.co.id',
    role: 'staff',
    assignedLocations: ['Jakarta Selatan'],
    status: 'active',
    lastActive: '5 hours ago'
  },
  {
    id: '4',
    name: 'Dedi Admin',
    email: 'admin@soulparking.co.id',
    role: 'admin',
    assignedLocations: ['All Locations'],
    status: 'active',
    lastActive: 'Just now'
  },
]

export default function ManageUsersPage() {
  const [users, setUsers] = useState<UserData[]>(INITIAL_USERS)
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<UserData | null>(null)
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter(u => u.id !== id))
    toast.error("User deleted successfully")
  }

  const handleAddUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newUser: UserData = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        role: formData.get('role') as any,
        assignedLocations: (formData.get('locations') as string).split(','),
        status: 'active',
        lastActive: 'Just now'
    }
    setUsers([...users, newUser])
    setIsAddModalOpen(false)
    toast.success("User added successfully")
  }

  const handleEditUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editingUser) return
    const formData = new FormData(e.currentTarget)
    const updatedUser: UserData = {
        ...editingUser,
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        role: formData.get('role') as any,
    }
    setUsers(users.map(u => u.id === editingUser.id ? updatedUser : u))
    setEditingUser(null)
    toast.success("User updated successfully")
  }

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">User Management</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage parking staff accounts and their assigned locations.</p>
        </div>
        <Button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all flex items-center gap-2 h-12 px-6"
        >
          <UserPlus size={18} />
          <span className="font-bold">Add New User</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-primary/5 border-none shadow-sm rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold text-primary uppercase">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-slate-900">{users.length}</div>
            <div className="flex items-center gap-1.5 mt-2">
               <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 border-none font-bold">+12% from last month</Badge>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-secondary/5 border-none shadow-sm rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold text-secondary uppercase">Active Staff</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-slate-900">42</div>
            <p className="text-[11px] text-muted-foreground font-medium mt-2">Currently logged in</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-50 border-none shadow-sm rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold text-gray-400 uppercase">System Nodes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-slate-900">24</div>
            <p className="text-[11px] text-muted-foreground font-medium mt-2">Online Gateways</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-xl shadow-gray-200/50 rounded-3xl overflow-hidden bg-white">
        <CardHeader className="border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4 py-8 px-8">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <Input 
              placeholder="Search users..." 
              className="pl-12 h-12 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
             <Button variant="outline" className="rounded-2xl border-gray-100 h-12 px-5 flex items-center gap-2 font-bold text-gray-600 hover:bg-gray-50">
               <Filter size={18} />
               <span>Filters</span>
             </Button>
          </div>
        </CardHeader>
        <div className="overflow-x-scroll scrollbar-primary pb-6">
          <table className="w-full text-left min-w-[800px]">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-50">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">User Details</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Role</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Assignments</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-primary/[0.02] transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black text-lg">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-base leading-tight">{user.name}</div>
                        <div className="text-xs text-muted-foreground font-medium">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <Badge className={cn(
                      "rounded-xl px-3 py-1 font-bold text-[11px] border-none",
                      user.role === 'admin' ? "bg-secondary text-white" : "bg-primary/10 text-primary"
                    )}>
                      {user.role === 'admin' ? <Shield size={12} className="mr-1.5 inline" /> : <Users size={12} className="mr-1.5 inline" />}
                      {user.role}
                    </Badge>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-wrap gap-1.5">
                      {user.assignedLocations.map(loc => (
                        <Badge key={loc} variant="outline" className="bg-transparent text-secondary border-gray-200 text-[10px] font-bold rounded-lg px-2 py-0.5">
                          {loc}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <div className={cn("h-2 w-2 rounded-full", user.status === 'active' ? "bg-emerald-500 animate-pulse" : "bg-gray-300")} />
                      <span className="text-sm font-bold text-secondary capitalize">{user.status}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => setEditingUser(user)}
                            className="h-10 w-10 rounded-xl text-secondary hover:bg-secondary/5"
                        >
                            <Edit2 size={18} />
                        </Button>
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDeleteUser(user.id)}
                            className="h-10 w-10 rounded-xl text-red-500 hover:bg-red-50"
                        >
                            <Trash2 size={18} />
                        </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add User Modal */}
      {isAddModalOpen && (
          <div className="fixed inset-0 bg-secondary/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
              <Card className="w-full max-w-md border-none shadow-2xl rounded-3xl overflow-hidden animate-in zoom-in duration-300">
                  <CardHeader className="bg-primary text-white py-6">
                      <div className="flex justify-between items-center">
                          <CardTitle className="text-xl font-black tracking-tight">Add New Member</CardTitle>
                          <Button variant="ghost" size="icon" onClick={() => setIsAddModalOpen(false)} className="text-white hover:bg-white/20 rounded-full h-8 w-8 p-0">
                                <X size={20} />
                          </Button>
                      </div>
                  </CardHeader>
                  <CardContent className="p-8">
                      <form onSubmit={handleAddUser} className="space-y-6">
                          <div className="space-y-2">
                              <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Full Name</label>
                              <Input name="name" required placeholder="Enter full name" className="h-12 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-primary/20" />
                          </div>
                          <div className="space-y-2">
                              <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Email Address</label>
                              <Input name="email" type="email" required placeholder="staff@soulparking.co.id" className="h-12 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-primary/20" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Role</label>
                                  <select name="role" className="w-full h-12 rounded-2xl bg-gray-50 border-none px-4 text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none">
                                      <option value="staff">Staff</option>
                                      <option value="admin">Admin</option>
                                  </select>
                              </div>
                              <div className="space-y-2">
                                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Locations</label>
                                  <Input name="locations" required placeholder="Jakarta, Bandung" className="h-12 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-primary/20" />
                              </div>
                          </div>
                          <Button type="submit" className="w-full h-14 bg-secondary text-white rounded-2xl font-black text-lg shadow-xl shadow-secondary/10 hover:shadow-secondary/20 transition-all mt-4">
                              Create Account
                          </Button>
                      </form>
                  </CardContent>
              </Card>
          </div>
      )}

      {/* Edit User Modal */}
      {editingUser && (
          <div className="fixed inset-0 bg-secondary/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
              <Card className="w-full max-w-md border-none shadow-2xl rounded-3xl overflow-hidden animate-in zoom-in duration-300">
                  <CardHeader className="bg-secondary text-white py-6">
                      <div className="flex justify-between items-center">
                          <CardTitle className="text-xl font-black tracking-tight">Edit Details</CardTitle>
                          <Button variant="ghost" size="icon" onClick={() => setEditingUser(null)} className="text-white hover:bg-white/20 rounded-full h-8 w-8 p-0">
                                <X size={20} />
                          </Button>
                      </div>
                  </CardHeader>
                  <CardContent className="p-8">
                      <form onSubmit={handleEditUser} className="space-y-6">
                          <div className="space-y-2">
                              <label className="text-xs font-black text-secondary uppercase tracking-widest">Full Name</label>
                              <Input name="name" defaultValue={editingUser.name} required className="h-12 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-secondary/20 font-bold" />
                          </div>
                          <div className="space-y-2">
                              <label className="text-xs font-black text-secondary uppercase tracking-widest">Email Address</label>
                              <Input name="email" defaultValue={editingUser.email} type="email" required className="h-12 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-secondary/20 font-bold" />
                          </div>
                          <div className="space-y-2">
                                <label className="text-xs font-black text-secondary uppercase tracking-widest">Role</label>
                                <select name="role" defaultValue={editingUser.role} className="w-full h-12 rounded-2xl bg-gray-50 border-none px-4 text-sm font-bold focus:ring-2 focus:ring-secondary/20 outline-none">
                                    <option value="staff">Staff</option>
                                    <option value="admin">Admin</option>
                                </select>
                          </div>
                          <Button type="submit" className="w-full h-14 bg-primary text-white rounded-2xl font-black text-lg shadow-xl shadow-primary/10 hover:shadow-primary/20 transition-all mt-4">
                              Save Changes
                          </Button>
                      </form>
                  </CardContent>
              </Card>
          </div>
      )}
    </div>
  )
}

