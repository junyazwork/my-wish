import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { PublicInvitationData } from "@/types";
import thankYouBanner from "@/assets/thank-you-banner.jpg";

interface PublicAttendFundraisingProps {
  invitation: PublicInvitationData;
  onBack: () => void;
  onDonate: (amount: number) => void;
}

const PublicAttendFundraising = ({
  invitation,
  onBack,
  onDonate,
}: PublicAttendFundraisingProps) => {
  const [amount, setAmount] = useState("");
  
  const totalGoal = invitation.products.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleDonate = () => {
    const donationAmount = parseInt(amount) || 0;
    if (donationAmount > 0) {
      onDonate(donationAmount);
    }
  };

  const firstProduct = invitation.products[0];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-center px-4 py-3">
          <h1 className="text-lg font-semibold text-foreground">
            {invitation.name}的 Wish
          </h1>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1">
        {/* Banner */}
        <div className="relative">
          <img
            src={thankYouBanner}
            alt="Thank You Banner"
            className="w-full h-56 object-cover"
          />
        </div>

        <div className="p-5 space-y-4">
          {/* Product Info */}
          {firstProduct && (
            <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
              <img
                src={firstProduct.image}
                alt={firstProduct.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <p className="text-sm text-foreground flex-1">{firstProduct.name}</p>
            </div>
          )}

          {/* Funding Goal */}
          <div className="flex items-center justify-between py-2">
            <span className="text-muted-foreground">贊助需求目標</span>
            <span className="text-xl font-semibold text-primary">
              ${totalGoal.toLocaleString()}
            </span>
          </div>

          {/* Already Funded */}
          <div className="flex items-center justify-between py-2">
            <span className="text-muted-foreground">已贊助金額</span>
            <span className="text-xl font-semibold text-primary">$0</span>
          </div>

          {/* Amount Input */}
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="輸入贊助金額"
            className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      {/* Bottom Button */}
      <div className="sticky bottom-0 bg-background border-t border-border p-4">
        <button
          onClick={handleDonate}
          disabled={!amount || parseInt(amount) <= 0}
          className="w-full py-3.5 bg-primary text-primary-foreground rounded-xl font-medium transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          贊助
        </button>
      </div>
    </div>
  );
};

export default PublicAttendFundraising;
