import { useMemo } from "react";
import { useCampaigns, Campaign } from "@/contexts/CampaignsContext";
import { Progress } from "@/components/ui/progress";

interface FeaturedCampaignsProps {
  onSelectCampaign: (campaign: Campaign) => void;
}

const FeaturedCampaigns = ({ onSelectCampaign }: FeaturedCampaignsProps) => {
  const { campaigns } = useCampaigns();

  // Get 3 random active campaigns that are ending soon (public only)
  const featuredCampaigns = useMemo(() => {
    const activeCampaigns = campaigns.filter(
      (c) => c.status === "active" && c.isPublic
    );
    // Sort by remaining time (ending soon first) and pick random 3
    const shuffled = [...activeCampaigns].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  }, [campaigns]);

  if (featuredCampaigns.length === 0) return null;

  return (
    <div className="px-4 py-4">
      <h2 className="text-lg font-semibold mb-3 text-foreground">熱門募資活動</h2>
      <div className="space-y-3">
        {featuredCampaigns.map((campaign) => {
          const progress = Math.min(
            (campaign.currentAmount / campaign.goalAmount) * 100,
            100
          );

          return (
            <div
              key={campaign.id}
              className="flex gap-3 p-3 bg-card rounded-lg border border-border cursor-pointer hover:bg-accent/50 transition-colors"
              onClick={() => onSelectCampaign(campaign)}
            >
              <img
                src={campaign.image}
                alt={campaign.title}
                className="w-20 h-20 object-cover rounded-md flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm text-foreground line-clamp-1">
                  {campaign.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                  {campaign.organizer}
                </p>
                <div className="mt-2">
                  <Progress value={progress} className="h-1.5" />
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-primary font-medium">
                      ${campaign.currentAmount.toLocaleString()}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      剩餘 {campaign.remainingTime}
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
