import { useState } from "react";
import { ChevronRight } from "lucide-react";
import Header from "./Header";
import { Progress } from "./ui/progress";
import ProposalDetail from "./ProposalDetail";
import ThankYouLetterEditor from "./ThankYouLetterEditor";
import { useCampaigns, DonationRecord } from "@/contexts/CampaignsContext";

interface ProposalItem {
  id: string;
  name: string;
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
    id: campaign.id,
    name: campaign.title,
    proposalDate: campaign.proposalDate || campaign.createdAt.toISOString().split('T')[0],
    deadline: campaign.deadline || campaign.remainingTime,
    status: campaign.status === "ended" ? "active" : (campaign.currentAmount > 0 ? "active" : "building"),
    currentAmount: campaign.currentAmount,
    goalAmount: campaign.goalAmount,
    isPublic: campaign.isPublic,
    messageBoard: campaign.messageBoard ?? true,
    notifyBeforeDeadline: campaign.notifyBeforeDeadline ?? true,
    notifyDays: campaign.notifyDays ?? 14,
    donations: campaign.donations || []
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
        campaignName={selectedProposal.name}
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
      navigator.clipboard.writeText(`https://example.com/fundraising/${selectedProposal.id}`);
      alert("已複製募資活動連結！");
    };

    const handleViewMessageBoard = () => {
      if (onViewAttendFundraising) {
        onViewAttendFundraising(selectedProposal.id, selectedProposal.isPublic);
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
            <div key={proposal.id} className="border-b border-border">
              {/* Proposal Header - Clickable */}
              <div 
                className="px-4 py-4 cursor-pointer hover:bg-muted/30 transition-colors"
                onClick={() => setSelectedProposal(proposal)}
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-lg font-medium text-foreground">{proposal.name}</span>
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
