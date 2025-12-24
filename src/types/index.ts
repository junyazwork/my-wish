export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  subcategory?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  subcategories?: string[];
}

export type FundingType = 'personal' | 'public' | null;

export interface InvitationData {
  message: string;
  name: string;
  deadline: string;
  products: CartItem[];
}

export type AppView = 
  | "home" 
  | "funding" 
  | "proposals" 
  | "donations"
  | "invitation-settings"
  | "invitation-share"
  | "attend-fundraising"
  | "payment-form"
  | "payment-complete";
