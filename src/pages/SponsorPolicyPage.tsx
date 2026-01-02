import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

const SponsorPolicyPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold">贊助保障規範</h1>
          <div className="w-10" />
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-4 py-6">
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-bold mb-3">贊助者保障</h2>
            <p className="text-muted-foreground leading-relaxed">
              MY WISH ONLINE 致力於保護每一位贊助者的權益，建立安全可信賴的募資環境。
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">資金保護機制</h3>
            <ul className="text-muted-foreground space-y-2">
              <li>• 所有款項由第三方金融機構代管</li>
              <li>• 募資成功後才會撥款給提案者</li>
              <li>• 提供完整的交易紀錄與收據</li>
              <li>• 募資未達標時，全額退款</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">退款政策</h3>
            <p className="text-muted-foreground leading-relaxed mb-2">
              以下情況可申請退款：
            </p>
            <ul className="text-muted-foreground space-y-2">
              <li>• 募資活動未達成目標</li>
              <li>• 提案者無法履行承諾</li>
              <li>• 發現欺詐或不實資訊</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">爭議處理</h3>
            <p className="text-muted-foreground leading-relaxed">
              如遇任何爭議，請聯繫我們的客服團隊。我們將在 3 個工作日內回覆，
              並盡力協助解決問題。
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">安全交易</h3>
            <ul className="text-muted-foreground space-y-2">
              <li>• 採用 SSL 加密技術保護交易資料</li>
              <li>• 支援多種安全支付方式</li>
              <li>• 定期進行安全審計</li>
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SponsorPolicyPage;
