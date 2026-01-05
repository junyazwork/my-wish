import { useState } from "react";
import { ChevronLeft, Hourglass, CheckCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import SlideMenu from "@/components/SlideMenu";
import { useCampaigns, Campaign } from "@/contexts/CampaignsContext";

interface AllCampaignsProps {
  onBack: () => void;
  onSelectCampaign: (campaign: Campaign) => void;
  onNavigate: (page: string) => void;
}
type FilterType = "ending" | "newest" | "ended" | "all";
const AllCampaigns = ({
  onBack,
  onSelectCampaign,
  onNavigate
}: AllCampaignsProps) => {
  const { campaigns } = useCampaigns();
  const [activeFilter, setActiveFilter] = useState<FilterType>("ending");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const filters: {
    id: FilterType;
    label: string;
  }[] = [{
    id: "ending",
    label: "即將結束"
  }, {
    id: "newest",
    label: "最新募資"
  }, {
    id: "ended",
    label: "已結束"
  }, {
    id: "all",
    label: "全部募資"
  }];
  const getFilteredCampaigns = () => {
    // Only show public campaigns in the list
    const publicCampaigns = campaigns.filter(c => c.isPublic);
    
    switch (activeFilter) {
      case "ending":
        // Active campaigns with less than 5 days remaining
        return publicCampaigns.filter(c => c.status === "active").sort((a, b) => {
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
        return publicCampaigns.filter(c => c.status === "active").sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      case "ended":
        // Only ended campaigns
        return publicCampaigns.filter(c => c.status === "ended");
      case "all":
      default:
        // All campaigns, active first
        return [...publicCampaigns].sort((a, b) => {
          if (a.status === "active" && b.status === "ended") return -1;
          if (a.status === "ended" && b.status === "active") return 1;
          return b.createdAt.getTime() - a.createdAt.getTime();
        });
    }
  };
  const getProgressPercentage = (current: number, goal: number) => {
    return Math.min(current / goal * 100, 100);
  };

  const isGoalReached = (current: number, goal: number) => {
    return current >= goal && goal > 0;
  };
  const filteredCampaigns = getFilteredCampaigns();
  return <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center px-4 py-3">
          <button onClick={onBack} className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft size={24} />
          </button>
          <h1 className="flex-1 text-lg font-semibold text-foreground text-center pr-6">
            所有募資活動
          </h1>
        </div>
      </header>

      {/* Filter Tabs */}
      <div className="px-4 py-3 border-b border-border">
        <div className="flex items-center justify-center gap-0">
          {filters.map((filter, index) => <div key={filter.id} className="flex items-center">
              <button onClick={() => setActiveFilter(filter.id)} className={`text-sm transition-colors ${activeFilter === filter.id ? "text-primary font-medium" : "text-muted-foreground"}`}>
                {filter.label}
              </button>
              {index < filters.length - 1 && <span className="text-muted-foreground/50 mx-[16px]">|</span>}
            </div>)}
        </div>
      </div>

      {/* Campaign List */}
      <div className="flex-1 overflow-auto p-4 space-y-6">
        {filteredCampaigns.length === 0 ? <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <p>目前沒有符合條件的募資活動</p>
          </div> : filteredCampaigns.map(campaign => {
            const goalReached = isGoalReached(campaign.currentAmount, campaign.goalAmount);
            const isDisabled = campaign.status === "ended" || goalReached;
            
            return (
              <div key={campaign.id} className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border">
                {/* Campaign Image - Use mediaItems first, fallback to image */}
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img 
                    src={campaign.mediaItems?.[0]?.url || campaign.image} 
                    alt={campaign.title} 
                    className="w-full h-full object-cover" 
                  />
                  {(campaign.status === "ended" || goalReached) && <div className="absolute inset-0 bg-foreground/50 flex items-center justify-center">
                      <div className="bg-background/90 rounded-full px-4 py-2 flex items-center gap-2">
                        <CheckCircle size={18} className="text-success" />
                        <span className="font-medium text-foreground">已達成目標</span>
                      </div>
                    </div>}
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
                      <p className={`text-xl font-bold ${goalReached ? "text-success" : "text-primary"}`}>
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
                    indicatorClassName={goalReached ? "bg-success" : undefined}
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
                    disabled={isDisabled} 
                    className={`w-full rounded-full py-6 ${isDisabled ? "bg-muted text-muted-foreground cursor-not-allowed" : "bg-primary hover:bg-primary/90 text-primary-foreground"}`}
                  >
                    {campaign.status === "ended" ? "募資已結束" : goalReached ? "已達標" : "贊助"}
                  </Button>
                </div>
              </div>
            );
          })}
      </div>

      {/* Slide Menu */}
      <SlideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} onNavigate={page => {
      setIsMenuOpen(false);
      onNavigate(page);
    }} currentPage="all-campaigns" />
    </div>;
};
export default AllCampaigns;