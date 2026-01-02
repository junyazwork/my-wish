import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Footer from "@/components/Footer";

const FAQPage = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      question: "如何發起募資活動？",
      answer: "選擇想要的商品加入願望清單，點擊確認後選擇募資類型（私人或公開），填寫活動資訊後即可發起募資。"
    },
    {
      question: "贊助後可以退款嗎？",
      answer: "若募資活動未達標，將自動全額退款。若活動已成功且款項已撥付，則需聯繫提案者協商退款事宜。"
    },
    {
      question: "募資成功後多久可以收到款項？",
      answer: "募資活動結束後，款項將於 7-14 個工作日內撥款至您指定的帳戶。"
    },
    {
      question: "平台收取多少手續費？",
      answer: "募資成功時，平台會收取募資金額的 5% 作為服務手續費，另加金流處理費用。"
    },
    {
      question: "私人募資和公開募資有什麼差別？",
      answer: "私人募資僅透過 LINE 分享給指定好友，不會公開展示。公開募資則會顯示在平台上供所有用戶參與。"
    },
    {
      question: "如何修改或取消募資活動？",
      answer: "進入「我的提案」頁面，選擇要修改的活動。若活動尚未有人贊助，可以修改內容或取消活動。"
    },
    {
      question: "支援哪些付款方式？",
      answer: "目前支援信用卡和 LINE Pay 兩種付款方式，所有交易皆經過安全加密處理。"
    },
    {
      question: "如何聯繫客服？",
      answer: "您可以透過「聯絡我們」頁面發送訊息，或撥打客服專線 02-1234-5678，服務時間為週一至週五 9:00-18:00。"
    },
    {
      question: "商品由誰負責配送？",
      answer: "商品配送由各商家負責。募資成功後，款項撥付給提案者，由提案者自行購買商品或由商家直接配送。"
    },
    {
      question: "如何保障我的贊助安全？",
      answer: "所有款項由第三方金融機構代管，採用 SSL 加密技術，並有完整的退款保障機制保護您的權益。"
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold">常見問題</h1>
          <div className="w-10" />
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-4 py-6">
        <div className="space-y-4">
          <p className="text-muted-foreground">
            找不到答案？歡迎聯繫我們的客服團隊。
          </p>
          
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQPage;
