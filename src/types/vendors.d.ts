
declare interface Vendor {
  id: number;
  name: string;
  category: string;
  status: 'pending' | 'active';  // Make sure this is restricted to 'pending' | 'active'
  email: string;
  phone?: string;
  address?: string;
  description?: string;
  appliedDate?: string;
  joinedDate?: string;
  rating?: number;
}

declare interface VendorState {
  pendingVendors: Vendor[];
  activeVendors: Vendor[];
  selectedVendor: Vendor | null;
  searchQuery: string;
  filterCategory: string;
}
