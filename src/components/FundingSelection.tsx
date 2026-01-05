import { FundingType } from "@/types";
import { Check, Heart } from "lucide-react";
import { useState } from "react";
import fundraisingPersonal from "@/assets/fundraising-personal.png";
import fundraisingPublic from "@/assets/fundraising-public.png";

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
          <button 
            onClick={onBack}
            className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          
          <h1 className="text-lg font-semibold text-foreground">Wish List</h1>
          
          <div className="relative p-2 -mr-2 text-muted-foreground">
            <Heart size={22} />
            {cartCount > 0 && (
              <span className="absolute top-0.5 right-0.5 min-w-[18px] h-[18px] px-1 bg-destructive text-destructive-foreground text-[10px] font-medium rounded-full flex items-center justify-center">
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
          className={`funding-card w-full overflow-hidden ${selectedType === 'personal' ? 'selected' : ''}`}
          style={{ backgroundImage: `url(${fundraisingPersonal})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          {selectedType === 'personal' && (
            <div className="absolute top-4 left-4 w-7 h-7 rounded-full bg-card flex items-center justify-center">
              <Check size={16} className="text-primary" />
            </div>
          )}
        </button>

        {/* Public Fundraising Card */}
        <button
          onClick={() => setSelectedType('public')}
          className={`funding-card w-full overflow-hidden ${selectedType === 'public' ? 'selected' : ''}`}
          style={{ backgroundImage: `url(${fundraisingPublic})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          {selectedType === 'public' && (
            <div className="absolute top-4 left-4 w-7 h-7 rounded-full bg-card flex items-center justify-center">
              <Check size={16} className="text-primary" />
            </div>
          )}
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
