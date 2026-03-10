import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";

const ReturnPolicyPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex items-center gap-3 p-4 border-b border-border">
        <button onClick={() => navigate(-1)} className="p-1 text-foreground">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-semibold text-foreground">退換貨流程</h1>
      </div>

      <div className="flex-1 px-6 py-8 space-y-8">
        <section>
          <h2 className="text-base font-bold text-foreground mb-3">一、退換貨政策說明</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            為保障您的消費權益，MY WISH ONLINE 提供完善的退換貨服務。請於收到商品後 7 天內提出退換貨申請，逾期恕不受理。
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-foreground mb-3">二、退換貨條件</h2>
          <ul className="text-sm text-muted-foreground leading-relaxed space-y-2 list-disc list-inside">
            <li>商品未經使用、未拆封，且保持原始包裝完整。</li>
            <li>商品附帶之配件、贈品、保證書等需一併退回。</li>
            <li>因個人因素（如不喜歡、尺寸不合等）申請退換貨，運費由消費者自行負擔。</li>
            <li>商品瑕疵或寄送錯誤，運費由平台負擔。</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-foreground mb-3">三、退換貨流程</h2>
          <ol className="text-sm text-muted-foreground leading-relaxed space-y-3 list-decimal list-inside">
            <li>透過「聯絡我們」頁面或 LINE 客服提出退換貨申請，並提供訂單編號及商品照片。</li>
            <li>客服人員將於 1-2 個工作天內審核並回覆。</li>
            <li>審核通過後，請依照指示將商品寄回指定地址。</li>
            <li>平台收到退回商品並確認無誤後，將於 5-7 個工作天內完成退款或換貨。</li>
          </ol>
        </section>

        <section>
          <h2 className="text-base font-bold text-foreground mb-3">四、不適用退換貨之情形</h2>
          <ul className="text-sm text-muted-foreground leading-relaxed space-y-2 list-disc list-inside">
            <li>已拆封或使用過之商品。</li>
            <li>個人衛生用品（如貼身衣物、美妝保養品等）。</li>
            <li>客製化商品或依消費者要求所製作之商品。</li>
            <li>超過退換貨申請期限之商品。</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-foreground mb-3">五、退款方式</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            退款將以原付款方式退回。信用卡付款者，退款將退至原信用卡帳戶，實際入帳時間依各發卡銀行作業時間而定。LINE Pay 付款者，退款將退回至 LINE Pay 帳戶。
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-foreground mb-3">六、聯繫方式</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            如有任何退換貨相關問題，歡迎透過「聯絡我們」頁面與客服團隊聯繫，我們將竭誠為您服務。
          </p>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default ReturnPolicyPage;
