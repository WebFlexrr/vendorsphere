
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { User, Plus, Search, Edit, Trash2, Shield, Download, Users, Mail, UserPlus, Key } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Employee {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  status: 'active' | 'inactive';
  permissions: string[];
  lastActive: string;
}

interface Permission {
  id: string;
  name: string;
  description: string;
  module: string;
}

const mockEmployees: Employee[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    department: 'Management',
    status: 'active',
    permissions: ['all_access'],
    lastActive: '2023-05-15T13:45:00'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'Manager',
    department: 'Sales',
    status: 'active',
    permissions: ['products_read', 'products_write', 'orders_read', 'analytics_read'],
    lastActive: '2023-05-16T10:30:00'
  },
  {
    id: 3,
    name: 'Robert Johnson',
    email: 'robert.johnson@example.com',
    role: 'Editor',
    department: 'Content',
    status: 'active',
    permissions: ['blog_read', 'blog_write', 'marketing_read'],
    lastActive: '2023-05-14T15:20:00'
  },
  {
    id: 4,
    name: 'Emily Brown',
    email: 'emily.brown@example.com',
    role: 'Staff',
    department: 'Support',
    status: 'inactive',
    permissions: ['orders_read', 'customers_read'],
    lastActive: '2023-04-28T09:15:00'
  }
];

const availablePermissions: Permission[] = [
  { id: 'products_read', name: 'View Products', description: 'Can view product listings', module: 'Products' },
  { id: 'products_write', name: 'Manage Products', description: 'Can create, edit and delete products', module: 'Products' },
  { id: 'orders_read', name: 'View Orders', description: 'Can view customer orders', module: 'Orders' },
  { id: 'orders_write', name: 'Manage Orders', description: 'Can process and update orders', module: 'Orders' },
  { id: 'customers_read', name: 'View Customers', description: 'Can view customer information', module: 'Customers' },
  { id: 'customers_write', name: 'Manage Customers', description: 'Can edit customer information', module: 'Customers' },
  { id: 'analytics_read', name: 'View Analytics', description: 'Can view analytics and reports', module: 'Analytics' },
  { id: 'blog_read', name: 'View Blog', description: 'Can view blog posts', module: 'Blog' },
  { id: 'blog_write', name: 'Manage Blog', description: 'Can create, edit and delete blog posts', module: 'Blog' },
  { id: 'vendors_read', name: 'View Vendors', description: 'Can view vendor listings', module: 'Vendors' },
  { id: 'vendors_write', name: 'Manage Vendors', description: 'Can create, edit and delete vendors', module: 'Vendors' },
  { id: 'marketing_read', name: 'View Marketing', description: 'Can view marketing campaigns', module: 'Marketing' },
  { id: 'marketing_write', name: 'Manage Marketing', description: 'Can create and manage marketing campaigns', module: 'Marketing' },
  { id: 'settings_read', name: 'View Settings', description: 'Can view system settings', module: 'Settings' },
  { id: 'settings_write', name: 'Manage Settings', description: 'Can modify system settings', module: 'Settings' },
  { id: 'all_access', name: 'Full Access', description: 'Has access to all features', module: 'System' }
];

const availableRoles = [
  { id: 'admin', name: 'Admin' },
  { id: 'manager', name: 'Manager' },
  { id: 'editor', name: 'Editor' },
  { id: 'staff', name: 'Staff' }
];

const availableDepartments = [
  { id: 'management', name: 'Management' },
  { id: 'sales', name: 'Sales' },
  { id: 'marketing', name: 'Marketing' },
  { id: 'content', name: 'Content' },
  { id: 'support', name: 'Support' },
  { id: 'development', name: 'Development' },
  { id: 'design', name: 'Design' }
];

