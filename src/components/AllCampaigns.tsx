import { useState } from "react";
import { Menu, Hourglass, CheckCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import SlideMenu from "@/components/SlideMenu";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";

interface Campaign {
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
}

interface AllCampaignsProps {
  onBack: () => void;
  onSelectCampaign: (campaign: Campaign) => void;
  onNavigate: (page: string) => void;
}

const mockCampaigns: Campaign[] = [
  // 即將結束 (ending soon)
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
  },
  // 最新募資 (newest)
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
  },
  // 已結束 (ended)
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
  },
];

type FilterType = "ending" | "newest" | "ended" | "all";

const AllCampaigns = ({ onBack, onSelectCampaign, onNavigate }: AllCampaignsProps) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("ending");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const filters: { id: FilterType; label: string }[] = [
    { id: "ending", label: "即將結束" },
    { id: "newest", label: "最新募資" },
    { id: "ended", label: "已結束" },
    { id: "all", label: "全部募資" },
  ];

  const getFilteredCampaigns = () => {
    switch (activeFilter) {
      case "ending":
        // Active campaigns with less than 5 days remaining
        return mockCampaigns
          .filter((c) => c.status === "active")
          .sort((a, b) => {
            // Sort by remaining time (shorter first)
            const getMinutes = (time: string) => {
              const days = parseInt(time.match(/(\d+)天/)?.[1] || "0");
              const hours = parseInt(time.match(/(\d+)時/)?.[1] || "0");
              return days * 24 * 60 + hours * 60;
            };
            return getMinutes(a.remainingTime) - getMinutes(b.remainingTime);
          });
      case "newest":
        // Sort by creation date (newest first)
        return mockCampaigns
          .filter((c) => c.status === "active")
          .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      case "ended":
        // Only ended campaigns
        return mockCampaigns.filter((c) => c.status === "ended");
      case "all":
      default:
        // All campaigns, active first
        return [...mockCampaigns].sort((a, b) => {
          if (a.status === "active" && b.status === "ended") return -1;
          if (a.status === "ended" && b.status === "active") return 1;
          return b.createdAt.getTime() - a.createdAt.getTime();
        });
    }
  };

  const getProgressPercentage = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100);
  };

  const filteredCampaigns = getFilteredCampaigns();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center px-4 py-3">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex items-center text-foreground hover:opacity-70 transition-opacity"
          >
            <Menu size={24} />
          </button>
          <h1 className="flex-1 text-lg font-semibold text-foreground text-center pr-6">
            所有募資活動
          </h1>
        </div>
      </header>

      {/* Filter Tabs */}
      <div className="px-4 py-3 border-b border-border">
        <div className="flex items-center justify-center gap-2">
          {filters.map((filter, index) => (
            <div key={filter.id} className="flex items-center">
              <button
                onClick={() => setActiveFilter(filter.id)}
                className={`text-sm transition-colors ${
                  activeFilter === filter.id
                    ? "text-primary font-medium"
                    : "text-muted-foreground"
                }`}
              >
                {filter.label}
              </button>
              {index < filters.length - 1 && (
                <span className="mx-2 text-muted-foreground/50">|</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Campaign List */}
      <div className="flex-1 overflow-auto p-4 space-y-6">
        {filteredCampaigns.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <p>目前沒有符合條件的募資活動</p>
          </div>
        ) : (
          filteredCampaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border"
            >
              {/* Campaign Image */}
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={campaign.image}
                  alt={campaign.title}
                  className="w-full h-full object-cover"
                />
                {campaign.status === "ended" && (
                  <div className="absolute inset-0 bg-foreground/50 flex items-center justify-center">
                    <div className="bg-background/90 rounded-full px-4 py-2 flex items-center gap-2">
                      <CheckCircle size={18} className="text-primary" />
                      <span className="font-medium text-foreground">已達成目標</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Campaign Info */}
              <div className="p-4 space-y-3">
                <h3 className="text-lg font-semibold text-foreground">
                  {campaign.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {campaign.description}
                </p>

                {/* Organizer and Time */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    發起人 <span className="text-foreground">{campaign.organizer}</span>
                  </span>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Hourglass size={14} />
                    <span>募資倒數</span>
                    <span className={campaign.status === "ended" ? "text-muted-foreground" : "text-primary"}>
                      {campaign.remainingTime}
                    </span>
                  </div>
                </div>

                {/* Amount Info */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">已募得</p>
                    <p className="text-xl font-bold text-primary">
                      ${campaign.currentAmount.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">目標金額</p>
                    <p className="text-xl font-semibold text-foreground">
                      $ {campaign.goalAmount.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <Progress
                  value={getProgressPercentage(campaign.currentAmount, campaign.goalAmount)}
                  className="h-2"
                />

                {/* Participants */}
                <p className="text-sm text-muted-foreground">
                  <span className="text-lg font-semibold text-foreground">
                    {campaign.participants}
                  </span>{" "}
                  人已參與
                </p>

                {/* Sponsor Button */}
                <Button
                  onClick={() => onSelectCampaign(campaign)}
                  disabled={campaign.status === "ended"}
                  className={`w-full rounded-full py-6 ${
                    campaign.status === "ended"
                      ? "bg-muted text-muted-foreground cursor-not-allowed"
                      : "bg-primary hover:bg-primary/90 text-primary-foreground"
                  }`}
                >
                  {campaign.status === "ended" ? "募資已結束" : "贊助"}
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Slide Menu */}
      <SlideMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={(page) => {
          setIsMenuOpen(false);
          onNavigate(page);
        }}
        currentPage="all-campaigns"
      />
    </div>
  );
};

export default AllCampaigns;
