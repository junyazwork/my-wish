import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PublicInvitationData } from "@/types";

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
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const mediaItems = invitation.mediaItems || [];
  const aspectRatio = invitation.aspectRatio || "3:4";
  
  const totalGoal = invitation.products.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case "3:4":
        return "aspect-[3/4]";
      case "1:1":
        return "aspect-square";
      case "9:16":
        return "aspect-[9/16]";
      default:
        return "aspect-[3/4]";
    }
  };

  const handlePrevMedia = () => {
    setCurrentMediaIndex((prev) => (prev > 0 ? prev - 1 : mediaItems.length - 1));
  };

  const handleNextMedia = () => {
    setCurrentMediaIndex((prev) => (prev < mediaItems.length - 1 ? prev + 1 : 0));
  };

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
        {/* Media Display */}
        <div className="relative">
          {mediaItems.length > 0 ? (
            <>
              <div className={`w-full ${getAspectRatioClass()} bg-muted overflow-hidden`}>
                {mediaItems[currentMediaIndex].type === "video" ? (
                  <video
                    src={mediaItems[currentMediaIndex].url}
                    className="w-full h-full object-cover"
                    controls
                  />
                ) : (
                  <img
                    src={mediaItems[currentMediaIndex].url}
                    alt="邀請函媒體"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              {/* Navigation arrows */}
              {mediaItems.length > 1 && (
                <>
                  <button
                    onClick={handlePrevMedia}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-background/80 rounded-full flex items-center justify-center text-foreground hover:bg-background transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={handleNextMedia}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-background/80 rounded-full flex items-center justify-center text-foreground hover:bg-background transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                  {/* Page indicators */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {mediaItems.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentMediaIndex ? "bg-primary" : "bg-background/60"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="w-full h-56 bg-muted flex items-center justify-center">
              <span className="text-muted-foreground">尚未上傳媒體</span>
            </div>
          )}
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