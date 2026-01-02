import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

const ServiceGuidePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold">提案服務說明</h1>
          <div className="w-10" />
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-4 py-6">
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-bold mb-3">如何發起募資？</h2>
            <p className="text-muted-foreground leading-relaxed">
              MY WISH ONLINE 提供簡單便捷的募資工具，讓您輕鬆發起募資活動。
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">募資類型</h3>
            <ul className="text-muted-foreground space-y-2">
              <li>• <strong>私人募資</strong> - 透過 LINE 分享給親朋好友</li>
              <li>• <strong>公開募資</strong> - 公開展示於平台供大眾參與</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">發起步驟</h3>
            <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
              <li>選擇想要的商品加入願望清單</li>
              <li>選擇募資類型（私人/公開）</li>
              <li>填寫募資活動資訊</li>
              <li>設定募資期限與目標</li>
              <li>確認內容後發起募資</li>
              <li>分享給朋友或公開展示</li>
            </ol>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">費用說明</h3>
            <ul className="text-muted-foreground space-y-2">
              <li>• 發起募資活動：免費</li>
              <li>• 募資成功手續費：募資金額的 5%</li>
              <li>• 金流處理費：依支付方式而定</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">撥款時程</h3>
            <p className="text-muted-foreground leading-relaxed">
              募資活動結束後，款項將於 7-14 個工作日內撥款至您指定的帳戶。
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">注意事項</h3>
            <ul className="text-muted-foreground space-y-2">
              <li>• 請確保提供真實、準確的資訊</li>
              <li>• 禁止用於非法或不當用途</li>
              <li>• 平台保有審核與下架的權利</li>
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ServiceGuidePage;
