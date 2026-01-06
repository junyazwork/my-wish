import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ERDiagramPage = () => {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link
            to="/architecture"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft size={20} />
            <span>返回架構總覽</span>
          </Link>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2">
          🗂️ Entity-Relationship Diagram
        </h1>
        <p className="text-muted-foreground mb-8">
          資料庫實體關係圖 - 描述系統中各實體之間的關聯
        </p>

        {/* ERD Diagram */}
        <section className="bg-card rounded-lg border p-6 mb-8">
          <h2 className="text-lg font-bold mb-4">資料模型關係圖</h2>
          <div className="overflow-x-auto">
            <pre className="text-sm bg-muted/50 p-4 rounded-lg overflow-x-auto">
{`
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                    Entity Relationship Diagram                           │
└─────────────────────────────────────────────────────────────────────────────────────────┘

    ┌──────────────┐         ┌──────────────────┐         ┌──────────────┐
    │     User     │         │     Campaign     │         │    Product   │
    ├──────────────┤         ├──────────────────┤         ├──────────────┤
    │ PK id        │────┐    │ PK id            │    ┌────│ PK id        │
    │    name      │    │    │ FK host_id       │────┤    │    name      │
    │    email     │    └───▶│    title         │    │    │    price     │
    │    avatar    │         │    description   │    │    │    image     │
    │    phone     │         │    type          │    │    │    category  │
    │    created_at│         │    status        │    │    │    subcategory│
    └──────────────┘         │    deadline      │    │    └──────────────┘
           │                 │    goal_amount   │    │           │
           │                 │    visibility    │    │           │
           │                 │    created_at    │    │           │
           │                 └──────────────────┘    │           │
           │                         │               │           │
           │                         │               │           │
           │    ┌────────────────────┼───────────────┘           │
           │    │                    │                           │
           │    │                    ▼                           │
           │    │         ┌──────────────────┐                   │
           │    │         │  CampaignProduct │                   │
           │    │         ├──────────────────┤                   │
           │    │         │ PK id            │                   │
           │    │         │ FK campaign_id   │◀──────────────────┤
           │    │         │ FK product_id    │───────────────────┘
           │    │         │    quantity      │
           │    │         └──────────────────┘
           │    │
           │    │
           ▼    ▼
    ┌──────────────────┐         ┌──────────────────┐
    │    Donation      │         │   MediaItem      │
    ├──────────────────┤         ├──────────────────┤
    │ PK id            │         │ PK id            │
    │ FK campaign_id   │◀────────│ FK campaign_id   │
    │ FK donor_id      │         │    url           │
    │ FK product_id    │         │    type          │
    │    amount        │         │    order         │
    │    quantity      │         └──────────────────┘
    │    message       │
    │    is_anonymous  │
    │    payment_method│
    │    status        │
    │    created_at    │
    └──────────────────┘
           │
           │
           ▼
    ┌──────────────────┐         ┌──────────────────┐
    │   Invitation     │         │   Notification   │
    ├──────────────────┤         ├──────────────────┤
    │ PK id            │         │ PK id            │
    │ FK campaign_id   │         │ FK user_id       │
    │ FK inviter_id    │         │ FK campaign_id   │
    │ FK invitee_id    │         │    type          │
    │    status        │         │    message       │
    │    sent_via      │         │    is_read       │
    │    created_at    │         │    created_at    │
    └──────────────────┘         └──────────────────┘

`}
            </pre>
          </div>
        </section>

        {/* Entity Descriptions */}
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <div className="bg-card rounded-lg border p-4">
            <h3 className="font-bold text-primary mb-2">👤 User</h3>
            <p className="text-sm text-muted-foreground mb-2">系統使用者，可以是募資發起人或贊助者</p>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li>• id: 唯一識別碼</li>
              <li>• name: 使用者名稱</li>
              <li>• email: 電子郵件</li>
              <li>• avatar: 頭像圖片</li>
              <li>• phone: 聯絡電話</li>
            </ul>
          </div>

          <div className="bg-card rounded-lg border p-4">
            <h3 className="font-bold text-primary mb-2">🎯 Campaign</h3>
            <p className="text-sm text-muted-foreground mb-2">募資活動，包含個人禮物募資與公益募資</p>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li>• id: 唯一識別碼</li>
              <li>• host_id: 發起人 (FK → User)</li>
              <li>• type: 類型 (personal/public)</li>
              <li>• status: 狀態 (active/completed/cancelled)</li>
              <li>• visibility: 可見性設定</li>
            </ul>
          </div>

          <div className="bg-card rounded-lg border p-4">
            <h3 className="font-bold text-primary mb-2">🛍️ Product</h3>
            <p className="text-sm text-muted-foreground mb-2">可贊助的商品項目</p>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li>• id: 唯一識別碼</li>
              <li>• name: 商品名稱</li>
              <li>• price: 價格</li>
              <li>• category: 分類</li>
              <li>• subcategory: 子分類</li>
            </ul>
          </div>

          <div className="bg-card rounded-lg border p-4">
            <h3 className="font-bold text-primary mb-2">💝 Donation</h3>
            <p className="text-sm text-muted-foreground mb-2">贊助紀錄，記錄每筆贊助詳情</p>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li>• campaign_id: 所屬活動 (FK)</li>
              <li>• donor_id: 贊助者 (FK → User)</li>
              <li>• product_id: 贊助商品 (FK)</li>
              <li>• amount: 金額</li>
              <li>• payment_method: 付款方式</li>
            </ul>
          </div>

          <div className="bg-card rounded-lg border p-4">
            <h3 className="font-bold text-primary mb-2">🔗 CampaignProduct</h3>
            <p className="text-sm text-muted-foreground mb-2">活動與商品的關聯表</p>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li>• campaign_id: 所屬活動 (FK)</li>
              <li>• product_id: 商品 (FK)</li>
              <li>• quantity: 需求數量</li>
            </ul>
          </div>

          <div className="bg-card rounded-lg border p-4">
            <h3 className="font-bold text-primary mb-2">📷 MediaItem</h3>
            <p className="text-sm text-muted-foreground mb-2">活動相關媒體檔案</p>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li>• campaign_id: 所屬活動 (FK)</li>
              <li>• url: 媒體網址</li>
              <li>• type: 類型 (image/video)</li>
              <li>• order: 顯示順序</li>
            </ul>
          </div>

          <div className="bg-card rounded-lg border p-4">
            <h3 className="font-bold text-primary mb-2">✉️ Invitation</h3>
            <p className="text-sm text-muted-foreground mb-2">邀請記錄</p>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li>• campaign_id: 所屬活動 (FK)</li>
              <li>• inviter_id: 邀請人 (FK)</li>
              <li>• invitee_id: 被邀請人 (FK)</li>
              <li>• sent_via: 發送方式 (LINE/email)</li>
            </ul>
          </div>

          <div className="bg-card rounded-lg border p-4">
            <h3 className="font-bold text-primary mb-2">🔔 Notification</h3>
            <p className="text-sm text-muted-foreground mb-2">系統通知</p>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li>• user_id: 接收者 (FK)</li>
              <li>• campaign_id: 相關活動 (FK)</li>
              <li>• type: 通知類型</li>
              <li>• is_read: 已讀狀態</li>
            </ul>
          </div>
        </section>

        {/* Relationships */}
        <section className="bg-card rounded-lg border p-6">
          <h2 className="text-lg font-bold mb-4">關聯說明</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-mono">1:N</span>
              <span>User → Campaign: 一個使用者可以發起多個募資活動</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-mono">1:N</span>
              <span>User → Donation: 一個使用者可以進行多次贊助</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-mono">M:N</span>
              <span>Campaign ↔ Product: 透過 CampaignProduct 建立多對多關聯</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-mono">1:N</span>
              <span>Campaign → Donation: 一個活動可以收到多筆贊助</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-mono">1:N</span>
              <span>Campaign → MediaItem: 一個活動可以有多個媒體項目</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-mono">1:N</span>
              <span>Campaign → Invitation: 一個活動可以發送多份邀請</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ERDiagramPage;
