import { ArrowLeft, ExternalLink } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

interface PageLinkProps {
  name: string;
  component: string;
  route?: string;
  isComponent?: boolean;
}

const PageLink = ({ name, component, route, isComponent }: PageLinkProps) => {
  if (route) {
    return (
      <Link
        to={route}
        className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 hover:bg-primary/20 rounded text-primary text-xs font-medium transition-colors"
      >
        {name}
        <ExternalLink size={10} />
      </Link>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${isComponent ? "bg-secondary text-muted-foreground" : "bg-accent/50 text-accent-foreground"}`}
    >
      {name}
    </span>
  );
};

const ArchitecturePage = () => {
  const navigate = useNavigate();

  const pages: PageLinkProps[] = [
    // Main Entry
    { name: "首頁", component: "Index", route: "/" },
    { name: "LINE 授權", component: "LineAuthPage", isComponent: true },

    // Navigation
    { name: "側邊選單", component: "SlideMenu", isComponent: true },
    { name: "所有募資活動", component: "AllCampaigns", isComponent: true },
    { name: "提案紀錄", component: "ProposalsLog", isComponent: true },
    { name: "贊助紀錄", component: "DonationsLog", isComponent: true },
    { name: "提案詳情", component: "ProposalDetail", isComponent: true },

    // Products
    { name: "商品列表", component: "ProductGrid", isComponent: true },
    { name: "商品詳情", component: "ProductDrawer", isComponent: true },
    { name: "願望清單", component: "CartDrawer", isComponent: true },

    // Funding Selection
    { name: "募資類型選擇", component: "FundingSelection", isComponent: true },

    // Personal Flow
    { name: "邀請設定", component: "InvitationSettings", isComponent: true },
    { name: "邀請確認", component: "InvitationConfirm", isComponent: true },
    { name: "邀請分享", component: "InvitationShare", isComponent: true },
    { name: "好友選擇器", component: "LineFriendSelector", isComponent: true },
    { name: "LINE 聊天室", component: "LineChatRoom", isComponent: true },
    { name: "參與募資", component: "AttendFundraising", isComponent: true },
    { name: "付款表單", component: "PaymentForm", isComponent: true },
    { name: "信用卡表單", component: "CreditCardForm", isComponent: true },
    { name: "LINE Pay 表單", component: "LinePayForm", isComponent: true },
    { name: "付款完成", component: "PaymentComplete", isComponent: true },

    // Public Flow
    { name: "主持人設定", component: "PublicHostSettings", isComponent: true },
    { name: "公開邀請設定", component: "PublicInvitationSettings", isComponent: true },
    { name: "公開邀請確認", component: "PublicInvitationConfirm", isComponent: true },
    { name: "公開邀請分享", component: "PublicInvitationShare", isComponent: true },
    { name: "公開募資參與", component: "PublicAttendFundraising", isComponent: true },
    { name: "公開付款表單", component: "PublicPaymentForm", isComponent: true },
    { name: "公開付款完成", component: "PublicPaymentComplete", isComponent: true },

    // Static Pages
    { name: "關於我們", component: "AboutPage", route: "/about" },
    { name: "贊助政策", component: "SponsorPolicyPage", route: "/sponsor-policy" },
    { name: "服務指南", component: "ServiceGuidePage", route: "/service-guide" },
    { name: "服務條款", component: "TermsPage", route: "/terms" },
    { name: "隱私政策", component: "PrivacyPage", route: "/privacy" },
    { name: "常見問題", component: "FAQPage", route: "/faq" },
    { name: "聯絡我們", component: "ContactPage", route: "/contact" },
  ];

  const routedPages = pages.filter((p) => p.route);
  const componentPages = pages.filter((p) => p.isComponent);

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

        {/* Legend */}
        <section className="bg-card rounded-lg p-4 border border-border">
          <h2 className="text-base font-semibold text-foreground mb-3">圖例說明</h2>
          <div className="flex flex-wrap gap-3 text-sm">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">頁面</span>
              <span className="text-muted-foreground">可點擊的路由頁面</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-secondary text-muted-foreground rounded text-xs">元件</span>
              <span className="text-muted-foreground">內部元件（無獨立路由）</span>
            </div>
          </div>
        </section>

        {/* Routed Pages */}
        <section className="bg-card rounded-lg p-4 border border-border">
          <h2 className="text-base font-semibold text-foreground mb-3">路由頁面（可直接存取）</h2>
          <div className="flex flex-wrap gap-2">
            {routedPages.map((page) => (
              <PageLink key={page.component} {...page} />
            ))}
          </div>
        </section>

        {/* Main Flow */}
        <section className="bg-card rounded-lg p-4 border border-border">
          <h2 className="text-base font-semibold text-foreground mb-2">首頁入口流程</h2>
          <p className="text-sm text-muted-foreground mb-4">
            使用者進入首頁後，可瀏覽商品列表並點選商品查看詳情，加入願望清單後可進行發起募資的流程。亦可透過側邊選單存取募資活動與紀錄管理功能。
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <PageLink name="首頁" component="Index" route="/" />
              <span className="text-muted-foreground">→</span>
              <PageLink name="商品列表" component="ProductGrid" isComponent />
              <span className="text-muted-foreground">→</span>
              <PageLink name="商品詳情" component="ProductDrawer" isComponent />
              <span className="text-muted-foreground">→</span>
              <PageLink name="願望清單" component="CartDrawer" isComponent />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <PageLink name="首頁" component="Index" route="/" />
              <span className="text-muted-foreground">→</span>
              <PageLink name="側邊選單" component="SlideMenu" isComponent />
              <span className="text-muted-foreground">→</span>
              <span className="text-xs text-muted-foreground">（所有募資活動 / 提案紀錄 / 贊助紀錄）</span>
            </div>
          </div>
        </section>

        {/* Funding Selection */}
        <section className="bg-card rounded-lg p-4 border border-border">
          <h2 className="text-base font-semibold text-foreground mb-2">募資類型選擇</h2>
          <p className="text-sm text-muted-foreground mb-4">
            完成購物車商品選擇後，使用者需選擇募資類型。「個人募資」適用於親友間的禮物募集，「公益募資」則適用於公益活動。
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <PageLink name="願望清單" component="CartDrawer" isComponent />
            <span className="text-muted-foreground">→</span>
            <PageLink name="募資類型選擇" component="FundingSelection" isComponent />
            <span className="text-muted-foreground">→</span>
            <span className="text-xs text-muted-foreground">（個人募資 / 公益募資）</span>
          </div>
        </section>

        {/* Personal Fundraising Flow */}
        <section className="bg-card rounded-lg p-4 border border-border">
          <h2 className="text-base font-semibold text-foreground mb-2">個人募資流程</h2>
          <p className="text-sm text-muted-foreground mb-4">
            主辦人設定邀請函內容並確認後，可透過 LINE
            或網址分享給親友。受邀者點擊連結後可查看募資詳情並選擇贊助金額，最後透過信用卡或 LINE Pay 完成付款。
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <PageLink name="邀請設定" component="InvitationSettings" isComponent />
              <span className="text-muted-foreground">→</span>
              <PageLink name="邀請確認" component="InvitationConfirm" isComponent />
              <span className="text-muted-foreground">→</span>
              <PageLink name="邀請分享" component="InvitationShare" isComponent />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-muted-foreground ml-4">↓</span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <PageLink name="好友選擇器" component="LineFriendSelector" isComponent />
              <span className="text-muted-foreground">→</span>
              <PageLink name="LINE 聊天室" component="LineChatRoom" isComponent />
              <span className="text-muted-foreground">→</span>
              <PageLink name="參與募資" component="AttendFundraising" isComponent />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-muted-foreground ml-4">↓</span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <PageLink name="付款表單" component="PaymentForm" isComponent />
              <span className="text-muted-foreground">→</span>
              <span className="text-xs text-muted-foreground">(</span>
              <PageLink name="信用卡表單" component="CreditCardForm" isComponent />
              <span className="text-xs text-muted-foreground">/</span>
              <PageLink name="LINE Pay" component="LinePayForm" isComponent />
              <span className="text-xs text-muted-foreground">)</span>
              <span className="text-muted-foreground">→</span>
              <PageLink name="付款完成" component="PaymentComplete" isComponent />
            </div>
          </div>
        </section>

        {/* Public Fundraising Flow */}
        <section className="bg-card rounded-lg p-4 border border-border">
          <h2 className="text-base font-semibold text-foreground mb-2">公益募資流程</h2>
          <p className="text-sm text-muted-foreground mb-4">
            主持人先設定個人資訊與公開募資活動內容，確認後可分享募資連結至社群平台。任何人透過連結皆可參與贊助，填寫資料後完成付款。
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <PageLink name="主持人設定" component="PublicHostSettings" isComponent />
              <span className="text-muted-foreground">→</span>
              <PageLink name="公開邀請設定" component="PublicInvitationSettings" isComponent />
              <span className="text-muted-foreground">→</span>
              <PageLink name="公開邀請確認" component="PublicInvitationConfirm" isComponent />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-muted-foreground ml-4">↓</span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <PageLink name="公開邀請分享" component="PublicInvitationShare" isComponent />
              <span className="text-muted-foreground">→</span>
              <PageLink name="公開募資參與" component="PublicAttendFundraising" isComponent />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-muted-foreground ml-4">↓</span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <PageLink name="公開付款表單" component="PublicPaymentForm" isComponent />
              <span className="text-muted-foreground">→</span>
              <PageLink name="公開付款完成" component="PublicPaymentComplete" isComponent />
            </div>
          </div>
        </section>

        {/* Proposals & Records */}
        <section className="bg-card rounded-lg p-4 border border-border">
          <h2 className="text-base font-semibold text-foreground mb-2">紀錄管理</h2>
          <p className="text-sm text-muted-foreground mb-4">
            使用者可透過提案紀錄查看自己發起的募資活動詳情與進度，亦可瀏覽所有公開的募資活動進行贊助。贊助紀錄則記錄個人的歷史贊助項目。
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <PageLink name="提案紀錄" component="ProposalsLog" isComponent />
              <span className="text-muted-foreground">→</span>
              <PageLink name="提案詳情" component="ProposalDetail" isComponent />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <PageLink name="所有募資活動" component="AllCampaigns" isComponent />
              <span className="text-muted-foreground">→</span>
              <PageLink name="公開募資參與" component="PublicAttendFundraising" isComponent />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <PageLink name="贊助紀錄" component="DonationsLog" isComponent />
            </div>
          </div>
        </section>

        {/* Static Pages */}
        <section className="bg-card rounded-lg p-4 border border-border">
          <h2 className="text-base font-semibold text-foreground mb-2">靜態頁面（Footer 連結）</h2>
          <p className="text-sm text-muted-foreground mb-4">
            提供平台的基本資訊與政策說明，使用者可從頁面底部的 Footer 區域存取這些頁面。
          </p>
          <div className="grid grid-cols-2 gap-2">
            <PageLink name="關於我們" component="AboutPage" route="/about" />
            <PageLink name="贊助政策" component="SponsorPolicyPage" route="/sponsor-policy" />
            <PageLink name="服務指南" component="ServiceGuidePage" route="/service-guide" />
            <PageLink name="服務條款" component="TermsPage" route="/terms" />
            <PageLink name="隱私政策" component="PrivacyPage" route="/privacy" />
            <PageLink name="常見問題" component="FAQPage" route="/faq" />
            <PageLink name="聯絡我們" component="ContactPage" route="/contact" />
            <PageLink name="架構圖" component="ArchitecturePage" route="/architecture" />
          </div>
        </section>

        {/* Page Statistics */}
        <section className="bg-card rounded-lg p-4 border border-border">
          <h2 className="text-base font-semibold text-foreground mb-3">頁面統計</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-primary/10 rounded-lg">
              <div className="text-2xl font-bold text-primary">{routedPages.length}</div>
              <div className="text-xs text-muted-foreground">路由頁面</div>
            </div>
            <div className="text-center p-3 bg-secondary rounded-lg">
              <div className="text-2xl font-bold text-foreground">{componentPages.length}</div>
              <div className="text-xs text-muted-foreground">內部元件</div>
            </div>
            <div className="text-center p-3 bg-accent rounded-lg">
              <div className="text-2xl font-bold text-accent-foreground">12</div>
              <div className="text-xs text-muted-foreground">個人募資流程</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-foreground">7</div>
              <div className="text-xs text-muted-foreground">公益募資流程</div>
            </div>
          </div>
        </section>

        {/* Last Updated */}
        <div className="text-center text-xs text-muted-foreground py-4">最後更新：2026 年 1 月</div>
      </div>
    </div>
  );
};

export default ArchitecturePage;