const EmployeeManagement = () => {
  const { toast } = useToast();
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);
  const [isEditEmployeeOpen, setIsEditEmployeeOpen] = useState(false);
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  
  const [newEmployee, setNewEmployee] = useState<Partial<Employee>>({
    name: '',
    email: '',
    role: '',
    department: '',
    status: 'active',
    permissions: []
  });

  const filteredEmployees = employees.filter(employee => 
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddEmployee = () => {
    const id = Math.max(...employees.map(e => e.id), 0) + 1;
    const currentDate = new Date().toISOString();
    
    const newEmployeeWithId: Employee = {
      ...newEmployee as Employee,
      id,
      lastActive: currentDate,
      permissions: selectedPermissions
    };
    
    setEmployees([...employees, newEmployeeWithId]);
    setNewEmployee({
      name: '',
      email: '',
      role: '',
      department: '',
      status: 'active',
      permissions: []
    });
    setSelectedPermissions([]);
    setIsAddEmployeeOpen(false);
    
    toast({
      title: "Employee Added",
      description: `${newEmployeeWithId.name} has been added successfully.`
    });
  };

  const handleEditEmployee = () => {
    if (!currentEmployee) return;
    
    const updatedEmployees = employees.map(emp => 
      emp.id === currentEmployee.id ? {...currentEmployee, permissions: selectedPermissions} : emp
    );
    
    setEmployees(updatedEmployees);
    setIsEditEmployeeOpen(false);
    setCurrentEmployee(null);
    
    toast({
      title: "Employee Updated",
      description: `The employee has been updated successfully.`
    });
  };

  const handleDeleteEmployee = (id: number) => {
    setEmployees(employees.filter(emp => emp.id !== id));
    
    toast({
      title: "Employee Deleted",
      description: `The employee has been deleted successfully.`,
      variant: "destructive"
    });
  };

  const handleExportToExcel = () => {
    toast({
      title: "Export Started",
      description: "Employee data is being exported as an Excel file.",
    });
    
    // Simulate download delay
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Employee data has been exported successfully.",
      });
    }, 1500);
  };

  const handlePermissionChange = (permissionId: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedPermissions([...selectedPermissions, permissionId]);
    } else {
      setSelectedPermissions(selectedPermissions.filter(id => id !== permissionId));
    }
  };

  const openEditModal = (employee: Employee) => {
    setCurrentEmployee(employee);
    setSelectedPermissions(employee.permissions);
    setIsEditEmployeeOpen(true);
  };

  const openPermissionModal = (employee: Employee) => {
    setCurrentEmployee(employee);
    setSelectedPermissions(employee.permissions);
    setIsPermissionModalOpen(true);
  };

  const groupedPermissions = availablePermissions.reduce((acc, permission) => {
    if (!acc[permission.module]) {
      acc[permission.module] = [];
    }
    acc[permission.module].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Employee Management</h1>
          <p className="text-muted-foreground">
            Manage employees and their access permissions.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={handleExportToExcel}>
            <Download className="mr-2 h-4 w-4" /> Export to Excel
          </Button>
          <Button onClick={() => setIsAddEmployeeOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" /> Add Employee
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Employees</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search employees..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Employee List ({filteredEmployees.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Name</th>
                      <th className="text-left py-3 px-4">Email</th>
                      <th className="text-left py-3 px-4">Role</th>
                      <th className="text-left py-3 px-4">Department</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-right py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployees.map((employee) => (
                      <tr key={employee.id} className="border-b">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                              {employee.name.charAt(0)}
                            </div>
                            <span>{employee.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">{employee.email}</td>
                        <td className="py-3 px-4">{employee.role}</td>
                        <td className="py-3 px-4">{employee.department}</td>
                        <td className="py-3 px-4">
                          <Badge variant={employee.status === 'active' ? 'default' : 'secondary'}>
                            {employee.status === 'active' ? 'Active' : 'Inactive'}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => openPermissionModal(employee)}
                            >
                              <Shield className="h-4 w-4" />
                              <span className="ml-2 hidden sm:inline">Permissions</span>
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => openEditModal(employee)}
                            >
                              <Edit className="h-4 w-4" />
                              <span className="ml-2 hidden sm:inline">Edit</span>
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-red-500 hover:text-red-500"
                              onClick={() => handleDeleteEmployee(employee.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="ml-2 hidden sm:inline">Delete</span>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {filteredEmployees.length === 0 && (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">No employees found.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="active" className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search active employees..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Name</th>
                      <th className="text-left py-3 px-4">Email</th>
                      <th className="text-left py-3 px-4">Role</th>
                      <th className="text-left py-3 px-4">Department</th>
                      <th className="text-right py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployees
                      .filter(emp => emp.status === 'active')
                      .map((employee) => (
                        <tr key={employee.id} className="border-b">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                {employee.name.charAt(0)}
                              </div>
                              <span>{employee.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">{employee.email}</td>
                          <td className="py-3 px-4">{employee.role}</td>
                          <td className="py-3 px-4">{employee.department}</td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => openEditModal(employee)}
                              >
                                <Edit className="h-4 w-4" />
                                <span className="ml-2 hidden sm:inline">Edit</span>
                              </Button>
                            </div>
                          </td>
                        </tr>
                    ))}
                  </tbody>
                </table>
                
                {filteredEmployees.filter(emp => emp.status === 'active').length === 0 && (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">No active employees found.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="inactive" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Name</th>
                      <th className="text-left py-3 px-4">Email</th>
                      <th className="text-left py-3 px-4">Role</th>
                      <th className="text-left py-3 px-4">Last Active</th>
                      <th className="text-right py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployees
                      .filter(emp => emp.status === 'inactive')
                      .map((employee) => (
                        <tr key={employee.id} className="border-b">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                                {employee.name.charAt(0)}
                              </div>
                              <span>{employee.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">{employee.email}</td>
                          <td className="py-3 px-4">{employee.role}</td>
                          <td className="py-3 px-4">
                            {new Date(employee.lastActive).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                const updatedEmployees = employees.map(emp => 
                                  emp.id === employee.id ? {...emp, status: 'active' as const} : emp
                                );
                                setEmployees(updatedEmployees);
                                toast({
                                  title: "Employee Activated",
                                  description: `${employee.name} has been reactivated.`
                                });
                              }}
                            >
                              Reactivate
                            </Button>
                          </td>
                        </tr>
                    ))}
                  </tbody>
                </table>
                
                {filteredEmployees.filter(emp => emp.status === 'inactive').length === 0 && (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">No inactive employees found.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Role-Based Permissions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(availableRoles).map(([_, role]) => (
                  <div key={role.id} className="space-y-2">
                    <h3 className="font-medium text-lg">{role.name}</h3>
                    <div className="bg-muted p-4 rounded-md">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Object.entries(groupedPermissions).map(([module, permissions]) => (
                          <div key={module} className="space-y-2">
                            <h4 className="font-medium text-sm">{module}</h4>
                            <ul className="space-y-1">
                              {permissions.map(permission => (
                                <li key={permission.id} className="text-sm text-muted-foreground">
                                  {role.id === 'admin' || 
                                   (role.id === 'manager' && !permission.id.includes('settings_write')) ||
                                   (role.id === 'editor' && permission.id.includes('blog')) ||
                                   (role.id === 'staff' && permission.id.includes('read')) ? (
                                    <span className="flex items-center gap-2">
                                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.3334 4L6.00008 11.3333L2.66675 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                      </svg>
                                      {permission.name}
                                    </span>
                                  ) : (
                                    <span className="flex items-center gap-2 text-gray-400">
                                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                      </svg>
                                      {permission.name}
                                    </span>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Add Employee Modal */}
      <Dialog open={isAddEmployeeOpen} onOpenChange={setIsAddEmployeeOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Add New Employee
            </DialogTitle>
            <DialogDescription>
              Create a new employee account with appropriate permissions.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={(e) => {
            e.preventDefault();
            handleAddEmployee();
          }}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    value={newEmployee.name} 
                    onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={newEmployee.email} 
                    onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                    required 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select 
                    value={newEmployee.role} 
                    onValueChange={(value) => setNewEmployee({...newEmployee, role: value})}
                  >
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableRoles.map(role => (
                        <SelectItem key={role.id} value={role.name}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select 
                    value={newEmployee.department} 
                    onValueChange={(value) => setNewEmployee({...newEmployee, department: value})}
                  >
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableDepartments.map(dept => (
                        <SelectItem key={dept.id} value={dept.name}>
                          {dept.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={newEmployee.status} 
                  onValueChange={(value: 'active' | 'inactive') => setNewEmployee({...newEmployee, status: value})}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label className="text-base">Permissions</Label>
                <div className="bg-muted p-4 rounded-md max-h-60 overflow-y-auto">
                  <div className="space-y-4">
                    {Object.entries(groupedPermissions).map(([module, permissions]) => (
                      <div key={module} className="space-y-2">
                        <h4 className="font-medium text-sm">{module}</h4>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                          {permissions.map((permission) => (
                            <div key={permission.id} className="flex items-start space-x-2">
                              <Checkbox 
                                id={`permission-${permission.id}`}
                                checked={selectedPermissions.includes(permission.id)}
                                onCheckedChange={(checked) => 
                                  handlePermissionChange(permission.id, checked as boolean)
                                }
                              />
                              <div className="grid gap-1.5 leading-none">
                                <Label
                                  htmlFor={`permission-${permission.id}`}
                                  className="text-sm font-medium leading-none cursor-pointer"
                                >
                                  {permission.name}
                                </Label>
                                <p className="text-xs text-muted-foreground">
                                  {permission.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddEmployeeOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Add Employee
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Edit Employee Modal */}
      <Dialog open={isEditEmployeeOpen} onOpenChange={setIsEditEmployeeOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5" />
              Edit Employee
            </DialogTitle>
            <DialogDescription>
              Update employee details and permissions.
            </DialogDescription>
          </DialogHeader>
          
          {currentEmployee && (
            <form onSubmit={(e) => {
              e.preventDefault();
              handleEditEmployee();
            }}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-name">Full Name</Label>
                    <Input 
                      id="edit-name" 
                      value={currentEmployee.name} 
                      onChange={(e) => setCurrentEmployee({...currentEmployee, name: e.target.value})}
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="edit-email">Email</Label>
                    <Input 
                      id="edit-email" 
                      type="email" 
                      value={currentEmployee.email} 
                      onChange={(e) => setCurrentEmployee({...currentEmployee, email: e.target.value})}
                      required 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-role">Role</Label>
                    <Select 
                      value={currentEmployee.role} 
                      onValueChange={(value) => setCurrentEmployee({...currentEmployee, role: value})}
                    >
                      <SelectTrigger id="edit-role">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableRoles.map(role => (
                          <SelectItem key={role.id} value={role.name}>
                            {role.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="edit-department">Department</Label>
                    <Select 
                      value={currentEmployee.department} 
                      onValueChange={(value) => setCurrentEmployee({...currentEmployee, department: value})}
                    >
                      <SelectTrigger id="edit-department">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableDepartments.map(dept => (
                          <SelectItem key={dept.id} value={dept.name}>
                            {dept.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select 
                    value={currentEmployee.status} 
                    onValueChange={(value: 'active' | 'inactive') => setCurrentEmployee({...currentEmployee, status: value})}
                  >
                    <SelectTrigger id="edit-status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditEmployeeOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Save Changes
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Permissions Modal */}
      <Dialog open={isPermissionModalOpen} onOpenChange={setIsPermissionModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Manage Permissions
            </DialogTitle>
            <DialogDescription>
              {currentEmployee && `Update permissions for ${currentEmployee.name}`}
            </DialogDescription>
          </DialogHeader>
          
          {currentEmployee && (
            <form onSubmit={(e) => {
              e.preventDefault();
              const updatedEmployees = employees.map(emp => 
                emp.id === currentEmployee.id ? {...currentEmployee, permissions: selectedPermissions} : emp
              );
              
              setEmployees(updatedEmployees);
              setIsPermissionModalOpen(false);
              
              toast({
                title: "Permissions Updated",
                description: `Permissions for ${currentEmployee.name} have been updated successfully.`
              });
            }}>
              <div className="space-y-4 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Quick Assign</h4>
                    <p className="text-sm text-muted-foreground">Apply preset permission groups</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedPermissions(['all_access'])}
                    >
                      Full Access
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedPermissions(
                        availablePermissions
                          .filter(p => p.id.includes('read') && p.id !== 'all_access')
                          .map(p => p.id)
                      )}
                    >
                      Read Only
                    </Button>
                  </div>
                </div>
                
                <div className="bg-muted p-4 rounded-md max-h-96 overflow-y-auto">
                  <div className="space-y-4">
                    {Object.entries(groupedPermissions).map(([module, permissions]) => (
                      <div key={module} className="space-y-2">
                        <h4 className="font-medium text-sm">{module}</h4>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                          {permissions.map((permission) => (
                            <div key={permission.id} className="flex items-start space-x-2">
                              <Checkbox 
                                id={`edit-permission-${permission.id}`}
                                checked={selectedPermissions.includes(permission.id)}
                                onCheckedChange={(checked) => 
                                  handlePermissionChange(permission.id, checked as boolean)
                                }
                                disabled={
                                  selectedPermissions.includes('all_access') && 
                                  permission.id !== 'all_access'
                                }
                              />
                              <div className="grid gap-1.5 leading-none">
                                <Label
                                  htmlFor={`edit-permission-${permission.id}`}
                                  className="text-sm font-medium leading-none cursor-pointer"
                                >
                                  {permission.name}
                                </Label>
                                <p className="text-xs text-muted-foreground">
                                  {permission.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsPermissionModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Update Permissions
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmployeeManagement;
