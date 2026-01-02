import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import Footer from "./Footer";

interface CreditCardFormProps {
  donationAmount: number;
  onBack: () => void;
  onConfirm: () => void;
}

const CreditCardForm = ({
  donationAmount,
  onBack,
  onConfirm,
}: CreditCardFormProps) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardHolder, setCardHolder] = useState("");

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const formatExpiryDate = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 2) {
      return digits.slice(0, 2) + "/" + digits.slice(2);
    }
    return digits;
  };

  const isValid =
    cardNumber.replace(/\s/g, "").length === 16 &&
    expiryDate.length === 5 &&
    cvv.length >= 3 &&
    cardHolder.trim().length > 0;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={onBack} className="p-2 -ml-2 text-muted-foreground">
            <ChevronLeft size={24} />
          </button>
          
          <h1 className="text-lg font-semibold text-foreground">信用卡付款</h1>
          
          <div className="w-10" />
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 p-5 space-y-6">
        {/* Amount Display */}
        <div className="bg-card rounded-xl p-4 border border-border">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">付款金額</span>
            <span className="text-xl font-bold text-primary">
              ${donationAmount.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Card Form */}
        <div className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">
              卡號
            </label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              placeholder="0000 0000 0000 0000"
              className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              maxLength={19}
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-sm text-muted-foreground mb-1 block">
                有效期限
              </label>
              <input
                type="text"
                value={expiryDate}
                onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                placeholder="MM/YY"
                className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                maxLength={5}
              />
            </div>
            <div className="flex-1">
              <label className="text-sm text-muted-foreground mb-1 block">
                安全碼
              </label>
              <input
                type="text"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                placeholder="CVV"
                className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                maxLength={4}
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-1 block">
              持卡人姓名
            </label>
            <input
              type="text"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
              placeholder="請輸入與卡片相符的姓名"
              className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>

        {/* Security Note */}
        <p className="text-xs text-muted-foreground text-center">
          您的付款資訊將以安全加密方式處理
        </p>
      </main>

      {/* Bottom Button */}
      <div className="sticky bottom-0 bg-background border-t border-border p-4">
        <button
          onClick={onConfirm}
          disabled={!isValid}
          className="w-full py-3.5 bg-primary text-primary-foreground rounded-xl font-medium transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          確認付款
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default CreditCardForm;
