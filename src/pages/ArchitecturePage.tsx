import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ArchitecturePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <button onClick={() => navigate(-1)} className="text-foreground">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-semibold text-foreground">頁面架構圖</h1>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Overview */}
        <section className="bg-card rounded-lg p-4 border border-border">
          <h2 className="text-base font-semibold text-foreground mb-2">系統概覽</h2>
          <p className="text-sm text-muted-foreground">
            此架構圖展示 MY WISH ONLINE 平台的完整頁面結構，包含個人募資與公開募資兩大流程。
          </p>
        </section>

        {/* Architecture Diagram */}
        <section className="bg-card rounded-lg p-4 border border-border overflow-x-auto">
          <h2 className="text-base font-semibold text-foreground mb-4">頁面流程圖</h2>
          <div className="min-w-[800px] text-xs">
            <pre className="whitespace-pre text-muted-foreground font-mono leading-relaxed">
{`
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                     首頁入口                                              │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                          │
│  ┌──────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐            │
│  │  首頁    │────▶│  商品列表    │────▶│  商品詳情    │────▶│  購物車      │            │
│  │ (Index)  │     │ (ProductGrid)│     │(ProductDrawer│     │ (CartDrawer) │            │
│  └────┬─────┘     └──────────────┘     └──────────────┘     └──────────────┘            │
│       │                                                                                  │
│       ▼                                                                                  │
│  ┌──────────┐                                                                            │
│  │ 側邊選單 │                                                                            │
│  │(SlideMenu│                                                                            │
│  └────┬─────┘                                                                            │
│       │                                                                                  │
│       ├──────────────────────────────────────────────────────────────────┐               │
│       │                                                                   │               │
│       ▼                                                                   ▼               │
│  ┌──────────────┐                                              ┌──────────────┐          │
│  │ 所有募資活動 │                                              │  提案紀錄    │          │
│  │(AllCampaigns)│                                              │(ProposalsLog)│          │
│  └──────┬───────┘                                              └──────┬───────┘          │
│         │                                                              │                  │
│         ▼                                                              ▼                  │
│  ┌──────────────┐                                              ┌──────────────┐          │
│  │ 公開募資詳情 │                                              │  提案詳情    │          │
│  │(PublicAttend)│                                              │(ProposalDetail│          │
│  └──────────────┘                                              └──────────────┘          │
│                                                                                          │
└──────────────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                  募資類型選擇                                            │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                          │
│                            ┌──────────────────┐                                          │
│                            │   募資類型選擇   │                                          │
│                            │(FundingSelection)│                                          │
│                            └────────┬─────────┘                                          │
│                                     │                                                    │
│              ┌──────────────────────┴──────────────────────┐                             │
│              │                                              │                             │
│              ▼                                              ▼                             │
│  ┌───────────────────────┐                    ┌───────────────────────┐                  │
│  │      個人募資流程      │                    │      公開募資流程      │                  │
│  └───────────┬───────────┘                    └───────────┬───────────┘                  │
│              │                                              │                             │
│              ▼                                              ▼                             │
│  ┌───────────────────┐                        ┌───────────────────┐                      │
│  │  邀請設定          │                        │  主持人設定        │                      │
│  │(InvitationSettings)│                        │(PublicHostSettings)│                      │
│  └─────────┬─────────┘                        └─────────┬─────────┘                      │
│            │                                              │                               │
│            ▼                                              ▼                               │
│  ┌───────────────────┐                        ┌───────────────────────┐                  │
│  │  邀請確認          │                        │  公開邀請設定          │                  │
│  │(InvitationConfirm) │                        │(PublicInvitationSettings│                  │
│  └─────────┬─────────┘                        └─────────┬─────────────┘                  │
│            │                                              │                               │
│            ▼                                              ▼                               │
│  ┌───────────────────┐                        ┌───────────────────────┐                  │
│  │  邀請分享          │                        │  公開邀請確認          │                  │
│  │(InvitationShare)   │                        │(PublicInvitationConfirm)│                  │
│  └─────────┬─────────┘                        └─────────┬─────────────┘                  │
│            │                                              │                               │
│            ▼                                              ▼                               │
│  ┌───────────────────┐                        ┌───────────────────────┐                  │
│  │  好友選擇器        │                        │  公開邀請分享          │                  │
│  │(LineFriendSelector)│                        │(PublicInvitationShare)  │                  │
│  └─────────┬─────────┘                        └─────────┬─────────────┘                  │
│            │                                              │                               │
│            ▼                                              ▼                               │
│  ┌───────────────────┐                        ┌───────────────────────┐                  │
│  │  LINE 聊天室       │                        │  公開募資參與          │                  │
│  │ (LineChatRoom)     │                        │(PublicAttendFundraising)│                  │
│  └─────────┬─────────┘                        └─────────┬─────────────┘                  │
│            │                                              │                               │
│            ▼                                              ▼                               │
│  ┌───────────────────┐                        ┌───────────────────────┐                  │
│  │  參與募資          │                        │  公開付款表單          │                  │
│  │(AttendFundraising) │                        │(PublicPaymentForm)      │                  │
│  └─────────┬─────────┘                        └─────────┬─────────────┘                  │
│            │                                              │                               │
│            ▼                                              ▼                               │
│  ┌───────────────────┐                        ┌───────────────────────┐                  │
│  │  付款表單          │                        │  公開付款完成          │                  │
│  │ (PaymentForm)      │                        │(PublicPaymentComplete)  │                  │
│  └─────────┬─────────┘                        └───────────────────────┘                  │
│            │                                                                              │
│            ├─────────────────┐                                                            │
│            ▼                 ▼                                                            │
│  ┌───────────────────┐  ┌───────────────────┐                                            │
│  │  信用卡表單        │  │  LINE Pay 表單    │                                            │
│  │ (CreditCardForm)   │  │ (LinePayForm)     │                                            │
│  └─────────┬─────────┘  └─────────┬─────────┘                                            │
│            │                       │                                                      │
│            └───────────┬───────────┘                                                      │
│                        ▼                                                                  │
│              ┌───────────────────┐                                                        │
│              │  付款完成          │                                                        │
│              │ (PaymentComplete)  │                                                        │
│              └───────────────────┘                                                        │
│                                                                                          │
└──────────────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                    靜態頁面                                              │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │ 關於我們 │  │ 贊助政策 │  │ 服務指南 │  │ 服務條款 │  │ 隱私政策 │  │ 常見問題 │    │
│  │(AboutPage│  │(SponsorP)│  │(ServiceG)│  │(TermsPage│  │(PrivacyP)│  │ (FAQPage)│    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │
│                                                                                          │
│                              ┌──────────┐                                                │
│                              │ 聯絡我們 │                                                │
│                              │(ContactP)│                                                │
│                              └──────────┘                                                │
│                                                                                          │
└──────────────────────────────────────────────────────────────────────────────────────────┘
`}
            </pre>
          </div>
        </section>

        {/* Legend */}
        <section className="bg-card rounded-lg p-4 border border-border">
          <h2 className="text-base font-semibold text-foreground mb-3">圖例說明</h2>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-primary/20 rounded border border-primary"></div>
              <span className="text-muted-foreground">頁面元件</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">───▶</span>
              <span className="text-muted-foreground">導航流程</span>
            </div>
          </div>
        </section>

        {/* Page Statistics */}
        <section className="bg-card rounded-lg p-4 border border-border">
          <h2 className="text-base font-semibold text-foreground mb-3">頁面統計</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-primary/10 rounded-lg">
              <div className="text-2xl font-bold text-primary">8</div>
              <div className="text-xs text-muted-foreground">靜態頁面</div>
            </div>
            <div className="text-center p-3 bg-secondary rounded-lg">
              <div className="text-2xl font-bold text-foreground">12</div>
              <div className="text-xs text-muted-foreground">個人募資流程</div>
            </div>
            <div className="text-center p-3 bg-accent rounded-lg">
              <div className="text-2xl font-bold text-accent-foreground">8</div>
              <div className="text-xs text-muted-foreground">公開募資流程</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-foreground">30+</div>
              <div className="text-xs text-muted-foreground">總元件數</div>
            </div>
          </div>
        </section>

        {/* Last Updated */}
        <div className="text-center text-xs text-muted-foreground py-4">
          最後更新：2026 年 1 月
        </div>
      </div>
    </div>
  );
};

export default ArchitecturePage;
