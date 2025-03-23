
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
  Users, UserCircle, Shield, Plus, Download, Pencil, Trash2, Mail, 
  Phone, Search, CheckCircle, XCircle, ShieldCheck, ShieldAlert, LucideIcon
} from 'lucide-react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

type Permission = {
  id: string;
  name: string;
  description: string;
  category: 'products' | 'vendors' | 'orders' | 'analytics' | 'marketing' | 'blog' | 'settings';
};

type Role = {
  id: number;
  name: string;
  description: string;
  permissions: string[];
  employeeCount: number;
};

type Employee = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: string;
  status: 'active' | 'inactive';
  avatar?: string;
  joinDate: string;
  lastActive?: string;
  notes?: string;
};

// Sample permissions data
const permissions: Permission[] = [
  { id: 'products_view', name: 'View Products', description: 'Can view product listings', category: 'products' },
  { id: 'products_create', name: 'Create Products', description: 'Can create new products', category: 'products' },
  { id: 'products_edit', name: 'Edit Products', description: 'Can edit existing products', category: 'products' },
  { id: 'products_delete', name: 'Delete Products', description: 'Can delete products', category: 'products' },
  
  { id: 'vendors_view', name: 'View Vendors', description: 'Can view vendor profiles', category: 'vendors' },
  { id: 'vendors_create', name: 'Create Vendors', description: 'Can create new vendor profiles', category: 'vendors' },
  { id: 'vendors_edit', name: 'Edit Vendors', description: 'Can edit vendor profiles', category: 'vendors' },
  { id: 'vendors_approve', name: 'Approve Vendors', description: 'Can approve vendor applications', category: 'vendors' },
  
  { id: 'orders_view', name: 'View Orders', description: 'Can view customer orders', category: 'orders' },
  { id: 'orders_manage', name: 'Manage Orders', description: 'Can manage order status and processing', category: 'orders' },
  { id: 'orders_refund', name: 'Process Refunds', description: 'Can process order refunds', category: 'orders' },
  
  { id: 'analytics_view', name: 'View Analytics', description: 'Can view analytics data', category: 'analytics' },
  { id: 'analytics_export', name: 'Export Analytics', description: 'Can export analytics reports', category: 'analytics' },
  
  { id: 'marketing_campaigns', name: 'Manage Campaigns', description: 'Can create and manage marketing campaigns', category: 'marketing' },
  { id: 'marketing_promos', name: 'Manage Promotions', description: 'Can create and manage promotional offers', category: 'marketing' },
  
  { id: 'blog_view', name: 'View Blog Posts', description: 'Can view blog content', category: 'blog' },
  { id: 'blog_create', name: 'Create Blog Posts', description: 'Can create new blog posts', category: 'blog' },
  { id: 'blog_edit', name: 'Edit Blog Posts', description: 'Can edit existing blog posts', category: 'blog' },
  { id: 'blog_publish', name: 'Publish Blog Posts', description: 'Can publish or unpublish blog posts', category: 'blog' },
  
  { id: 'settings_view', name: 'View Settings', description: 'Can view system settings', category: 'settings' },
  { id: 'settings_edit', name: 'Edit Settings', description: 'Can modify system settings', category: 'settings' },
  { id: 'settings_roles', name: 'Manage Roles', description: 'Can create and manage role permissions', category: 'settings' },
];

// Sample roles data
const initialRoles: Role[] = [
  {
    id: 1,
    name: 'Administrator',
    description: 'Full access to all system features',
    permissions: permissions.map(p => p.id),
    employeeCount: 2
  },
  {
    id: 2,
    name: 'Product Manager',
    description: 'Manages product catalog and inventory',
    permissions: [
      'products_view', 'products_create', 'products_edit', 'products_delete',
      'analytics_view'
    ],
    employeeCount: 3
  },
  {
    id: 3,
    name: 'Vendor Manager',
    description: 'Manages vendor relationships and onboarding',
    permissions: [
      'vendors_view', 'vendors_create', 'vendors_edit', 'vendors_approve',
      'analytics_view'
    ],
    employeeCount: 2
  },
  {
    id: 4,
    name: 'Order Processor',
    description: 'Handles order processing and customer service',
    permissions: [
      'orders_view', 'orders_manage',
      'products_view'
    ],
    employeeCount: 4
  },
  {
    id: 5,
    name: 'Marketing Specialist',
    description: 'Manages marketing campaigns and blog content',
    permissions: [
      'marketing_campaigns', 'marketing_promos',
      'blog_view', 'blog_create', 'blog_edit', 'blog_publish',
      'products_view', 'analytics_view'
    ],
    employeeCount: 2
  }
];

