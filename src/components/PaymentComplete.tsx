import thankYouBanner from "@/assets/thank-you-banner.jpg";

interface PaymentCompleteProps {
  recipientName: string;
  onFinish: () => void;
}

const PaymentComplete = ({ recipientName, onFinish }: PaymentCompleteProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Banner */}
      <div className="relative">
        <img
          src={thankYouBanner}
          alt="Thank You"
          className="w-full h-64 object-cover"
        />
        {/* Diamond decoration */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-3 bg-card/60 rotate-45" />
      </div>

      {/* Content */}
      <div className="flex-1 p-6 space-y-4">
        <h1 className="text-xl font-bold text-primary">
          {recipientName}感謝您的贊助！
        </h1>
        <div className="space-y-2 text-muted-foreground">
          <p>贊助通知將寄送至您留下的Email</p>
          <p>成案後將會開立電子發票給您</p>
          <p>未成案將全額退費!</p>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="sticky bottom-0 bg-background border-t border-border p-4">
        <button
          onClick={onFinish}
          className="w-full py-3.5 bg-primary text-primary-foreground rounded-xl font-medium transition-all hover:opacity-90"
        >
          到MyWishOnline官方帳號
        </button>
      </div>
    </div>
  );
};

export default PaymentComplete;
