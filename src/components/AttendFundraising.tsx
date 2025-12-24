import { useState } from "react";
import { InvitationData } from "@/types";
import thankYouBanner from "@/assets/thank-you-banner.jpg";

interface AttendFundraisingProps {
  invitation: InvitationData;
  onBack: () => void;
  onDonate: (amount: number) => void;
}

const AttendFundraising = ({
  invitation,
  onBack,
  onDonate,
}: AttendFundraisingProps) => {
  const [amount, setAmount] = useState("");

  const totalGoal = invitation.products.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const mainProduct = invitation.products[0];

  const handleDonate = () => {
    const numAmount = parseInt(amount, 10);
    if (numAmount > 0) {
      onDonate(numAmount);
    }
  };

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

      {/* Banner */}
      <div className="relative">
        <img
          src={thankYouBanner}
          alt="Thank You"
          className="w-full h-56 object-cover"
        />
        {/* Diamond decoration */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-3 bg-card/60 rotate-45" />
      </div>

      {/* Content */}
      <div className="flex-1 p-5 space-y-4">
        {/* Product Card */}
        {mainProduct && (
          <div className="flex items-center gap-3 p-3 bg-card rounded-xl border border-border">
            <img
              src={mainProduct.image}
              alt={mainProduct.name}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <p className="flex-1 text-sm text-foreground line-clamp-2">
              {mainProduct.name}
            </p>
          </div>
        )}

        {/* Funding Info */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">贊助需求目標</span>
            <span className="text-primary font-semibold text-lg">
              ${totalGoal.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">已贊助金額</span>
            <span className="text-primary font-semibold text-lg">$0</span>
          </div>
        </div>

        {/* Amount Input */}
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="10"
          className="w-full p-4 border border-border rounded-xl bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {/* Bottom Button */}
      <div className="sticky bottom-0 bg-background border-t border-border p-4">
        <button
          onClick={handleDonate}
          disabled={!amount || parseInt(amount, 10) <= 0}
          className="w-full py-3.5 bg-primary text-primary-foreground rounded-xl font-medium transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          贊助
        </button>
      </div>
    </div>
  );
};

export default AttendFundraising;
