import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Plus, Filter, Eye, Edit, Trash, UserCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import DownloadCSVButton from './DownloadCSVButton';

// Sample employee data
const employees = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@vendorsphere.com',
    department: 'Operations',
    role: 'Operations Manager',
    status: 'Active',
    joinDate: '2021-05-12',
    avatar: ''
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@vendorsphere.com',
    department: 'Marketing',
    role: 'Marketing Director',
    status: 'Active',
    joinDate: '2021-06-15',
    avatar: ''
  },
  {
    id: 3,
    name: 'Michael Brown',
    email: 'michael.brown@vendorsphere.com',
    department: 'IT',
    role: 'System Administrator',
    status: 'Active',
    joinDate: '2021-08-03',
    avatar: ''
  },
  {
    id: 4,
    name: 'Emily Davis',
    email: 'emily.davis@vendorsphere.com',
    department: 'Finance',
    role: 'Financial Analyst',
    status: 'On Leave',
    joinDate: '2022-01-10',
    avatar: ''
  },
  {
    id: 5,
    name: 'David Wilson',
    email: 'david.wilson@vendorsphere.com',
    department: 'Customer Support',
    role: 'Support Lead',
    status: 'Active',
    joinDate: '2022-02-08',
    avatar: ''
  },
  {
    id: 6,
    name: 'Jennifer Taylor',
    email: 'jennifer.taylor@vendorsphere.com',
    department: 'Sales',
    role: 'Sales Manager',
    status: 'Active',
    joinDate: '2022-03-15',
    avatar: ''
  },
  {
    id: 7,
    name: 'Robert Martinez',
    email: 'robert.martinez@vendorsphere.com',
    department: 'HR',
    role: 'HR Specialist',
    status: 'Inactive',
    joinDate: '2022-05-02',
    avatar: ''
  },
  {
    id: 8,
    name: 'Lisa Anderson',
    email: 'lisa.anderson@vendorsphere.com',
    department: 'Product Management',
    role: 'Product Manager',
    status: 'Active',
    joinDate: '2022-07-11',
    avatar: ''
  },
  {
    id: 9,
    name: 'James Thomas',
    email: 'james.thomas@vendorsphere.com',
    department: 'Engineering',
    role: 'Lead Developer',
    status: 'Active',
    joinDate: '2022-09-06',
    avatar: ''
  },
  {
    id: 10,
    name: 'Patricia Clark',
    email: 'patricia.clark@vendorsphere.com',
    department: 'Quality Assurance',
    role: 'QA Tester',
    status: 'On Leave',
    joinDate: '2023-01-09',
    avatar: ''
  }
];

const EmployeeManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Employee Management</h1>
        <div className="flex items-center gap-2">
          <DownloadCSVButton 
            data={employees} 
            filename="employees-list" 
            label="Export Employees"
          />
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Employee
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            type="search"
            placeholder="Search employees..."
            className="pl-8"
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      <Tabs defaultValue="all-employees">
        <TabsList>
          <TabsTrigger value="all-employees">All Employees</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="on-leave">On Leave</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>
        <TabsContent value="all-employees">
          <Card>
            <CardHeader className="px-6">
              <CardTitle className="flex items-center text-lg">
                <UserCircle className="mr-2 h-5 w-5" />
                All Employees
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <ScrollArea className="h-[calc(100vh-280px)]">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employees.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={employee.avatar} />
                              <AvatarFallback className="bg-vsphere-primary/10 text-vsphere-primary">
                                {employee.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{employee.name}</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">{employee.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{employee.department}</TableCell>
                        <TableCell>{employee.role}</TableCell>
                        <TableCell>{employee.joinDate}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              employee.status === 'Active' 
                                ? 'default' 
                                : employee.status === 'On Leave' 
                                  ? 'outline' 
                                  : 'secondary'
                            }
                          >
                            {employee.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-1">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="active">
          <Card>
            <CardHeader className="px-6">
              <CardTitle className="flex items-center text-lg">
                <UserCircle className="mr-2 h-5 w-5" />
                Active Employees
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <ScrollArea className="h-[calc(100vh-280px)]">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employees
                      .filter((employee) => employee.status === 'Active')
                      .map((employee) => (
                        <TableRow key={employee.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={employee.avatar} />
                                <AvatarFallback className="bg-vsphere-primary/10 text-vsphere-primary">
                                  {employee.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{employee.name}</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">{employee.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{employee.department}</TableCell>
                          <TableCell>{employee.role}</TableCell>
                          <TableCell>{employee.joinDate}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                employee.status === 'Active'
                                  ? 'default'
                                  : employee.status === 'On Leave'
                                    ? 'outline'
                                    : 'secondary'
                              }
                            >
                              {employee.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-1">
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="on-leave">
          <Card>
            <CardHeader className="px-6">
              <CardTitle className="flex items-center text-lg">
                <UserCircle className="mr-2 h-5 w-5" />
                Employees On Leave
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <ScrollArea className="h-[calc(100vh-280px)]">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employees
                      .filter((employee) => employee.status === 'On Leave')
                      .map((employee) => (
                        <TableRow key={employee.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={employee.avatar} />
                                <AvatarFallback className="bg-vsphere-primary/10 text-vsphere-primary">
                                  {employee.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{employee.name}</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">{employee.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{employee.department}</TableCell>
                          <TableCell>{employee.role}</TableCell>
                          <TableCell>{employee.joinDate}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                employee.status === 'Active'
                                  ? 'default'
                                  : employee.status === 'On Leave'
                                    ? 'outline'
                                    : 'secondary'
                              }
                            >
                              {employee.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-1">
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="inactive">
          <Card>
            <CardHeader className="px-6">
              <CardTitle className="flex items-center text-lg">
                <UserCircle className="mr-2 h-5 w-5" />
                Inactive Employees
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <ScrollArea className="h-[calc(100vh-280px)]">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employees
                      .filter((employee) => employee.status === 'Inactive')
                      .map((employee) => (
                        <TableRow key={employee.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={employee.avatar} />
                                <AvatarFallback className="bg-vsphere-primary/10 text-vsphere-primary">
                                  {employee.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{employee.name}</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">{employee.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{employee.department}</TableCell>
                          <TableCell>{employee.role}</TableCell>
                          <TableCell>{employee.joinDate}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                employee.status === 'Active'
                                  ? 'default'
                                  : employee.status === 'On Leave'
                                    ? 'outline'
                                    : 'secondary'
                              }
                            >
                              {employee.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-1">
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmployeeManagement;
