import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

const TermsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold">使用條款</h1>
          <div className="w-10" />
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-4 py-6">
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-bold mb-3">服務條款</h2>
            <p className="text-muted-foreground leading-relaxed">
              歡迎使用 MY WISH ONLINE 平台服務。使用本平台前，請詳細閱讀以下條款。
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">1. 服務說明</h3>
            <p className="text-muted-foreground leading-relaxed">
              MY WISH ONLINE 提供線上募資平台服務，協助用戶發起和參與募資活動。
              本平台僅提供媒合服務，不涉及商品銷售或物流配送。
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">2. 帳號與安全</h3>
            <ul className="text-muted-foreground space-y-2">
              <li>• 用戶需提供真實、準確的個人資訊</li>
              <li>• 用戶應妥善保管帳號密碼</li>
              <li>• 禁止轉讓或分享帳號給他人使用</li>
              <li>• 發現帳號異常應立即通知平台</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">3. 使用規範</h3>
            <ul className="text-muted-foreground space-y-2">
              <li>• 禁止發布不實或誤導性資訊</li>
              <li>• 禁止用於非法活動</li>
              <li>• 禁止侵犯他人權益</li>
              <li>• 禁止干擾平台正常運作</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">4. 智慧財產權</h3>
            <p className="text-muted-foreground leading-relaxed">
              本平台所有內容、商標、設計均受智慧財產權法律保護。
              未經授權，禁止複製、修改或散布。
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">5. 免責聲明</h3>
            <p className="text-muted-foreground leading-relaxed">
              本平台不保證服務不中斷或無錯誤。對於因使用本服務所產生的任何損失，
              本平台在法律允許範圍內不承擔責任。
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">6. 條款修改</h3>
            <p className="text-muted-foreground leading-relaxed">
              本平台保留隨時修改服務條款的權利。修改後的條款將於公告後生效，
              繼續使用服務即表示同意修改後的條款。
            </p>
          </section>

          <p className="text-sm text-muted-foreground pt-4">
            最後更新日期：2025 年 1 月 1 日
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsPage;
