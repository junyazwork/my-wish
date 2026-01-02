import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold">關於我們</h1>
          <div className="w-10" />
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-4 py-6">
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-bold mb-3">MY WISH ONLINE</h2>
            <p className="text-muted-foreground leading-relaxed">
              MY WISH ONLINE 是一個創新的願望實現平台，致力於幫助每個人實現心中的願望。
              我們相信，每個願望都值得被重視，每個夢想都應該有機會實現。
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">我們的使命</h3>
            <p className="text-muted-foreground leading-relaxed">
              透過科技與社群的力量，連結願望與支持者，創造一個互助、溫暖的募資環境。
              無論是個人願望還是公益活動，我們都提供安全、透明的平台服務。
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">核心價值</h3>
            <ul className="text-muted-foreground space-y-2">
              <li>• <strong>信任</strong> - 建立安全可靠的交易環境</li>
              <li>• <strong>透明</strong> - 公開透明的資金流向</li>
              <li>• <strong>溫暖</strong> - 傳遞關懷與善意</li>
              <li>• <strong>創新</strong> - 持續優化使用體驗</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">聯絡資訊</h3>
            <div className="text-muted-foreground space-y-1">
              <p>願望實現股份有限公司</p>
              <p>電子郵件：contact@mywishonline.com</p>
              <p>客服專線：02-1234-5678</p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
