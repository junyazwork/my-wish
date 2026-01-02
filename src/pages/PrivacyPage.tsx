import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

const PrivacyPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold">隱私權政策</h1>
          <div className="w-10" />
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-4 py-6">
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-bold mb-3">隱私權保護</h2>
            <p className="text-muted-foreground leading-relaxed">
              MY WISH ONLINE 重視您的隱私權。本政策說明我們如何收集、使用和保護您的個人資料。
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">資料收集</h3>
            <p className="text-muted-foreground leading-relaxed mb-2">
              我們可能收集以下資料：
            </p>
            <ul className="text-muted-foreground space-y-2">
              <li>• 註冊資訊（姓名、電子郵件、電話）</li>
              <li>• 交易資訊（付款記錄、贊助紀錄）</li>
              <li>• 使用資訊（瀏覽記錄、裝置資訊）</li>
              <li>• LINE 帳號資訊（經您授權）</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">資料使用</h3>
            <p className="text-muted-foreground leading-relaxed mb-2">
              我們使用您的資料：
            </p>
            <ul className="text-muted-foreground space-y-2">
              <li>• 提供及改善服務</li>
              <li>• 處理交易及客戶服務</li>
              <li>• 發送服務相關通知</li>
              <li>• 進行數據分析以優化體驗</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">資料保護</h3>
            <ul className="text-muted-foreground space-y-2">
              <li>• 採用業界標準加密技術</li>
              <li>• 限制員工存取權限</li>
              <li>• 定期安全審計</li>
              <li>• 遵守相關法規要求</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">資料分享</h3>
            <p className="text-muted-foreground leading-relaxed">
              除以下情況外，我們不會分享您的個人資料：
            </p>
            <ul className="text-muted-foreground space-y-2 mt-2">
              <li>• 經您明確同意</li>
              <li>• 法律要求或執法機關要求</li>
              <li>• 與合作夥伴處理服務（如金流處理）</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">您的權利</h3>
            <ul className="text-muted-foreground space-y-2">
              <li>• 查詢您的個人資料</li>
              <li>• 要求更正或刪除資料</li>
              <li>• 選擇退出行銷通訊</li>
              <li>• 要求資料可攜性</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">Cookie 使用</h3>
            <p className="text-muted-foreground leading-relaxed">
              本網站使用 Cookie 以提升使用體驗。您可透過瀏覽器設定管理 Cookie 偏好。
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

export default PrivacyPage;
