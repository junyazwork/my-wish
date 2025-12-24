import { ChevronLeft } from "lucide-react";
import Header from "./Header";

interface ProposalItem {
  id: string;
  date: string;
  status: "building" | "active";
  currentAmount: number;
  goalAmount: number;
}

interface ProposalsLogProps {
  onBack: () => void;
  onMenuClick: () => void;
  onCartClick: () => void;
  cartCount: number;
}

const ProposalsLog = ({ onBack, onMenuClick, onCartClick, cartCount }: ProposalsLogProps) => {
  // Mock data for proposals
  const proposals: ProposalItem[] = [
    { id: "1", date: "2025-12-31", status: "building", currentAmount: 0, goalAmount: 6000 },
    { id: "2", date: "2025-12-25", status: "active", currentAmount: 0, goalAmount: 3260 },
    { id: "3", date: "2025-12-25", status: "active", currentAmount: 0, goalAmount: 6000 },
    { id: "4", date: "2026-01-08", status: "building", currentAmount: 0, goalAmount: 6000 },
    { id: "5", date: "2025-12-10", status: "active", currentAmount: 0, goalAmount: 10160 },
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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header 
        title="提案紀錄"
        onMenuClick={onMenuClick}
        onCartClick={onCartClick}
        cartCount={cartCount}
      />

      {/* Proposals List */}
      <div className="flex-1 overflow-auto">
        {proposals.map((proposal) => (
          <div key={proposal.id} className="border-b border-border px-4 py-4">
            <div className="flex justify-between items-start mb-2">
              <span className="text-muted-foreground">{proposal.date}</span>
              {getStatusBadge(proposal.status)}
            </div>
            <div className="flex justify-between items-end">
              <span className={`text-2xl font-medium ${proposal.currentAmount > 0 ? 'text-foreground' : 'text-primary'}`}>
                ${proposal.currentAmount.toLocaleString()}
              </span>
              <span className="text-muted-foreground">
                目標金額:${proposal.goalAmount.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
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

export default ProposalsLog;
