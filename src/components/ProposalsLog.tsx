import { useState } from "react";
import { ChevronRight } from "lucide-react";
import Header from "./Header";
import { Progress } from "./ui/progress";
import ProposalDetail from "./ProposalDetail";
import ThankYouLetterEditor from "./ThankYouLetterEditor";
import { useCampaigns, DonationRecord } from "@/contexts/CampaignsContext";
import { CartItem } from "@/types";

interface ProposalItem {
  proposal_id: string;
  proposal_name: string;
  proposalDate: string;
  deadline: string;
  status: "building" | "active";
  currentAmount: number;
  goalAmount: number;
  isPublic: boolean;
  messageBoard: boolean;
  notifyBeforeDeadline: boolean;
  notifyDays: number;
  donations: DonationRecord[];
  products: CartItem[];
}

interface ProposalsLogProps {
  onBack: () => void;
  onMenuClick: () => void;
  onCartClick: () => void;
  cartCount: number;
  onViewAttendFundraising?: (proposalId: string, isPublic: boolean) => void;
}

const ProposalsLog = ({ onBack, onMenuClick, onCartClick, cartCount, onViewAttendFundraising }: ProposalsLogProps) => {
  const { campaigns } = useCampaigns();
  const [selectedProposal, setSelectedProposal] = useState<ProposalItem | null>(null);
  const [showThankYouEditor, setShowThankYouEditor] = useState(false);

  // Convert campaigns to ProposalItem format
  const proposals: ProposalItem[] = campaigns.map(campaign => ({
    proposal_id: campaign.campaign_id,
    proposal_name: campaign.campaign_title,
    proposalDate: campaign.campaign_proposal_date || campaign.campaign_created_at.toISOString().split('T')[0],
    deadline: campaign.campaign_deadline || campaign.campaign_remaining_time,
    status: campaign.campaign_status === "ended" ? "active" : (campaign.campaign_current_amount > 0 ? "active" : "building"),
    currentAmount: campaign.campaign_current_amount,
    goalAmount: campaign.campaign_goal_amount,
    isPublic: campaign.campaign_is_public,
    messageBoard: campaign.campaign_message_board ?? true,
    notifyBeforeDeadline: campaign.campaign_notify_before_deadline ?? true,
    notifyDays: campaign.campaign_notify_days ?? 14,
    donations: campaign.donations || [],
    products: campaign.products || []
  }));

  const getProgressPercentage = (current: number, goal: number) => {
    if (goal === 0) return 0;
    return Math.min((current / goal) * 100, 100);
  };

  const isGoalReached = (current: number, goal: number) => {
    return current >= goal && goal > 0;
  };

  // Show thank you letter editor
  if (showThankYouEditor && selectedProposal) {
    return (
      <ThankYouLetterEditor
        campaignName={selectedProposal.proposal_name}
        donations={selectedProposal.donations}
        onBack={() => setShowThankYouEditor(false)}
        onMenuClick={onMenuClick}
      />
    );
  }

  // Show detail page if a proposal is selected
  if (selectedProposal) {
    const handleShare = () => {
      // Copy link to clipboard or trigger share dialog
      navigator.clipboard.writeText(`https://example.com/fundraising/${selectedProposal.proposal_id}`);
      alert("已複製募資活動連結！");
    };

    const handleViewMessageBoard = () => {
      if (onViewAttendFundraising) {
        onViewAttendFundraising(selectedProposal.proposal_id, selectedProposal.isPublic);
      }
    };

    const handleSendThankYouLetter = () => {
      setShowThankYouEditor(true);
    };

    return (
      <ProposalDetail
        proposal={selectedProposal}
        onBack={() => setSelectedProposal(null)}
        onMenuClick={onMenuClick}
        onShareClick={handleShare}
        onViewMessageBoard={handleViewMessageBoard}
        onSendThankYouLetter={handleSendThankYouLetter}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header 
        title="提案紀錄"
        showBack
        onBack={onBack}
        onMenuClick={onMenuClick}
        onCartClick={onCartClick}
        cartCount={cartCount}
      />

      {/* Proposals List */}
      <div className="flex-1 overflow-auto">
        {proposals.map((proposal) => {
          const percentage = getProgressPercentage(proposal.currentAmount, proposal.goalAmount);
          const goalReached = isGoalReached(proposal.currentAmount, proposal.goalAmount);
          
          return (
            <div key={proposal.proposal_id} className="border-b border-border">
              {/* Proposal Header - Clickable */}
              <div 
                className="px-4 py-4 cursor-pointer hover:bg-muted/30 transition-colors"
                onClick={() => setSelectedProposal(proposal)}
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-lg font-medium text-foreground">{proposal.proposal_name}</span>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
                
                {/* Progress Bar */}
                <div className="mb-2">
                  <Progress 
                    value={percentage} 
                    className="h-3 bg-muted" 
                    indicatorClassName={goalReached ? "bg-success" : undefined}
                  />
                </div>
                
                {/* Amount Info */}
                <div className="flex justify-between items-center">
                  <span className={goalReached ? "text-success font-medium" : "text-primary font-medium"}>
                    ${proposal.currentAmount.toLocaleString()}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    目標 ${proposal.goalAmount.toLocaleString()} ({percentage.toFixed(0)}%)
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProposalsLog;
