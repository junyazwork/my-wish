import { useState } from "react";
import { ChevronLeft } from "lucide-react";

interface PublicPaymentFormProps {
  goalAmount: number;
  donationAmount: number;
  onBack: () => void;
  onPayment: (method: "credit" | "linepay") => void;
}

const PublicPaymentForm = ({
  goalAmount,
  donationAmount,
  onBack,
  onPayment,
}: PublicPaymentFormProps) => {
  const [invoiceType, setInvoiceType] = useState<"phone" | "id" | "donate">("phone");
  const [phoneCarrier, setPhoneCarrier] = useState("");
  const [idCarrier, setIdCarrier] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const isValid = name.trim() && email.trim() && email.includes("@");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={onBack} className="p-2 -ml-2 text-muted-foreground">
            <ChevronLeft size={24} />
          </button>
          
          <h1 className="text-lg font-semibold text-foreground">付款資訊</h1>
          
          <div className="w-10" />
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 p-5 space-y-6">
        {/* Amount Summary */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">贊助需求目標</span>
            <span className="text-lg font-semibold text-foreground">
              ${goalAmount.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">您的贊助金額</span>
            <span className="text-lg font-semibold text-primary">
              ${donationAmount.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Invoice Info Section */}
        <div className="space-y-4">
          <h2 className="text-base font-semibold text-foreground">發票資訊</h2>
          <p className="text-sm text-muted-foreground">
            請填寫發票資訊，成案後會開立電子發票給您，未成案將全額退費
          </p>

          {/* Phone Carrier Option */}
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="radio"
              name="invoiceType"
              checked={invoiceType === "phone"}
              onChange={() => setInvoiceType("phone")}
              className="mt-1 w-4 h-4 text-primary border-border focus:ring-primary"
            />
            <div className="flex-1">
              <span className="text-foreground font-medium">手機條碼載具</span>
              {invoiceType === "phone" && (
                <div className="mt-2 space-y-1">
                  <input
                    type="text"
                    value={phoneCarrier}
                    onChange={(e) => setPhoneCarrier(e.target.value.toUpperCase())}
                    placeholder="/1234567"
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <p className="text-xs text-muted-foreground">
                    請輸入「/」後大寫英數字
                  </p>
                </div>
              )}
            </div>
          </label>

          {/* ID Carrier Option */}
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="radio"
              name="invoiceType"
              checked={invoiceType === "id"}
              onChange={() => setInvoiceType("id")}
              className="mt-1 w-4 h-4 text-primary border-border focus:ring-primary"
            />
            <div className="flex-1">
              <span className="text-foreground font-medium">自然人憑證條碼載具</span>
              {invoiceType === "id" && (
                <input
                  type="text"
                  value={idCarrier}
                  onChange={(e) => setIdCarrier(e.target.value.toUpperCase())}
                  placeholder="輸入自然人憑證條碼"
                  className="mt-2 w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              )}
            </div>
          </label>

          {/* Donate Option */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="invoiceType"
              checked={invoiceType === "donate"}
              onChange={() => setInvoiceType("donate")}
              className="w-4 h-4 text-primary border-border focus:ring-primary"
            />
            <span className="text-foreground font-medium">捐贈</span>
          </label>

          <p className="text-xs text-muted-foreground">
            依法規規定，個人發票一經開立，無法更改或改開公司戶發票。財政部電子發票流程說明
          </p>
        </div>

        {/* Payer Info Section */}
        <div className="space-y-4">
          <h2 className="text-base font-semibold text-foreground">付款人資訊</h2>

          <div>
            <label className="text-sm text-muted-foreground mb-1 block">
              <span className="text-destructive">*</span> 姓名
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="請輸入姓名"
              className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-1 block">
              <span className="text-destructive">*</span> Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="請輸入Email"
              className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="sticky bottom-0 bg-background border-t border-border p-4 flex gap-3">
        <button
          onClick={() => onPayment("credit")}
          disabled={!isValid}
          className="flex-1 py-3.5 bg-primary text-primary-foreground rounded-xl font-medium transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          信用卡支付
        </button>
        <button
          onClick={() => onPayment("linepay")}
          disabled={!isValid}
          className="flex-1 py-3.5 bg-[#00C300] text-white rounded-xl font-medium transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          LINEPAY
        </button>
      </div>
    </div>
  );
};

export default PublicPaymentForm;
