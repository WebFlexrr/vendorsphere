interface Vendor  {
  id: number;
  name: string;
  category: string;
  status: 'pending' | 'active';
  email: string;
  phone?: string;
  address?: string;
  description?: string;
  appliedDate?: string;
  joinedDate?: string;
  rating?: number;
};
