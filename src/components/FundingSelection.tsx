import { FundingType } from "@/types";
import { User, Share2, Check } from "lucide-react";
import { useState } from "react";

interface FundingSelectionProps {
  onBack: () => void;
  onContinueShopping: () => void;
  onConfirm: (fundingType: FundingType) => void;
  cartCount: number;
}

const FundingSelection = ({ 
  onBack, 
  onContinueShopping, 
  onConfirm,
  cartCount 
}: FundingSelectionProps) => {
  const [selectedType, setSelectedType] = useState<FundingType>(null);

  const handleConfirm = () => {
    if (selectedType) {
      onConfirm(selectedType);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <button className="p-2 -ml-2 text-muted-foreground">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
            </svg>
          </button>
          
          <h1 className="text-lg font-semibold text-foreground">Wish List</h1>
          
          <div className="relative p-2 -mr-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary-foreground">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[20px] h-5 px-1.5 bg-destructive text-destructive-foreground text-xs font-medium rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 p-5 space-y-5">
        {/* Personal Fundraising Card */}
        <button
          onClick={() => setSelectedType('personal')}
          className={`funding-card w-full gradient-personal ${selectedType === 'personal' ? 'selected' : ''}`}
        >
          {selectedType === 'personal' && (
            <div className="absolute top-4 left-4 w-7 h-7 rounded-full bg-card flex items-center justify-center">
              <Check size={16} className="text-primary" />
            </div>
          )}
          <div className="flex flex-col items-center justify-center h-full text-center">
            <User size={40} className="text-primary-foreground/90 mb-3" />
            <span className="text-lg font-semibold text-primary-foreground">個人募資</span>
          </div>
        </button>

        {/* Public Fundraising Card */}
        <button
          onClick={() => setSelectedType('public')}
          className={`funding-card w-full gradient-public ${selectedType === 'public' ? 'selected' : ''}`}
        >
          {selectedType === 'public' && (
            <div className="absolute top-4 left-4 w-7 h-7 rounded-full bg-card flex items-center justify-center">
              <Check size={16} className="text-primary" />
            </div>
          )}
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Share2 size={40} className="text-primary-foreground/90 mb-3" />
            <span className="text-lg font-semibold text-primary-foreground">公益募資</span>
          </div>
        </button>

      </div>

      {/* Bottom Buttons */}
      <div className="sticky bottom-0 bg-background border-t border-border p-4 flex gap-3">
        <button
          onClick={onContinueShopping}
          className="flex-1 py-3.5 border border-border rounded-xl text-foreground font-medium transition-colors hover:bg-secondary"
        >
          繼續挑選
        </button>
        <button
          onClick={handleConfirm}
          disabled={!selectedType}
          className="flex-1 py-3.5 bg-primary text-primary-foreground rounded-xl font-medium transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          確定
        </button>
      </div>
    </div>
  );
};

export default FundingSelection;
