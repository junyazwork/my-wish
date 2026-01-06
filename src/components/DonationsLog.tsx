import { useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import Header from "./Header";
import { Progress } from "./ui/progress";
import { useCampaigns, Campaign } from "@/contexts/CampaignsContext";

interface DonationRecord {
  donation_id: string;
  donation_date: string;
  donation_amount: number;
  status: "success" | "failed";
}

interface FundraisingActivity {
  activity_id: string;
  activity_name: string;
  currentAmount: number;
  goalAmount: number;
  donations: DonationRecord[];
}

interface DonationsLogProps {
  onBack: () => void;
  onMenuClick: () => void;
  onCartClick: () => void;
  cartCount: number;
  onSelectCampaign: (campaign: Campaign) => void;
}

const DonationsLog = ({ onBack, onMenuClick, onCartClick, cartCount, onSelectCampaign }: DonationsLogProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { campaigns } = useCampaigns();

  // Transform campaigns to activities format
  const activities: FundraisingActivity[] = campaigns.map(campaign => ({
    activity_id: campaign.campaign_id,
    activity_name: campaign.campaign_title,
    currentAmount: campaign.campaign_current_amount,
    goalAmount: campaign.campaign_goal_amount,
    donations: campaign.donations?.map(d => ({
      donation_id: d.donation_id,
      donation_date: d.donation_date.split(' ')[0],
      donation_amount: d.donation_amount,
      status: "success" as const,
    })) || []
  }));

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

  const handleTitleClick = (e: React.MouseEvent, activityId: string) => {
    e.stopPropagation();
    const campaign = campaigns.find(c => c.campaign_id === activityId);
    if (campaign) {
      onSelectCampaign(campaign);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header 
        title="贊助紀錄"
        showBack
        onBack={onBack}
        onMenuClick={onMenuClick}
        onCartClick={onCartClick}
        cartCount={cartCount}
      />

      {/* Activities List */}
      <div className="flex-1 overflow-auto">
        {activities.map((activity) => {
          const percentage = getProgressPercentage(activity.currentAmount, activity.goalAmount);
          const isExpanded = expandedId === activity.activity_id;
          
          return (
            <div key={activity.activity_id} className="border-b border-border">
              {/* Activity Header - Clickable */}
              <div 
                className="px-4 py-4 cursor-pointer hover:bg-muted/30 transition-colors"
                onClick={() => toggleExpand(activity.activity_id)}
              >
                <div className="flex justify-between items-center mb-3">
                  <button
                    onClick={(e) => handleTitleClick(e, activity.activity_id)}
                    className="flex items-center gap-1.5 text-lg font-medium text-foreground hover:text-primary transition-colors text-left"
                  >
                    {activity.activity_name}
                    <ExternalLink className="w-4 h-4" />
                  </button>
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
                      key={donation.donation_id} 
                      className="flex justify-between items-center py-3 border-b border-border/50 last:border-b-0"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-muted-foreground text-sm">{donation.donation_date}</span>
                        {getStatusBadge(donation.status)}
                      </div>
                      <span className="font-medium text-foreground">
                        ${donation.donation_amount.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default DonationsLog;
