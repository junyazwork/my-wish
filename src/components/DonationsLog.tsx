import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Header from "./Header";
import { Progress } from "./ui/progress";

interface DonationRecord {
  id: string;
  date: string;
  amount: number;
  status: "success" | "failed";
}

interface FundraisingActivity {
  id: string;
  name: string;
  currentAmount: number;
  goalAmount: number;
  donations: DonationRecord[];
}

interface DonationsLogProps {
  onBack: () => void;
  onMenuClick: () => void;
  onCartClick: () => void;
  cartCount: number;
}

const DonationsLog = ({ onBack, onMenuClick, onCartClick, cartCount }: DonationsLogProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Mock data for fundraising activities with donations
  const activities: FundraisingActivity[] = [
    {
      id: "1",
      name: "Zimmer 生日募資",
      currentAmount: 1500,
      goalAmount: 3000,
      donations: [
        { id: "1-1", date: "2025-12-09", amount: 500, status: "success" },
        { id: "1-2", date: "2025-12-10", amount: 500, status: "success" },
        { id: "1-3", date: "2025-12-11", amount: 500, status: "success" },
      ]
    },
    {
      id: "2",
      name: "公益募資活動",
      currentAmount: 2500,
      goalAmount: 10000,
      donations: [
        { id: "2-1", date: "2025-12-08", amount: 1000, status: "success" },
        { id: "2-2", date: "2025-12-09", amount: 1500, status: "success" },
        { id: "2-3", date: "2025-12-10", amount: 500, status: "failed" },
      ]
    },
    {
      id: "3",
      name: "畢業旅行基金",
      currentAmount: 4200,
      goalAmount: 6000,
      donations: [
        { id: "3-1", date: "2025-12-05", amount: 2000, status: "success" },
        { id: "3-2", date: "2025-12-07", amount: 2200, status: "success" },
      ]
    },
  ];

  const getProgressPercentage = (current: number, goal: number) => {
    if (goal === 0) return 0;
    return Math.min((current / goal) * 100, 100);
  };

  const getStatusBadge = (status: "success" | "failed") => {
    if (status === "success") {
      return (
        <span className="px-2 py-0.5 text-xs rounded bg-green-500 text-white">
          成功
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 text-xs rounded bg-muted text-muted-foreground">
        失敗
      </span>
    );
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header 
        title="贊助紀錄"
        onMenuClick={onMenuClick}
        onCartClick={onCartClick}
        cartCount={cartCount}
      />

      {/* Activities List */}
      <div className="flex-1 overflow-auto">
        {activities.map((activity) => {
          const percentage = getProgressPercentage(activity.currentAmount, activity.goalAmount);
          const isExpanded = expandedId === activity.id;
          
          return (
            <div key={activity.id} className="border-b border-border">
              {/* Activity Header - Clickable */}
              <div 
                className="px-4 py-4 cursor-pointer hover:bg-muted/30 transition-colors"
                onClick={() => toggleExpand(activity.id)}
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-lg font-medium text-foreground">{activity.name}</span>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
                
                {/* Progress Bar */}
                <div className="mb-2">
                  <Progress value={percentage} className="h-3 bg-muted" />
                </div>
                
                {/* Amount Info */}
                <div className="flex justify-between items-center">
                  <span className="text-primary font-medium">
                    ${activity.currentAmount.toLocaleString()}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    目標 ${activity.goalAmount.toLocaleString()} ({percentage.toFixed(0)}%)
                  </span>
                </div>
              </div>

              {/* Expanded Donations List */}
              {isExpanded && (
                <div className="bg-muted/20 px-4 py-2">
                  {activity.donations.map((donation) => (
                    <div 
                      key={donation.id} 
                      className="flex justify-between items-center py-3 border-b border-border/50 last:border-b-0"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-muted-foreground text-sm">{donation.date}</span>
                        {getStatusBadge(donation.status)}
                      </div>
                      <span className="font-medium text-foreground">
                        ${donation.amount.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Button */}
      <div className="p-4 pb-8">
        <button
          onClick={onBack}
          className="w-full py-3.5 bg-primary text-primary-foreground rounded-xl font-medium transition-all hover:opacity-90"
        >
          返回
        </button>
      </div>
    </div>
  );
};

export default DonationsLog;
