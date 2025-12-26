import { useState } from "react";
import { ChevronRight } from "lucide-react";
import Header from "./Header";
import { Progress } from "./ui/progress";
import ProposalDetail from "./ProposalDetail";

interface DonationRecord {
  id: string;
  lineName: string;
  amount: number;
  date: string;
}

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
}

const ProposalsLog = ({ onBack, onMenuClick, onCartClick, cartCount }: ProposalsLogProps) => {
  const [selectedProposal, setSelectedProposal] = useState<ProposalItem | null>(null);

  // Mock data for proposals
  const proposals: ProposalItem[] = [
    { 
      id: "1", 
      name: "Zimmer 生日募資",
      proposalDate: "2025-10-01",
      deadline: "2025-12-31", 
      status: "building", 
      currentAmount: 0, 
      goalAmount: 6000,
      isPublic: false,
      messageBoard: true,
      notifyBeforeDeadline: true,
      notifyDays: 14,
      donations: []
    },
    { 
      id: "2", 
      name: "聖誕節派對",
      proposalDate: "2025-11-01",
      deadline: "2025-12-25", 
      status: "active", 
      currentAmount: 1500, 
      goalAmount: 3260,
      isPublic: true,
      messageBoard: true,
      notifyBeforeDeadline: true,
      notifyDays: 7,
      donations: [
        { id: "2-1", lineName: "王大明王大明", amount: 100, date: "2025-12-27 15:39" },
        { id: "2-2", lineName: "王大明王大明", amount: 100, date: "2025-12-27 15:39" },
        { id: "2-3", lineName: "王大明王大明", amount: 100, date: "2025-12-27 15:39" },
      ]
    },
    { 
      id: "3", 
      name: "畢業旅行基金",
      proposalDate: "2025-10-15",
      deadline: "2025-12-25", 
      status: "active", 
      currentAmount: 4200, 
      goalAmount: 6000,
      isPublic: false,
      messageBoard: false,
      notifyBeforeDeadline: false,
      notifyDays: 14,
      donations: [
        { id: "3-1", lineName: "陳小華", amount: 500, date: "2025-12-20 10:00" },
        { id: "3-2", lineName: "林美美", amount: 300, date: "2025-12-21 14:30" },
      ]
    },
    { 
      id: "4", 
      name: "新年禮物",
      proposalDate: "2025-12-01",
      deadline: "2026-01-08", 
      status: "building", 
      currentAmount: 0, 
      goalAmount: 6000,
      isPublic: true,
      messageBoard: true,
      notifyBeforeDeadline: true,
      notifyDays: 14,
      donations: []
    },
    { 
      id: "5", 
      name: "公益募資活動",
      proposalDate: "2025-09-01",
      deadline: "2025-12-10", 
      status: "active", 
      currentAmount: 8500, 
      goalAmount: 10160,
      isPublic: true,
      messageBoard: true,
      notifyBeforeDeadline: true,
      notifyDays: 14,
      donations: [
        { id: "5-1", lineName: "張三", amount: 1000, date: "2025-12-01 09:00" },
        { id: "5-2", lineName: "李四", amount: 2000, date: "2025-12-02 11:30" },
      ]
    },
  ];

  const getStatusBadge = (status: "building" | "active") => {
    if (status === "building") {
      return (
        <span className="px-3 py-1 text-sm rounded bg-muted text-muted-foreground">
          建立中
        </span>
      );
    }
    return (
      <span className="px-3 py-1 text-sm rounded bg-primary text-primary-foreground">
        執行中
      </span>
    );
  };

  const getProgressPercentage = (current: number, goal: number) => {
    if (goal === 0) return 0;
    return Math.min((current / goal) * 100, 100);
  };

  // Show detail page if a proposal is selected
  if (selectedProposal) {
    return (
      <ProposalDetail
        proposal={selectedProposal}
        onBack={() => setSelectedProposal(null)}
        onMenuClick={onMenuClick}
        onCartClick={onCartClick}
        cartCount={cartCount}
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
                  <Progress value={percentage} className="h-3 bg-muted" />
                </div>
                
                {/* Amount Info */}
                <div className="flex justify-between items-center">
                  <span className="text-primary font-medium">
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
