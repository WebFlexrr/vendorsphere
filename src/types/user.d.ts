interface Customer {
  id: number;
  name: string;
  email: string;
  mobile: string;
  signupDate: string;
  lastActive: string;
  status: 'Active' | 'Inactive' | 'Suspended';
  purchases: PurchaseHistory[];
}

interface PurchaseHistory {
  id: number;
  productName: string;
  date: string;
  amount: number;
  status: 'Completed' | 'Pending' | 'Refunded';
}
