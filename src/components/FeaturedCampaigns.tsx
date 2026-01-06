import { useMemo } from "react";
import { useCampaigns, Campaign } from "@/contexts/CampaignsContext";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface FeaturedCampaignsProps {
  onSelectCampaign: (campaign: Campaign) => void;
  onViewAll: () => void;
}

const FeaturedCampaigns = ({ onSelectCampaign, onViewAll }: FeaturedCampaignsProps) => {
  const { campaigns } = useCampaigns();

  // Get 3 random active campaigns that are ending soon (public only)
  const featuredCampaigns = useMemo(() => {
    const activeCampaigns = campaigns.filter(
      (c) => c.campaign_status === "active" && c.campaign_is_public
    );
    // Sort by remaining time (ending soon first) and pick random 3
    const shuffled = [...activeCampaigns].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  }, [campaigns]);

  if (featuredCampaigns.length === 0) return null;

  return (
    <div className="px-4 py-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-foreground">熱門募資活動</h2>
        <Button
          variant="ghost"
          size="sm"
          className="text-primary hover:text-primary hover:bg-transparent px-2"
          onClick={onViewAll}
        >
          查看更多
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
      <div className="space-y-3">
        {featuredCampaigns.map((campaign) => {
          const progress = Math.min(
            (campaign.campaign_current_amount / campaign.campaign_goal_amount) * 100,
            100
          );
          const isGoalReached = campaign.campaign_current_amount >= campaign.campaign_goal_amount && campaign.campaign_goal_amount > 0;

          return (
            <div
              key={campaign.campaign_id}
              className="flex gap-3 p-3 bg-card rounded-xl shadow-card border border-border cursor-pointer"
              onClick={() => onSelectCampaign(campaign)}
            >
              <img
                src={campaign.mediaItems?.[0]?.media_url || campaign.campaign_image}
                alt={campaign.campaign_title}
                className="w-20 h-20 object-cover rounded-md flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm text-foreground line-clamp-1">
                  {campaign.campaign_title}
                </h3>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                  {campaign.campaign_organizer}
                </p>
                <div className="mt-2">
                  <Progress 
                    value={progress} 
                    className="h-1.5" 
                    indicatorClassName={isGoalReached ? "bg-success" : undefined}
                  />
                  <div className="flex justify-between items-center mt-1">
                    <span className={`text-xs font-medium ${isGoalReached ? "text-success" : "text-primary"}`}>
                      ${campaign.campaign_current_amount.toLocaleString()}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {isGoalReached ? "已達標" : `剩餘 ${campaign.campaign_remaining_time}`}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedCampaigns;
