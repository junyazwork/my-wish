import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import Footer from "./Footer";

interface PaymentFormProps {
  goalAmount: number;
  donationAmount: number;
  onBack: () => void;
  onPayment: (method: "credit" | "linepay") => void;
}

type InvoiceType = "phone" | "id" | "donate";

const PaymentForm = ({
  goalAmount,
  donationAmount,
  onBack,
  onPayment,
}: PaymentFormProps) => {
  const [invoiceType, setInvoiceType] = useState<InvoiceType>("phone");
  const [phoneCarrier, setPhoneCarrier] = useState("");
  const [idCarrier, setIdCarrier] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const isFormValid = () => {
    if (!name || !email) return false;
    if (invoiceType === "phone" && !phoneCarrier) return false;
    if (invoiceType === "id" && !idCarrier) return false;
    return true;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={onBack} className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft size={24} />
          </button>
          
          <h1 className="text-lg font-semibold text-foreground">付款資訊</h1>
          
          <div className="w-10" />
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 p-5 space-y-6">
        {/* Amounts */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">贊助需求目標</span>
            <span className="text-primary font-semibold text-lg">
              ${goalAmount.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">您的贊助金額</span>
            <span className="text-primary font-semibold text-lg">
              ${donationAmount.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Invoice Section */}
        <div className="space-y-4">
          <h2 className="font-semibold text-foreground">發票資訊</h2>
          <p className="text-sm text-muted-foreground">
            請填寫發票資訊，成案後會開立電子發票給您，未成案將全額退費
          </p>

          {/* Invoice Type: Phone */}
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="radio"
              name="invoiceType"
              checked={invoiceType === "phone"}
              onChange={() => setInvoiceType("phone")}
              className="mt-1 w-5 h-5 text-primary focus:ring-primary"
            />
            <div className="flex-1 space-y-2">
              <span className="text-foreground">手機條碼載具</span>
              {invoiceType === "phone" && (
                <div className="animate-fade-in space-y-1">
                  <input
                    type="text"
                    value={phoneCarrier}
                    onChange={(e) => setPhoneCarrier(e.target.value.toUpperCase())}
                    placeholder="/1234567"
                    className="w-full p-3 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <p className="text-xs text-muted-foreground">
                    請輸入「/」後大寫英數字
                  </p>
                </div>
              )}
            </div>
          </label>

          {/* Invoice Type: ID */}
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="radio"
              name="invoiceType"
              checked={invoiceType === "id"}
              onChange={() => setInvoiceType("id")}
              className="mt-1 w-5 h-5 text-primary focus:ring-primary"
            />
            <span className="text-foreground">自然人憑證條碼載具</span>
          </label>
          {invoiceType === "id" && (
            <input
              type="text"
              value={idCarrier}
              onChange={(e) => setIdCarrier(e.target.value.toUpperCase())}
              placeholder="載具號碼"
              className="w-full p-3 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ml-8 animate-fade-in"
            />
          )}

          {/* Invoice Type: Donate */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="invoiceType"
              checked={invoiceType === "donate"}
              onChange={() => setInvoiceType("donate")}
              className="w-5 h-5 text-primary focus:ring-primary"
            />
            <span className="text-foreground">捐贈</span>
          </label>

          <p className="text-xs text-muted-foreground">
            依法規規定，個人發票一經開立，無法更改或改開公司戶發票。財政部電子發票流程說明
          </p>
        </div>

        {/* Payer Info */}
        <div className="space-y-4">
          <h2 className="font-semibold text-foreground">付款人資訊</h2>

          <div className="space-y-1">
            <label className="text-sm text-muted-foreground">* 姓名</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="chieh"
              className="w-full p-3 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-muted-foreground">* Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="chieh.lee@email.com"
              className="w-full p-3 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>
      </main>

      {/* Bottom Buttons */}
      <div className="sticky bottom-0 bg-background border-t border-border p-4 flex gap-3">
        <button
          onClick={() => onPayment("credit")}
          disabled={!isFormValid()}
          className="flex-1 py-3.5 bg-primary text-primary-foreground rounded-xl font-medium transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          信用卡支付
        </button>
        <button
          onClick={() => onPayment("linepay")}
          disabled={!isFormValid()}
          className="flex-1 py-3.5 bg-[#06C755] text-white rounded-xl font-medium transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          LINEPAY
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default PaymentForm;