// Sample employees data
const initialEmployees: Employee[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '(555) 123-4567',
    role: 'Administrator',
    status: 'active',
    joinDate: '2023-01-15',
    lastActive: '2024-06-10 09:45 AM'
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    phone: '(555) 987-6543',
    role: 'Product Manager',
    status: 'active',
    joinDate: '2023-03-22',
    lastActive: '2024-06-10 08:30 AM'
  },
  {
    id: 3,
    name: 'Jessica Smith',
    email: 'jessica.smith@example.com',
    phone: '(555) 456-7890',
    role: 'Marketing Specialist',
    status: 'active',
    joinDate: '2023-05-10',
    lastActive: '2024-06-09 04:15 PM'
  },
  {
    id: 4,
    name: 'David Wilson',
    email: 'david.wilson@example.com',
    phone: '(555) 234-5678',
    role: 'Order Processor',
    status: 'active',
    joinDate: '2023-02-28',
    lastActive: '2024-06-10 11:20 AM'
  },
  {
    id: 5,
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@example.com',
    phone: '(555) 876-5432',
    role: 'Vendor Manager',
    status: 'active',
    joinDate: '2023-04-15',
    lastActive: '2024-06-10 10:05 AM'
  },
  {
    id: 6,
    name: 'Robert Taylor',
    email: 'robert.taylor@example.com',
    phone: '(555) 345-6789',
    role: 'Administrator',
    status: 'inactive',
    joinDate: '2023-01-05',
    lastActive: '2024-05-20 03:45 PM',
    notes: 'On extended leave until July 2024'
  },
  {
    id: 7,
    name: 'Amanda Brown',
    email: 'amanda.brown@example.com',
    phone: '(555) 567-8901',
    role: 'Order Processor',
    status: 'active',
    joinDate: '2023-06-20',
    lastActive: '2024-06-09 05:30 PM'
  }
];

