import { useState } from "react";
import { ChevronLeft, Smartphone } from "lucide-react";

interface LinePayFormProps {
  donationAmount: number;
  onBack: () => void;
  onConfirm: () => void;
}

const LinePayForm = ({
  donationAmount,
  onBack,
  onConfirm,
}: LinePayFormProps) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirm = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onConfirm();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#00C300] flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#00C300] border-b border-[#00A000]">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={onBack} className="p-2 -ml-2 text-white">
            <ChevronLeft size={24} />
          </button>
          
          <h1 className="text-lg font-semibold text-white">LINE Pay</h1>
          
          <div className="w-10" />
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-8">
        {/* LINE Pay Logo */}
        <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center shadow-lg">
          <span className="text-[#00C300] text-2xl font-bold">LINE</span>
        </div>

        {/* Amount Card */}
        <div className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-lg">
          <div className="text-center space-y-2">
            <p className="text-muted-foreground text-sm">付款金額</p>
            <p className="text-3xl font-bold text-foreground">
              ${donationAmount.toLocaleString()}
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Smartphone size={20} />
              <span className="text-sm">請確認 LINE 應用程式中的付款請求</span>
            </div>
          </div>
        </div>

        {/* Processing Indicator */}
        {isProcessing && (
          <div className="flex items-center gap-3 text-white">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>處理中...</span>
          </div>
        )}
      </div>

      {/* Bottom Button */}
      <div className="sticky bottom-0 bg-[#00C300] p-4">
        <button
          onClick={handleConfirm}
          disabled={isProcessing}
          className="w-full py-3.5 bg-white text-[#00C300] rounded-xl font-medium transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? "處理中..." : "確認付款"}
        </button>
      </div>
    </div>
  );
};

export default LinePayForm;
