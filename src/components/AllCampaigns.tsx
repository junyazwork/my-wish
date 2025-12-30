import { useState } from "react";
import { ChevronLeft, Hourglass } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";

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
}

interface AllCampaignsProps {
  onBack: () => void;
  onSelectCampaign: (campaign: Campaign) => void;
}

const mockCampaigns: Campaign[] = [
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
    remainingTime: "5天12時30分",
  },
  {
    id: "3",
    title: "流浪動物救援行動",
    description: "幫助流浪動物找到溫暖的家，提供醫療與照護",
    organizer: "動物之家",
    image: product3,
    currentAmount: 3200,
    goalAmount: 5000,
    participants: 156,
    remainingTime: "3天8時45分",
  },
];

type FilterType = "ending" | "newest" | "ended" | "all";

const AllCampaigns = ({ onBack, onSelectCampaign }: AllCampaignsProps) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("ending");

  const filters: { id: FilterType; label: string }[] = [
    { id: "ending", label: "即將結束" },
    { id: "newest", label: "最新募資" },
    { id: "ended", label: "已結束" },
    { id: "all", label: "全部募資" },
  ];

  const getProgressPercentage = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center px-4 py-3">
          <button
            onClick={onBack}
            className="flex items-center text-foreground hover:opacity-70 transition-opacity"
          >
            <ChevronLeft size={24} />
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
        {mockCampaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border"
          >
            {/* Campaign Image */}
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={campaign.image}
                alt={campaign.title}
                className="w-full h-full object-cover"
              />
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
                  <span className="text-primary">{campaign.remainingTime}</span>
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
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-6"
              >
                贊助
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCampaigns;
