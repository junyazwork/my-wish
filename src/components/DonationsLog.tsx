import Header from "./Header";

interface DonationItem {
  id: string;
  recipientName: string;
  date: string;
  status: "success" | "failed";
  amount: number;
}

interface DonationsLogProps {
  onBack: () => void;
  onMenuClick: () => void;
  onCartClick: () => void;
  cartCount: number;
}

const DonationsLog = ({ onBack, onMenuClick, onCartClick, cartCount }: DonationsLogProps) => {
  // Mock data for donations
  const donations: DonationItem[] = [
    { id: "1", recipientName: "Zimmer", date: "2025-12-09", status: "success", amount: 500 },
    { id: "2", recipientName: "Zimmer", date: "2025-12-09", status: "success", amount: 500 },
    { id: "3", recipientName: "Zimmer", date: "2025-12-09", status: "success", amount: 500 },
    { id: "4", recipientName: "Zimmer", date: "2025-12-09", status: "failed", amount: 500 },
    { id: "5", recipientName: "Zimmer", date: "2025-12-09", status: "failed", amount: 10 },
  ];

  const getStatusBadge = (status: "success" | "failed") => {
    if (status === "success") {
      return (
        <span className="px-3 py-1 text-sm rounded bg-green-500 text-white">
          成功支付
        </span>
      );
    }
    return (
      <span className="px-3 py-1 text-sm rounded bg-muted text-muted-foreground">
        支付失效
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header 
        title="贊助紀錄"
        onMenuClick={onMenuClick}
        onCartClick={onCartClick}
        cartCount={cartCount}
      />

      {/* Donations List */}
      <div className="flex-1 overflow-auto">
        {donations.map((donation) => (
          <div key={donation.id} className="border-b border-border px-4 py-4">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xl font-medium text-foreground">{donation.recipientName}</span>
              {getStatusBadge(donation.status)}
            </div>
            <div className="flex justify-between items-end">
              <span className="text-muted-foreground">{donation.date}</span>
              <span className="text-foreground">
                贊助金額: <span className="text-xl font-medium">${donation.amount.toLocaleString()}</span>
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

export default DonationsLog;
