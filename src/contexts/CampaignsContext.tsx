import { createContext, useContext, useState, ReactNode } from "react";
import { CartItem, MediaItemData, AspectRatioType } from "@/types";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";

export interface Campaign {
  id: string;
  title: string;
  description: string;
  organizer: string;
  image: string;
  currentAmount: number;
  goalAmount: number;
  participants: number;
  remainingTime: string;
  status: "active" | "ended";
  createdAt: Date;
  isPublic: boolean;
  // Additional fields for proposals
  proposalDate?: string;
  deadline?: string;
  messageBoard?: boolean;
  notifyBeforeDeadline?: boolean;
  notifyDays?: number;
  donations?: DonationRecord[];
  products?: CartItem[];
  mediaItems?: MediaItemData[];
  aspectRatio?: AspectRatioType;
}

export interface DonationRecord {
  id: string;
  lineName: string;
  amount: number;
  date: string;
  email?: string;
}

interface CampaignsContextType {
  campaigns: Campaign[];
  updateCampaignVisibility: (id: string, isPublic: boolean) => void;
  getCampaignById: (id: string) => Campaign | undefined;
}

const CampaignsContext = createContext<CampaignsContextType | undefined>(undefined);

// Initial mock data combining both AllCampaigns and ProposalsLog data
const initialCampaigns: Campaign[] = [
  // From AllCampaigns - 即將結束
  {
    id: "1",
    title: "沈浸式學習 全母語夏令營",
    description: "用時的不你要是奇模，性成了然門海度處一的多著類爭上人其同如政一在機",
    organizer: "Zimmer",
    image: product1,
    currentAmount: 1110,
    goalAmount: 1290,
    participants: 491,
    remainingTime: "2天3時17分",
    status: "active",
    createdAt: new Date("2024-12-01"),
    isPublic: true,
    proposalDate: "2024-11-01",
    deadline: "2025-01-15",
    messageBoard: true,
    notifyBeforeDeadline: true,
    notifyDays: 7,
    donations: [
      { id: "1-1", lineName: "王大明", amount: 500, date: "2024-12-20 10:00", email: "wang@example.com" },
    ],
    products: [
      { id: "p1", name: "精選咖啡禮盒", price: 580, image: product1, category: "食品", quantity: 2 },
      { id: "p2", name: "手工餅乾組合", price: 320, image: product2, category: "食品", quantity: 1 },
    ],
    mediaItems: [
      { id: "m1", url: product1, type: "image" },
    ],
    aspectRatio: "3:4"
  },
  {
    id: "2",
    title: "偏鄉孩童教育計畫",
    description: "為偏鄉地區的孩童提供更好的教育資源與學習機會",
    organizer: "教育基金會",
    image: product2,
    currentAmount: 8500,
    goalAmount: 15000,
    participants: 234,
    remainingTime: "1天8時30分",
    status: "active",
    createdAt: new Date("2024-12-10"),
    isPublic: true,
    proposalDate: "2024-11-15",
    deadline: "2025-01-20",
    messageBoard: true,
    notifyBeforeDeadline: true,
    notifyDays: 14,
    donations: [],
    products: [
      { id: "p3", name: "教育圖書套組", price: 1200, image: product2, category: "教育", quantity: 3 },
    ],
    mediaItems: [
      { id: "m2", url: product2, type: "image" },
    ],
    aspectRatio: "3:4"
  },
  // From AllCampaigns - 最新募資
  {
    id: "3",
    title: "海洋保育淨灘計畫",
    description: "守護海洋生態，減少塑膠污染，讓海龜回家",
    organizer: "海洋守護者",
    image: product3,
    currentAmount: 2500,
    goalAmount: 20000,
    participants: 89,
    remainingTime: "29天12時45分",
    status: "active",
    createdAt: new Date("2024-12-28"),
    isPublic: true,
    proposalDate: "2024-12-01",
    deadline: "2025-02-15",
    messageBoard: false,
    notifyBeforeDeadline: false,
    notifyDays: 14,
    donations: [],
    products: [
      { id: "p4", name: "環保淨灘工具組", price: 450, image: product3, category: "環保", quantity: 5 },
    ],
    mediaItems: [
      { id: "m3", url: product3, type: "image" },
    ],
    aspectRatio: "1:1"
  },
  {
    id: "4",
    title: "獨居長者送餐服務",
    description: "為社區內的獨居長者提供每日營養餐點配送",
    organizer: "銀髮關懷協會",
    image: product4,
    currentAmount: 1200,
    goalAmount: 8000,
    participants: 56,
    remainingTime: "25天6時20分",
    status: "active",
    createdAt: new Date("2024-12-27"),
    isPublic: false,
    proposalDate: "2024-12-05",
    deadline: "2025-02-10",
    messageBoard: true,
    notifyBeforeDeadline: true,
    notifyDays: 7,
    donations: [],
    products: [
      { id: "p5", name: "營養餐點食材", price: 280, image: product4, category: "食品", quantity: 10 },
    ],
    mediaItems: [
      { id: "m4", url: product4, type: "image" },
    ],
    aspectRatio: "3:4"
  },
  // From AllCampaigns - 已結束
  {
    id: "5",
    title: "兒童繪本募集計畫",
    description: "為偏鄉學校募集優質繪本，豐富孩子的閱讀世界",
    organizer: "閱讀推廣協會",
    image: product5,
    currentAmount: 12000,
    goalAmount: 12000,
    participants: 342,
    remainingTime: "已結束",
    status: "ended",
    createdAt: new Date("2024-11-01"),
    isPublic: true,
    proposalDate: "2024-09-01",
    deadline: "2024-12-01",
    messageBoard: true,
    notifyBeforeDeadline: true,
    notifyDays: 14,
    donations: [
      { id: "5-1", lineName: "張三", amount: 1000, date: "2024-11-15 09:00" },
      { id: "5-2", lineName: "李四", amount: 2000, date: "2024-11-20 11:30" },
    ],
    products: [
      { id: "p6", name: "兒童繪本經典套書", price: 890, image: product5, category: "書籍", quantity: 4 },
    ],
    mediaItems: [
      { id: "m5", url: product5, type: "image" },
    ],
    aspectRatio: "3:4"
  },
  {
    id: "6",
    title: "流浪動物救援行動",
    description: "幫助流浪動物找到溫暖的家，提供醫療與照護",
    organizer: "動物之家",
    image: product6,
    currentAmount: 5000,
    goalAmount: 5000,
    participants: 156,
    remainingTime: "已結束",
    status: "ended",
    createdAt: new Date("2024-10-15"),
    isPublic: true,
    proposalDate: "2024-08-15",
    deadline: "2024-11-15",
    messageBoard: true,
    notifyBeforeDeadline: false,
    notifyDays: 14,
    donations: [],
    products: [
      { id: "p7", name: "寵物飼料大包裝", price: 650, image: product6, category: "寵物", quantity: 8 },
      { id: "p8", name: "寵物醫療用品", price: 420, image: product6, category: "寵物", quantity: 3 },
    ],
    mediaItems: [
      { id: "m6", url: product6, type: "image" },
    ],
    aspectRatio: "1:1"
  }
];

export const CampaignsProvider = ({ children }: { children: ReactNode }) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);

  const updateCampaignVisibility = (id: string, isPublic: boolean) => {
    setCampaigns(prev => 
      prev.map(campaign => 
        campaign.id === id ? { ...campaign, isPublic } : campaign
      )
    );
  };

  const getCampaignById = (id: string) => {
    return campaigns.find(campaign => campaign.id === id);
  };

  return (
    <CampaignsContext.Provider value={{ campaigns, updateCampaignVisibility, getCampaignById }}>
      {children}
    </CampaignsContext.Provider>
  );
};

export const useCampaigns = () => {
  const context = useContext(CampaignsContext);
  if (context === undefined) {
    throw new Error("useCampaigns must be used within a CampaignsProvider");
  }
  return context;
};