const EmployeeManagement = () => {
  const { toast } = useToast();
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Dialog state
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);
  const [isEditEmployeeOpen, setIsEditEmployeeOpen] = useState(false);
  const [isAddRoleOpen, setIsAddRoleOpen] = useState(false);
  const [isEditRoleOpen, setIsEditRoleOpen] = useState(false);
  const [isViewPermissionsOpen, setIsViewPermissionsOpen] = useState(false);
  
  // Current items for editing
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);
  const [currentRole, setCurrentRole] = useState<Role | null>(null);
  
  // New employee form state
  const [newEmployee, setNewEmployee] = useState<Omit<Employee, 'id'>>({
    name: '',
    email: '',
    phone: '',
    role: '',
    status: 'active',
    joinDate: new Date().toISOString().split('T')[0]
  });
  
  // New role form state
  const [newRole, setNewRole] = useState<Omit<Role, 'id' | 'employeeCount'>>({
    name: '',
    description: '',
    permissions: []
  });

  const handleExportEmployees = () => {
    toast({
      title: "Export Started",
      description: "Employee data is being exported as an Excel file.",
    });
    
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Employee data has been exported successfully.",
      });
    }, 1500);
  };

  const handleAddEmployee = () => {
    const id = Math.max(0, ...employees.map(e => e.id)) + 1;
    
    const employee: Employee = {
      id,
      ...newEmployee
    };
    
    setEmployees([...employees, employee]);
    setIsAddEmployeeOpen(false);
    setNewEmployee({
      name: '',
      email: '',
      phone: '',
      role: '',
      status: 'active',
      joinDate: new Date().toISOString().split('T')[0]
    });
    
    toast({
      title: "Employee Added",
      description: `${employee.name} has been added successfully.`,
    });
  };

  const handleUpdateEmployee = () => {
    if (!currentEmployee) return;
    
    setEmployees(employees.map(emp => 
      emp.id === currentEmployee.id ? currentEmployee : emp
    ));
    
    setIsEditEmployeeOpen(false);
    
    toast({
      title: "Employee Updated",
      description: `${currentEmployee.name}'s information has been updated.`,
    });
  };

  const handleDeleteEmployee = (id: number) => {
    const employeeToDelete = employees.find(e => e.id === id);
    if (!employeeToDelete) return;
    
    setEmployees(employees.filter(e => e.id !== id));
    
    toast({
      title: "Employee Removed",
      description: `${employeeToDelete.name} has been removed.`,
      variant: "destructive",
    });
  };

  const handleAddRole = () => {
    const id = Math.max(0, ...roles.map(r => r.id)) + 1;
    
    const role: Role = {
      id,
      ...newRole,
      employeeCount: 0
    };
    
    setRoles([...roles, role]);
    setIsAddRoleOpen(false);
    setNewRole({
      name: '',
      description: '',
      permissions: []
    });
    
    toast({
      title: "Role Created",
      description: `${role.name} role has been created successfully.`,
    });
  };

  const handleUpdateRole = () => {
    if (!currentRole) return;
    
    setRoles(roles.map(role => 
      role.id === currentRole.id ? currentRole : role
    ));
    
    setIsEditRoleOpen(false);
    
    toast({
      title: "Role Updated",
      description: `${currentRole.name} role has been updated.`,
    });
  };

  const handleDeleteRole = (id: number) => {
    const roleToDelete = roles.find(r => r.id === id);
    if (!roleToDelete) return;
    
    // Check if any employees are using this role
    const employeesWithRole = employees.filter(e => e.role === roleToDelete.name);
    
    if (employeesWithRole.length > 0) {
      toast({
        title: "Cannot Delete Role",
        description: `This role is assigned to ${employeesWithRole.length} employees. Reassign them first.`,
        variant: "destructive",
      });
      return;
    }
    
    setRoles(roles.filter(r => r.id !== id));
    
    toast({
      title: "Role Deleted",
      description: `${roleToDelete.name} role has been deleted.`,
      variant: "destructive",
    });
  };

  const togglePermission = (permissionId: string) => {
    if (!currentRole) return;
    
    const updatedPermissions = currentRole.permissions.includes(permissionId)
      ? currentRole.permissions.filter(id => id !== permissionId)
      : [...currentRole.permissions, permissionId];
    
    setCurrentRole({
      ...currentRole,
      permissions: updatedPermissions
    });
  };

  const filteredEmployees = employees.filter(employee => 
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Employee Management</h1>
          <p className="text-muted-foreground">
            Manage employees and their access permissions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            onClick={handleExportEmployees} 
            variant="outline" 
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export to Excel
          </Button>
          <Button 
            onClick={() => setIsAddEmployeeOpen(true)}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Employee
          </Button>
        </div>
      </div>

      <div className="flex items-center mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search employees..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="employees">
        <TabsList>
          <TabsTrigger value="employees" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Employees
          </TabsTrigger>
          <TabsTrigger value="roles" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Roles & Permissions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="employees" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Employee Directory ({filteredEmployees.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredEmployees.length === 0 ? (
                  <p className="text-center py-4 text-gray-500">No employees found.</p>
                ) : (
                  filteredEmployees.map((employee) => (
                    <div 
                      key={employee.id} 
                      className="flex items-center justify-between p-4 border rounded-lg bg-card"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <UserCircle className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{employee.name}</h3>
                            <Badge 
                              className={employee.status === 'active' 
                                ? "bg-green-100 text-green-800 hover:bg-green-100" 
                                : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                              }
                            >
                              {employee.status === 'active' ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <div className="flex items-center gap-4">
                              <span className="flex items-center gap-1">
                                <Mail className="h-3 w-3" />
                                {employee.email}
                              </span>
                              {employee.phone && (
                                <span className="flex items-center gap-1">
                                  <Phone className="h-3 w-3" />
                                  {employee.phone}
                                </span>
                              )}
                            </div>
                            <div className="mt-1">
                              <span className="mr-3">Role: {employee.role}</span>
                              <span>Joined: {employee.joinDate}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setCurrentEmployee(employee);
                            setIsEditEmployeeOpen(true);
                          }}
                        >
                          <Pencil className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDeleteEmployee(employee.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="mt-6">
          <div className="flex justify-end mb-4">
            <Button 
              onClick={() => setIsAddRoleOpen(true)}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Create Role
            </Button>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {roles.map((role) => (
              <Card key={role.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-full bg-primary/10">
                        {role.name.includes('Admin') ? (
                          <ShieldCheck className="h-6 w-6 text-primary" />
                        ) : (
                          <Shield className="h-6 w-6 text-primary" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{role.name}</h3>
                        <p className="text-sm text-muted-foreground">{role.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline">{role.employeeCount} Employees</Badge>
                          <Badge variant="outline">{role.permissions.length} Permissions</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setCurrentRole(role);
                          setIsViewPermissionsOpen(true);
                        }}
                      >
                        <Shield className="h-4 w-4 mr-2" />
                        Permissions
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setCurrentRole(role);
                          setIsEditRoleOpen(true);
                        }}
                      >
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleDeleteRole(role.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Employee Dialog */}
      <Dialog open={isAddEmployeeOpen} onOpenChange={setIsAddEmployeeOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Employee</DialogTitle>
            <DialogDescription>
              Create a new employee account with role assignment.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={(e) => {
            e.preventDefault();
            handleAddEmployee();
          }}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input
                  id="name"
                  value={newEmployee.name}
                  onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                  className="col-span-3"
                  required
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newEmployee.email}
                  onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                  className="col-span-3"
                  required
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">Phone</Label>
                <Input
                  id="phone"
                  value={newEmployee.phone}
                  onChange={(e) => setNewEmployee({...newEmployee, phone: e.target.value})}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">Role</Label>
                <Select
                  value={newEmployee.role}
                  onValueChange={(value) => setNewEmployee({...newEmployee, role: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.id} value={role.name}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">Status</Label>
                <Select
                  value={newEmployee.status}
                  onValueChange={(value) => setNewEmployee({
                    ...newEmployee, 
                    status: value as 'active' | 'inactive'
                  })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="joinDate" className="text-right">Join Date</Label>
                <Input
                  id="joinDate"
                  type="date"
                  value={newEmployee.joinDate}
                  onChange={(e) => setNewEmployee({...newEmployee, joinDate: e.target.value})}
                  className="col-span-3"
                  required
                />
              </div>
              
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="notes" className="text-right pt-2">Notes</Label>
                <Textarea
                  id="notes"
                  value={newEmployee.notes || ''}
                  onChange={(e) => setNewEmployee({...newEmployee, notes: e.target.value})}
                  className="col-span-3"
                  rows={3}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button
                type="button" 
                variant="outline" 
                onClick={() => setIsAddEmployeeOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                Add Employee
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Employee Dialog */}
      {currentEmployee && (
        <Dialog open={isEditEmployeeOpen} onOpenChange={setIsEditEmployeeOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Employee</DialogTitle>
              <DialogDescription>
                Update employee information and role assignment.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              handleUpdateEmployee();
            }}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-name" className="text-right">Name</Label>
                  <Input
                    id="edit-name"
                    value={currentEmployee.name}
                    onChange={(e) => setCurrentEmployee({...currentEmployee, name: e.target.value})}
                    className="col-span-3"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-email" className="text-right">Email</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={currentEmployee.email}
                    onChange={(e) => setCurrentEmployee({...currentEmployee, email: e.target.value})}
                    className="col-span-3"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-phone" className="text-right">Phone</Label>
                  <Input
                    id="edit-phone"
                    value={currentEmployee.phone || ''}
                    onChange={(e) => setCurrentEmployee({...currentEmployee, phone: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-role" className="text-right">Role</Label>
                  <Select
                    value={currentEmployee.role}
                    onValueChange={(value) => setCurrentEmployee({...currentEmployee, role: value})}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.id} value={role.name}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-status" className="text-right">Status</Label>
                  <Select
                    value={currentEmployee.status}
                    onValueChange={(value) => setCurrentEmployee({
                      ...currentEmployee, 
                      status: value as 'active' | 'inactive'
                    })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-joinDate" className="text-right">Join Date</Label>
                  <Input
                    id="edit-joinDate"
                    type="date"
                    value={currentEmployee.joinDate}
                    onChange={(e) => setCurrentEmployee({...currentEmployee, joinDate: e.target.value})}
                    className="col-span-3"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="edit-notes" className="text-right pt-2">Notes</Label>
                  <Textarea
                    id="edit-notes"
                    value={currentEmployee.notes || ''}
                    onChange={(e) => setCurrentEmployee({...currentEmployee, notes: e.target.value})}
                    className="col-span-3"
                    rows={3}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsEditEmployeeOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Save Changes
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* Add Role Dialog */}
      <Dialog open={isAddRoleOpen} onOpenChange={setIsAddRoleOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Role</DialogTitle>
            <DialogDescription>
              Define a new role and set its permissions.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={(e) => {
            e.preventDefault();
            handleAddRole();
          }}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role-name" className="text-right">Role Name</Label>
                <Input
                  id="role-name"
                  value={newRole.name}
                  onChange={(e) => setNewRole({...newRole, name: e.target.value})}
                  className="col-span-3"
                  required
                />
              </div>
              
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="role-desc" className="text-right pt-2">Description</Label>
                <Textarea
                  id="role-desc"
                  value={newRole.description}
                  onChange={(e) => setNewRole({...newRole, description: e.target.value})}
                  className="col-span-3"
                  rows={2}
                  required
                />
              </div>
              
              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right pt-2">Permissions</Label>
                <div className="col-span-3 border rounded-md p-4 space-y-4">
                  {['products', 'vendors', 'orders', 'analytics', 'marketing', 'blog', 'settings'].map((category) => {
                    const categoryPermissions = permissions.filter(p => p.category === category);
                    return (
                      <div key={category} className="space-y-2">
                        <h4 className="font-medium capitalize">{category}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {categoryPermissions.map(permission => (
                            <div key={permission.id} className="flex items-center space-x-2">
                              <Switch
                                id={`perm-${permission.id}`}
                                checked={newRole.permissions.includes(permission.id)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setNewRole({
                                      ...newRole,
                                      permissions: [...newRole.permissions, permission.id]
                                    });
                                  } else {
                                    setNewRole({
                                      ...newRole,
                                      permissions: newRole.permissions.filter(id => id !== permission.id)
                                    });
                                  }
                                }}
                              />
                              <Label htmlFor={`perm-${permission.id}`} className="text-sm cursor-pointer">
                                {permission.name}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button
                type="button" 
                variant="outline" 
                onClick={() => setIsAddRoleOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                Create Role
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Role Dialog */}
      {currentRole && (
        <Dialog open={isEditRoleOpen} onOpenChange={setIsEditRoleOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Role</DialogTitle>
              <DialogDescription>
                Update role details and permissions.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              handleUpdateRole();
            }}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-role-name" className="text-right">Role Name</Label>
                  <Input
                    id="edit-role-name"
                    value={currentRole.name}
                    onChange={(e) => setCurrentRole({...currentRole, name: e.target.value})}
                    className="col-span-3"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="edit-role-desc" className="text-right pt-2">Description</Label>
                  <Textarea
                    id="edit-role-desc"
                    value={currentRole.description}
                    onChange={(e) => setCurrentRole({...currentRole, description: e.target.value})}
                    className="col-span-3"
                    rows={2}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label className="text-right pt-2">Permissions</Label>
                  <div className="col-span-3 border rounded-md p-4 space-y-4">
                    {['products', 'vendors', 'orders', 'analytics', 'marketing', 'blog', 'settings'].map((category) => {
                      const categoryPermissions = permissions.filter(p => p.category === category);
                      return (
                        <div key={category} className="space-y-2">
                          <h4 className="font-medium capitalize">{category}</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {categoryPermissions.map(permission => (
                              <div key={permission.id} className="flex items-center space-x-2">
                                <Switch
                                  id={`edit-perm-${permission.id}`}
                                  checked={currentRole.permissions.includes(permission.id)}
                                  onCheckedChange={() => togglePermission(permission.id)}
                                />
                                <Label htmlFor={`edit-perm-${permission.id}`} className="text-sm cursor-pointer">
                                  {permission.name}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsEditRoleOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Save Changes
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* View Permissions Dialog */}
      {currentRole && (
        <Dialog open={isViewPermissionsOpen} onOpenChange={setIsViewPermissionsOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                {currentRole.name} Permissions
              </DialogTitle>
              <DialogDescription>
                Current permissions assigned to this role.
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              <div className="space-y-4">
                {['products', 'vendors', 'orders', 'analytics', 'marketing', 'blog', 'settings'].map((category) => {
                  const categoryPermissions = permissions.filter(p => 
                    p.category === category && currentRole.permissions.includes(p.id)
                  );
                  
                  if (categoryPermissions.length === 0) return null;
                  
                  return (
                    <div key={category} className="space-y-2">
                      <h4 className="font-medium capitalize">{category}</h4>
                      <div className="border rounded-md p-3 space-y-2">
                        {categoryPermissions.map(permission => (
                          <div key={permission.id} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <div>
                              <p className="text-sm font-medium">{permission.name}</p>
                              <p className="text-xs text-muted-foreground">{permission.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
                
                {currentRole.permissions.length === 0 && (
                  <div className="text-center py-4 text-muted-foreground">
                    No permissions assigned to this role.
                  </div>
                )}
              </div>
            </div>
            
            <DialogFooter>
              <Button
                onClick={() => {
                  setIsViewPermissionsOpen(false);
                  setCurrentRole(currentRole);
                  setIsEditRoleOpen(true);
                }}
              >
                Edit Permissions
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default EmployeeManagement;
