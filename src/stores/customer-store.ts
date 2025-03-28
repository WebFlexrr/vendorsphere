import { create } from "zustand";



interface CustomerState {
  customer: Customer[];
  selectedCustomer: Customer | null;
  searchQuery: string;
  filterDepartment: string;
  filterRole: string;
  filterStatus: "all" | "Active" | "Inactive";
}

interface CustomerActions {
    setSelectedCustomer: (customer: Customer | null) => void;
  
  setSelectedEmployee: (employee: Customer | null) => void;
  setSearchQuery: (query: string) => void;
  setFilterDepartment: (department: string) => void;
  setFilterRole: (role: string) => void;
  setFilterStatus: (status: "all" | "Active" | "Inactive") => void;
  getFilteredEmployees: () => Customer[];
  updateEmployeeStatus: (employeeId: number, status: "Active" | "Inactive") => void;
  updateEmployeePermissions: (employeeId: number, permissions: string[]) => void;
}

type CustomerStore = CustomerState & CustomerActions;

const initialState: CustomerState = {
  customer: [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    mobile: '+1 (555) 123-4567',
    signupDate: '2023-01-15',
    lastActive: '2023-06-22',
    status: 'Active',
    purchases: [
      { id: 101, productName: 'Premium Headphones', date: '2023-02-10', amount: 149.99, status: 'Completed' },
      { id: 102, productName: 'Wireless Keyboard', date: '2023-04-05', amount: 79.99, status: 'Completed' }
    ]
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    mobile: '+1 (555) 987-6543',
    signupDate: '2023-02-20',
    lastActive: '2023-06-18',
    status: 'Active',
    purchases: [
      { id: 103, productName: 'Smart Watch', date: '2023-03-15', amount: 199.99, status: 'Completed' }
    ]
  },
  {
    id: 3,
    name: 'Michael Johnson',
    email: 'michael.j@example.com',
    mobile: '+1 (555) 234-5678',
    signupDate: '2023-03-05',
    lastActive: '2023-05-30',
    status: 'Inactive',
    purchases: []
  },
  {
    id: 4,
    name: 'Sarah Williams',
    email: 'sarah.w@example.com',
    mobile: '+1 (555) 876-5432',
    signupDate: '2023-04-12',
    lastActive: '2023-06-21',
    status: 'Active',
    purchases: [
      { id: 104, productName: 'Bluetooth Speaker', date: '2023-04-20', amount: 89.99, status: 'Completed' },
      { id: 105, productName: 'Laptop Stand', date: '2023-05-15', amount: 34.99, status: 'Completed' },
      { id: 106, productName: 'USB-C Hub', date: '2023-06-10', amount: 49.99, status: 'Pending' }
    ]
  },
  {
    id: 5,
    name: 'Robert Brown',
    email: 'robert.b@example.com',
    mobile: '+1 (555) 345-6789',
    signupDate: '2023-05-08',
    lastActive: '2023-06-01',
    status: 'Suspended',
    purchases: [
      { id: 107, productName: 'Wireless Mouse', date: '2023-05-10', amount: 29.99, status: 'Completed' },
      { id: 108, productName: 'Monitor', date: '2023-05-25', amount: 249.99, status: 'Refunded' }
    ]
  }
],
 selectedCustomer: null,
  searchQuery: "",
  filterDepartment: "all",
  filterRole: "all",
  filterStatus: "all",
};

export const useCustomerStore = create<CustomerStore>((set, get) => ({
  ...initialState,

  setSelectedCustomer: (customer: Customer) =>
    set(() => ({
      selectedCustomer: customer,
    })),
  


  setSelectedEmployee: (employee: Employee | null) =>
    set(() => ({
      selectedEmployee: employee,
    })),

  setSearchQuery: (query: string) =>
    set(() => ({
      searchQuery: query,
    })),

  setFilterDepartment: (department: string) =>
    set(() => ({
      filterDepartment: department,
    })),

  setFilterRole: (role: string) =>
    set(() => ({
      filterRole: role,
    })),

  setFilterStatus: (status: "all" | "Active" | "Inactive") =>
    set(() => ({
      filterStatus: status,
    })),

  updateEmployeeStatus: (employeeId: number, status: "Active" | "Inactive") =>
    set((state) => ({
      employees: state.employees.map((e) =>
        e.id === employeeId ? { ...e, status } : e
      ),
    })),

  updateEmployeePermissions: (employeeId: number, permissions: string[]) =>
    set((state) => ({
      employees: state.employees.map((e) =>
        e.id === employeeId ? { ...e, permissions } : e
      ),
    })),

  getFilteredEmployees: () => {
    const state = get();
    let filtered = state.employees;

    // Apply search filter
    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (employee) =>
          employee.firstName.toLowerCase().includes(query) ||
          employee.lastName.toLowerCase().includes(query) ||
          employee.email.toLowerCase().includes(query) ||
          employee.department.toLowerCase().includes(query) ||
          employee.role.toLowerCase().includes(query)
      );
    }

    // Apply department filter
    if (state.filterDepartment !== "all") {
      filtered = filtered.filter(
        (employee) => employee.department === state.filterDepartment
      );
    }

    // Apply role filter
    if (state.filterRole !== "all") {
      filtered = filtered.filter(
        (employee) => employee.role === state.filterRole
      );
    }

    // Apply status filter
    if (state.filterStatus !== "all") {
      filtered = filtered.filter(
        (employee) => employee.status === state.filterStatus
      );
    }

    return filtered;
  },
})); 