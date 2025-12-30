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

export interface MediaItemData {
  id: string;
  url: string;
  type: "image" | "video";
}

export type AspectRatioType = "3:4" | "1:1" | "9:16";

export interface InvitationData {
  message: string;
  name: string;
  deadline: string;
  products: CartItem[];
  mediaItems?: MediaItemData[];
  aspectRatio?: AspectRatioType;
}

export interface PublicHostData {
  city: string;
  organization: string;
  address: string;
}

export interface PublicInvitationData {
  host: PublicHostData;
  message: string;
  name: string;
  deadline: string;
  products: CartItem[];
  mediaItems?: MediaItemData[];
  aspectRatio?: AspectRatioType;
}

export interface LineFriend {
  id: string;
  name: string;
}

export type AppView = 
  | "home" 
  | "funding" 
  | "proposals" 
  | "donations"
  | "all-campaigns"
  | "campaign-attend"
  | "line-auth"
  | "invitation-settings"
  | "invitation-confirm"
  | "invitation-share"
  | "line-friend-selector"
  | "line-chat-room"
  | "attend-fundraising"
  | "payment-form"
  | "credit-card-form"
  | "linepay-form"
  | "payment-complete"
  | "public-host-settings"
  | "public-invitation-settings"
  | "public-invitation-confirm"
  | "public-invitation-share"
  | "public-line-friend-selector"
  | "public-line-chat-room"
  | "public-attend-fundraising"
  | "public-payment-form"
  | "public-credit-card-form"
  | "public-linepay-form"
  | "public-payment-complete";
