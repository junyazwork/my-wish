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

    ┌──────────────────┐         ┌────────────────────────┐         ┌──────────────────┐
    │       User       │         │        Campaign        │         │     Product      │
    ├──────────────────┤         ├────────────────────────┤         ├──────────────────┤
    │ PK user_id       │────┐    │ PK campaign_id         │    ┌────│ PK product_id    │
    │    user_name     │    │    │ FK campaign_host_id    │────┤    │    product_name  │
    │    user_email    │    └───▶│    campaign_title      │    │    │    product_price │
    │    user_avatar   │         │    campaign_description│    │    │    product_image │
    │    user_phone    │         │    campaign_type       │    │    │    product_category│
    │    user_line_id  │         │    campaign_status     │    │    │    product_subcategory│
    │    user_created_at│        │    campaign_deadline   │    │    └──────────────────┘
    │    user_updated_at│        │    campaign_goal_amount│    │           │
    └──────────────────┘         │    campaign_visibility │    │           │
           │                     │    campaign_created_at │    │           │
           │                     └────────────────────────┘    │           │
           │                             │                     │           │
           │    ┌────────────────────────┼─────────────────────┘           │
           │    │                        │                                 │
           │    │                        ▼                                 │
           │    │            ┌────────────────────────┐                    │
           │    │            │    CampaignProduct     │                    │
           │    │            ├────────────────────────┤                    │
           │    │            │ PK cp_id               │                    │
           │    │            │ FK cp_campaign_id      │◀───────────────────┤
           │    │            │ FK cp_product_id       │────────────────────┘
           │    │            │    cp_quantity         │
           │    │            │    cp_funded_quantity  │
           │    │            └────────────────────────┘
           │    │
           ▼    ▼
    ┌────────────────────────┐         ┌────────────────────────┐
    │       Donation         │         │       MediaItem        │
    ├────────────────────────┤         ├────────────────────────┤
    │ PK donation_id         │         │ PK media_id            │
    │ FK donation_campaign_id│◀────────│ FK media_campaign_id   │
    │ FK donation_donor_id   │         │    media_url           │
    │ FK donation_product_id │         │    media_type          │
    │    donation_amount     │         │    media_order_index   │
    │    donation_quantity   │         └────────────────────────┘
    │    donation_message    │
    │    donation_donor_name │
    │    donation_is_anonymous│
    │    donation_payment_method│
    │    donation_status     │
    │    donation_created_at │
    └────────────────────────┘
           │
           │
           ▼
    ┌────────────────────────┐         ┌────────────────────────┐
    │      Invitation        │         │     Notification       │
    ├────────────────────────┤         ├────────────────────────┤
    │ PK invitation_id       │         │ PK notification_id     │
    │ FK invitation_campaign_id│       │ FK notification_user_id│
    │ FK invitation_inviter_id│        │ FK notification_campaign_id│
    │ FK invitation_invitee_id│        │    notification_type   │
    │    invitation_invitee_contact│   │    notification_title  │
    │    invitation_status   │         │    notification_message│
    │    invitation_sent_via │         │    notification_is_read│
    │    invitation_created_at│        │    notification_created_at│
    └────────────────────────┘         └────────────────────────┘

`}
            </pre>
          </div>
        </section>

        {/* Detailed Schema Definitions */}
        <section className="space-y-6 mb-8">
          <h2 className="text-lg font-bold">📋 資料表欄位詳細定義</h2>
          
          {/* User Table */}
          <div className="bg-card rounded-lg border overflow-hidden">
            <div className="bg-primary/10 px-4 py-3 border-b">
              <h3 className="font-bold text-primary">👤 User (使用者)</h3>
              <p className="text-xs text-muted-foreground">系統使用者，可以是募資發起人或贊助者</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left px-4 py-2 font-medium">欄位名稱</th>
                    <th className="text-left px-4 py-2 font-medium">資料型態</th>
                    <th className="text-left px-4 py-2 font-medium">約束條件</th>
                    <th className="text-left px-4 py-2 font-medium">說明</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr><td className="px-4 py-2 font-mono text-xs">user_id</td><td className="px-4 py-2 font-mono text-xs">UUID</td><td className="px-4 py-2"><span className="bg-primary/20 text-primary text-xs px-1.5 py-0.5 rounded">PK</span></td><td className="px-4 py-2 text-muted-foreground">唯一識別碼</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs">user_name</td><td className="px-4 py-2 font-mono text-xs">VARCHAR(100)</td><td className="px-4 py-2"><span className="bg-destructive/20 text-destructive text-xs px-1.5 py-0.5 rounded">NOT NULL</span></td><td className="px-4 py-2 text-muted-foreground">使用者名稱</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs">user_email</td><td className="px-4 py-2 font-mono text-xs">VARCHAR(255)</td><td className="px-4 py-2"><span className="bg-destructive/20 text-destructive text-xs px-1.5 py-0.5 rounded">NOT NULL</span> <span className="bg-accent/50 text-accent-foreground text-xs px-1.5 py-0.5 rounded">UNIQUE</span></td><td className="px-4 py-2 text-muted-foreground">電子郵件（唯一）</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs">user_avatar</td><td className="px-4 py-2 font-mono text-xs">TEXT</td><td className="px-4 py-2"><span className="bg-muted text-muted-foreground text-xs px-1.5 py-0.5 rounded">NULLABLE</span></td><td className="px-4 py-2 text-muted-foreground">頭像圖片 URL</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs">user_phone</td><td className="px-4 py-2 font-mono text-xs">VARCHAR(20)</td><td className="px-4 py-2"><span className="bg-muted text-muted-foreground text-xs px-1.5 py-0.5 rounded">NULLABLE</span></td><td className="px-4 py-2 text-muted-foreground">聯絡電話</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs">user_line_id</td><td className="px-4 py-2 font-mono text-xs">VARCHAR(50)</td><td className="px-4 py-2"><span className="bg-muted text-muted-foreground text-xs px-1.5 py-0.5 rounded">NULLABLE</span> <span className="bg-accent/50 text-accent-foreground text-xs px-1.5 py-0.5 rounded">UNIQUE</span></td><td className="px-4 py-2 text-muted-foreground">LINE 用戶 ID</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs">user_created_at</td><td className="px-4 py-2 font-mono text-xs">TIMESTAMPTZ</td><td className="px-4 py-2"><span className="bg-secondary text-secondary-foreground text-xs px-1.5 py-0.5 rounded">DEFAULT NOW()</span></td><td className="px-4 py-2 text-muted-foreground">建立時間</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs">user_updated_at</td><td className="px-4 py-2 font-mono text-xs">TIMESTAMPTZ</td><td className="px-4 py-2"><span className="bg-secondary text-secondary-foreground text-xs px-1.5 py-0.5 rounded">DEFAULT NOW()</span></td><td className="px-4 py-2 text-muted-foreground">更新時間</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Campaign Table */}
          <div className="bg-card rounded-lg border overflow-hidden">
            <div className="bg-primary/10 px-4 py-3 border-b">
              <h3 className="font-bold text-primary">🎯 Campaign (募資活動)</h3>
              <p className="text-xs text-muted-foreground">募資活動，包含個人禮物募資與公益募資</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left px-4 py-2 font-medium">欄位名稱</th>
                    <th className="text-left px-4 py-2 font-medium">資料型態</th>
                    <th className="text-left px-4 py-2 font-medium">約束條件</th>
                    <th className="text-left px-4 py-2 font-medium">說明</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr><td className="px-4 py-2 font-mono text-xs">campaign_id</td><td className="px-4 py-2 font-mono text-xs">UUID</td><td className="px-4 py-2"><span className="bg-primary/20 text-primary text-xs px-1.5 py-0.5 rounded">PK</span></td><td className="px-4 py-2 text-muted-foreground">唯一識別碼</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs">campaign_host_id</td><td className="px-4 py-2 font-mono text-xs">UUID</td><td className="px-4 py-2"><span className="bg-blue-500/20 text-blue-600 text-xs px-1.5 py-0.5 rounded">FK → User</span> <span className="bg-destructive/20 text-destructive text-xs px-1.5 py-0.5 rounded">NOT NULL</span></td><td className="px-4 py-2 text-muted-foreground">發起人 ID</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs">campaign_title</td><td className="px-4 py-2 font-mono text-xs">VARCHAR(200)</td><td className="px-4 py-2"><span className="bg-destructive/20 text-destructive text-xs px-1.5 py-0.5 rounded">NOT NULL</span></td><td className="px-4 py-2 text-muted-foreground">活動標題</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs">campaign_description</td><td className="px-4 py-2 font-mono text-xs">TEXT</td><td className="px-4 py-2"><span className="bg-muted text-muted-foreground text-xs px-1.5 py-0.5 rounded">NULLABLE</span></td><td className="px-4 py-2 text-muted-foreground">活動描述</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs">campaign_type</td><td className="px-4 py-2 font-mono text-xs">ENUM</td><td className="px-4 py-2"><span className="bg-destructive/20 text-destructive text-xs px-1.5 py-0.5 rounded">NOT NULL</span></td><td className="px-4 py-2 text-muted-foreground">'personal' | 'public'</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs">campaign_status</td><td className="px-4 py-2 font-mono text-xs">ENUM</td><td className="px-4 py-2"><span className="bg-secondary text-secondary-foreground text-xs px-1.5 py-0.5 rounded">DEFAULT 'draft'</span></td><td className="px-4 py-2 text-muted-foreground">'draft' | 'active' | 'completed' | 'cancelled'</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs">campaign_deadline</td><td className="px-4 py-2 font-mono text-xs">DATE</td><td className="px-4 py-2"><span className="bg-destructive/20 text-destructive text-xs px-1.5 py-0.5 rounded">NOT NULL</span></td><td className="px-4 py-2 text-muted-foreground">截止日期</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs">campaign_goal_amount</td><td className="px-4 py-2 font-mono text-xs">DECIMAL(12,2)</td><td className="px-4 py-2"><span className="bg-muted text-muted-foreground text-xs px-1.5 py-0.5 rounded">NULLABLE</span></td><td className="px-4 py-2 text-muted-foreground">目標金額（公益用）</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs">campaign_current_amount</td><td className="px-4 py-2 font-mono text-xs">DECIMAL(12,2)</td><td className="px-4 py-2"><span className="bg-secondary text-secondary-foreground text-xs px-1.5 py-0.5 rounded">DEFAULT 0</span></td><td className="px-4 py-2 text-muted-foreground">目前募得金額</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs">campaign_visibility</td><td className="px-4 py-2 font-mono text-xs">ENUM</td><td className="px-4 py-2"><span className="bg-secondary text-secondary-foreground text-xs px-1.5 py-0.5 rounded">DEFAULT 'private'</span></td><td className="px-4 py-2 text-muted-foreground">'private' | 'unlisted' | 'public'</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs">campaign_message_board</td><td className="px-4 py-2 font-mono text-xs">BOOLEAN</td><td className="px-4 py-2"><span className="bg-secondary text-secondary-foreground text-xs px-1.5 py-0.5 rounded">DEFAULT FALSE</span></td><td className="px-4 py-2 text-muted-foreground">是否開啟留言板</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs">campaign_notify_enabled</td><td className="px-4 py-2 font-mono text-xs">BOOLEAN</td><td className="px-4 py-2"><span className="bg-secondary text-secondary-foreground text-xs px-1.5 py-0.5 rounded">DEFAULT TRUE</span></td><td className="px-4 py-2 text-muted-foreground">是否開啟通知</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs">campaign_notify_days</td><td className="px-4 py-2 font-mono text-xs">INTEGER</td><td className="px-4 py-2"><span className="bg-secondary text-secondary-foreground text-xs px-1.5 py-0.5 rounded">DEFAULT 3</span></td><td className="px-4 py-2 text-muted-foreground">提前通知天數</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs">campaign_created_at</td><td className="px-4 py-2 font-mono text-xs">TIMESTAMPTZ</td><td className="px-4 py-2"><span className="bg-secondary text-secondary-foreground text-xs px-1.5 py-0.5 rounded">DEFAULT NOW()</span></td><td className="px-4 py-2 text-muted-foreground">建立時間</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Product Table */}
          <div className="bg-card rounded-lg border overflow-hidden">
            <div className="bg-primary/10 px-4 py-3 border-b">
              <h3 className="font-bold text-primary">🛍️ Product (商品)</h3>
              <p className="text-xs text-muted-foreground">可贊助的商品項目</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left px-4 py-2 font-medium">欄位名稱</th>
                    <th className="text-left px-4 py-2 font-medium">資料型態</th>
                    <th className="text-left px-4 py-2 font-medium">約束條件</th>
                    <th className="text-left px-4 py-2 font-medium">說明</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr><td className="px-4 py-2 font-mono text-xs">product_id</td><td className="px-4 py-2 font-mono text-xs">UUID</td><td className="px-4 py-2"><span className="bg-primary/20 text-primary text-xs px-1.5 py-0.5 rounded">PK</span></td><td className="px-4 py-2 text-muted-foreground">唯一識別碼</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs">product_name</td><td className="px-4 py-2 font-mono text-xs">VARCHAR(200)</td><td className="px-4 py-2"><span className="bg-destructive/20 text-destructive text-xs px-1.5 py-0.5 rounded">NOT NULL</span></td><td className="px-4 py-2 text-muted-foreground">商品名稱</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs">product_price</td><td className="px-4 py-2 font-mono text-xs">DECIMAL(10,2)</td><td className="px-4 py-2"><span className="bg-destructive/20 text-destructive text-xs px-1.5 py-0.5 rounded">NOT NULL</span></td><td className="px-4 py-2 text-muted-foreground">商品價格</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs">product_image</td><td className="px-4 py-2 font-mono text-xs">TEXT</td><td className="px-4 py-2"><span className="bg-destructive/20 text-destructive text-xs px-1.5 py-0.5 rounded">NOT NULL</span></td><td className="px-4 py-2 text-muted-foreground">商品圖片 URL</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs">product_category</td><td className="px-4 py-2 font-mono text-xs">VARCHAR(50)</td><td className="px-4 py-2"><span className="bg-destructive/20 text-destructive text-xs px-1.5 py-0.5 rounded">NOT NULL</span></td><td className="px-4 py-2 text-muted-foreground">商品分類</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs">product_subcategory</td><td className="px-4 py-2 font-mono text-xs">VARCHAR(50)</td><td className="px-4 py-2"><span className="bg-muted text-muted-foreground text-xs px-1.5 py-0.5 rounded">NULLABLE</span></td><td className="px-4 py-2 text-muted-foreground">商品子分類</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs">product_description</td><td className="px-4 py-2 font-mono text-xs">TEXT</td><td className="px-4 py-2"><span className="bg-muted text-muted-foreground text-xs px-1.5 py-0.5 rounded">NULLABLE</span></td><td className="px-4 py-2 text-muted-foreground">商品描述</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs">product_is_active</td><td className="px-4 py-2 font-mono text-xs">BOOLEAN</td><td className="px-4 py-2"><span className="bg-secondary text-secondary-foreground text-xs px-1.5 py-0.5 rounded">DEFAULT TRUE</span></td><td className="px-4 py-2 text-muted-foreground">是否上架</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Donation Table */}
          <div className="bg-card rounded-lg border overflow-hidden">
            <div className="bg-primary/10 px-4 py-3 border-b">
              <h3 className="font-bold text-primary">💝 Donation (贊助紀錄)</h3>
              <p className="text-xs text-muted-foreground">記錄每筆贊助詳情</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left px-4 py-2 font-medium">欄位名稱</th>
                    <th className="text-left px-4 py-2 font-medium">資料型態</th>
                    <th className="text-left px-4 py-2 font-medium">約束條件</th>
                    <th className="text-left px-4 py-2 font-medium">說明</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr><td className="px-4 py-2 font-mono text-xs">donation_id</td><td className="px-4 py-2 font-mono text-xs">UUID</td><td className="px-4 py-2"><span className="bg-primary/20 text-primary text-xs px-1.5 py-0.5 rounded">PK</span></td><td className="px-4 py-2 text-muted-foreground">唯一識別碼</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs">donation_campaign_id</td><td className="px-4 py-2 font-mono text-xs">UUID</td><td className="px-4 py-2"><span className="bg-blue-500/20 text-blue-600 text-xs px-1.5 py-0.5 rounded">FK → Campaign</span> <span className="bg-destructive/20 text-destructive text-xs px-1.5 py-0.5 rounded">NOT NULL</span></td><td className="px-4 py-2 text-muted-foreground">所屬活動 ID</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs">donation_donor_id</td><td className="px-4 py-2 font-mono text-xs">UUID</td><td className="px-4 py-2"><span className="bg-blue-500/20 text-blue-600 text-xs px-1.5 py-0.5 rounded">FK → User</span> <span className="bg-muted text-muted-foreground text-xs px-1.5 py-0.5 rounded">NULLABLE</span></td><td className="px-4 py-2 text-muted-foreground">贊助者 ID（可匿名）</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs">donation_product_id</td><td className="px-4 py-2 font-mono text-xs">UUID</td><td className="px-4 py-2"><span className="bg-blue-500/20 text-blue-600 text-xs px-1.5 py-0.5 rounded">FK → Product</span> <span className="bg-muted text-muted-foreground text-xs px-1.5 py-0.5 rounded">NULLABLE</span></td><td className="px-4 py-2 text-muted-foreground">贊助商品 ID</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs">donation_amount</td><td className="px-4 py-2 font-mono text-xs">DECIMAL(10,2)</td><td className="px-4 py-2"><span className="bg-destructive/20 text-destructive text-xs px-1.5 py-0.5 rounded">NOT NULL</span></td><td className="px-4 py-2 text-muted-foreground">贊助金額</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs">donation_quantity</td><td className="px-4 py-2 font-mono text-xs">INTEGER</td><td className="px-4 py-2"><span className="bg-secondary text-secondary-foreground text-xs px-1.5 py-0.5 rounded">DEFAULT 1</span></td><td className="px-4 py-2 text-muted-foreground">贊助數量</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs">donation_message</td><td className="px-4 py-2 font-mono text-xs">TEXT</td><td className="px-4 py-2"><span className="bg-muted text-muted-foreground text-xs px-1.5 py-0.5 rounded">NULLABLE</span></td><td className="px-4 py-2 text-muted-foreground">祝福留言</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs">donation_donor_name</td><td className="px-4 py-2 font-mono text-xs">VARCHAR(100)</td><td className="px-4 py-2"><span className="bg-muted text-muted-foreground text-xs px-1.5 py-0.5 rounded">NULLABLE</span></td><td className="px-4 py-2 text-muted-foreground">贊助者顯示名稱</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs">donation_is_anonymous</td><td className="px-4 py-2 font-mono text-xs">BOOLEAN</td><td className="px-4 py-2"><span className="bg-secondary text-secondary-foreground text-xs px-1.5 py-0.5 rounded">DEFAULT FALSE</span></td><td className="px-4 py-2 text-muted-foreground">是否匿名贊助</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs">donation_payment_method</td><td className="px-4 py-2 font-mono text-xs">ENUM</td><td className="px-4 py-2"><span className="bg-destructive/20 text-destructive text-xs px-1.5 py-0.5 rounded">NOT NULL</span></td><td className="px-4 py-2 text-muted-foreground">'credit_card' | 'line_pay'</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs">donation_status</td><td className="px-4 py-2 font-mono text-xs">ENUM</td><td className="px-4 py-2"><span className="bg-secondary text-secondary-foreground text-xs px-1.5 py-0.5 rounded">DEFAULT 'pending'</span></td><td className="px-4 py-2 text-muted-foreground">'pending' | 'completed' | 'failed' | 'refunded'</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs">donation_created_at</td><td className="px-4 py-2 font-mono text-xs">TIMESTAMPTZ</td><td className="px-4 py-2"><span className="bg-secondary text-secondary-foreground text-xs px-1.5 py-0.5 rounded">DEFAULT NOW()</span></td><td className="px-4 py-2 text-muted-foreground">建立時間</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* CampaignProduct Table */}
          <div className="bg-card rounded-lg border overflow-hidden">
            <div className="bg-primary/10 px-4 py-3 border-b">
              <h3 className="font-bold text-primary">🔗 CampaignProduct (活動商品關聯)</h3>
              <p className="text-xs text-muted-foreground">活動與商品的多對多關聯表</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left px-4 py-2 font-medium">欄位名稱</th>
                    <th className="text-left px-4 py-2 font-medium">資料型態</th>
                    <th className="text-left px-4 py-2 font-medium">約束條件</th>
                    <th className="text-left px-4 py-2 font-medium">說明</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr><td className="px-4 py-2 font-mono text-xs">cp_id</td><td className="px-4 py-2 font-mono text-xs">UUID</td><td className="px-4 py-2"><span className="bg-primary/20 text-primary text-xs px-1.5 py-0.5 rounded">PK</span></td><td className="px-4 py-2 text-muted-foreground">唯一識別碼</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs">cp_campaign_id</td><td className="px-4 py-2 font-mono text-xs">UUID</td><td className="px-4 py-2"><span className="bg-blue-500/20 text-blue-600 text-xs px-1.5 py-0.5 rounded">FK → Campaign</span> <span className="bg-destructive/20 text-destructive text-xs px-1.5 py-0.5 rounded">NOT NULL</span></td><td className="px-4 py-2 text-muted-foreground">所屬活動 ID</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs">cp_product_id</td><td className="px-4 py-2 font-mono text-xs">UUID</td><td className="px-4 py-2"><span className="bg-blue-500/20 text-blue-600 text-xs px-1.5 py-0.5 rounded">FK → Product</span> <span className="bg-destructive/20 text-destructive text-xs px-1.5 py-0.5 rounded">NOT NULL</span></td><td className="px-4 py-2 text-muted-foreground">商品 ID</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs">cp_quantity</td><td className="px-4 py-2 font-mono text-xs">INTEGER</td><td className="px-4 py-2"><span className="bg-secondary text-secondary-foreground text-xs px-1.5 py-0.5 rounded">DEFAULT 1</span></td><td className="px-4 py-2 text-muted-foreground">需求數量</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs">cp_funded_quantity</td><td className="px-4 py-2 font-mono text-xs">INTEGER</td><td className="px-4 py-2"><span className="bg-secondary text-secondary-foreground text-xs px-1.5 py-0.5 rounded">DEFAULT 0</span></td><td className="px-4 py-2 text-muted-foreground">已募得數量</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* MediaItem Table */}
          <div className="bg-card rounded-lg border overflow-hidden">
            <div className="bg-primary/10 px-4 py-3 border-b">
              <h3 className="font-bold text-primary">📷 MediaItem (媒體檔案)</h3>
              <p className="text-xs text-muted-foreground">活動相關媒體檔案</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left px-4 py-2 font-medium">欄位名稱</th>
                    <th className="text-left px-4 py-2 font-medium">資料型態</th>
                    <th className="text-left px-4 py-2 font-medium">約束條件</th>
                    <th className="text-left px-4 py-2 font-medium">說明</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr><td className="px-4 py-2 font-mono text-xs">media_id</td><td className="px-4 py-2 font-mono text-xs">UUID</td><td className="px-4 py-2"><span className="bg-primary/20 text-primary text-xs px-1.5 py-0.5 rounded">PK</span></td><td className="px-4 py-2 text-muted-foreground">唯一識別碼</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs">media_campaign_id</td><td className="px-4 py-2 font-mono text-xs">UUID</td><td className="px-4 py-2"><span className="bg-blue-500/20 text-blue-600 text-xs px-1.5 py-0.5 rounded">FK → Campaign</span> <span className="bg-destructive/20 text-destructive text-xs px-1.5 py-0.5 rounded">NOT NULL</span></td><td className="px-4 py-2 text-muted-foreground">所屬活動 ID</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs">media_url</td><td className="px-4 py-2 font-mono text-xs">TEXT</td><td className="px-4 py-2"><span className="bg-destructive/20 text-destructive text-xs px-1.5 py-0.5 rounded">NOT NULL</span></td><td className="px-4 py-2 text-muted-foreground">媒體檔案 URL</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs">media_type</td><td className="px-4 py-2 font-mono text-xs">ENUM</td><td className="px-4 py-2"><span className="bg-destructive/20 text-destructive text-xs px-1.5 py-0.5 rounded">NOT NULL</span></td><td className="px-4 py-2 text-muted-foreground">'image' | 'video'</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs">media_order_index</td><td className="px-4 py-2 font-mono text-xs">INTEGER</td><td className="px-4 py-2"><span className="bg-secondary text-secondary-foreground text-xs px-1.5 py-0.5 rounded">DEFAULT 0</span></td><td className="px-4 py-2 text-muted-foreground">顯示順序</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Invitation Table */}
          <div className="bg-card rounded-lg border overflow-hidden">
            <div className="bg-primary/10 px-4 py-3 border-b">
              <h3 className="font-bold text-primary">✉️ Invitation (邀請記錄)</h3>
              <p className="text-xs text-muted-foreground">活動邀請發送記錄</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left px-4 py-2 font-medium">欄位名稱</th>
                    <th className="text-left px-4 py-2 font-medium">資料型態</th>
                    <th className="text-left px-4 py-2 font-medium">約束條件</th>
                    <th className="text-left px-4 py-2 font-medium">說明</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr><td className="px-4 py-2 font-mono text-xs">invitation_id</td><td className="px-4 py-2 font-mono text-xs">UUID</td><td className="px-4 py-2"><span className="bg-primary/20 text-primary text-xs px-1.5 py-0.5 rounded">PK</span></td><td className="px-4 py-2 text-muted-foreground">唯一識別碼</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs">invitation_campaign_id</td><td className="px-4 py-2 font-mono text-xs">UUID</td><td className="px-4 py-2"><span className="bg-blue-500/20 text-blue-600 text-xs px-1.5 py-0.5 rounded">FK → Campaign</span> <span className="bg-destructive/20 text-destructive text-xs px-1.5 py-0.5 rounded">NOT NULL</span></td><td className="px-4 py-2 text-muted-foreground">所屬活動 ID</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs">invitation_inviter_id</td><td className="px-4 py-2 font-mono text-xs">UUID</td><td className="px-4 py-2"><span className="bg-blue-500/20 text-blue-600 text-xs px-1.5 py-0.5 rounded">FK → User</span> <span className="bg-destructive/20 text-destructive text-xs px-1.5 py-0.5 rounded">NOT NULL</span></td><td className="px-4 py-2 text-muted-foreground">邀請人 ID</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs">invitation_invitee_id</td><td className="px-4 py-2 font-mono text-xs">UUID</td><td className="px-4 py-2"><span className="bg-blue-500/20 text-blue-600 text-xs px-1.5 py-0.5 rounded">FK → User</span> <span className="bg-muted text-muted-foreground text-xs px-1.5 py-0.5 rounded">NULLABLE</span></td><td className="px-4 py-2 text-muted-foreground">被邀請人 ID</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs">invitation_invitee_contact</td><td className="px-4 py-2 font-mono text-xs">VARCHAR(255)</td><td className="px-4 py-2"><span className="bg-muted text-muted-foreground text-xs px-1.5 py-0.5 rounded">NULLABLE</span></td><td className="px-4 py-2 text-muted-foreground">被邀請人聯絡方式</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs">invitation_status</td><td className="px-4 py-2 font-mono text-xs">ENUM</td><td className="px-4 py-2"><span className="bg-secondary text-secondary-foreground text-xs px-1.5 py-0.5 rounded">DEFAULT 'pending'</span></td><td className="px-4 py-2 text-muted-foreground">'pending' | 'sent' | 'viewed' | 'donated'</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs">invitation_sent_via</td><td className="px-4 py-2 font-mono text-xs">ENUM</td><td className="px-4 py-2"><span className="bg-destructive/20 text-destructive text-xs px-1.5 py-0.5 rounded">NOT NULL</span></td><td className="px-4 py-2 text-muted-foreground">'line' | 'email' | 'link'</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs">invitation_created_at</td><td className="px-4 py-2 font-mono text-xs">TIMESTAMPTZ</td><td className="px-4 py-2"><span className="bg-secondary text-secondary-foreground text-xs px-1.5 py-0.5 rounded">DEFAULT NOW()</span></td><td className="px-4 py-2 text-muted-foreground">建立時間</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Notification Table */}
          <div className="bg-card rounded-lg border overflow-hidden">
            <div className="bg-primary/10 px-4 py-3 border-b">
              <h3 className="font-bold text-primary">🔔 Notification (系統通知)</h3>
              <p className="text-xs text-muted-foreground">系統推播通知記錄</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left px-4 py-2 font-medium">欄位名稱</th>
                    <th className="text-left px-4 py-2 font-medium">資料型態</th>
                    <th className="text-left px-4 py-2 font-medium">約束條件</th>
                    <th className="text-left px-4 py-2 font-medium">說明</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr><td className="px-4 py-2 font-mono text-xs">notification_id</td><td className="px-4 py-2 font-mono text-xs">UUID</td><td className="px-4 py-2"><span className="bg-primary/20 text-primary text-xs px-1.5 py-0.5 rounded">PK</span></td><td className="px-4 py-2 text-muted-foreground">唯一識別碼</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs">notification_user_id</td><td className="px-4 py-2 font-mono text-xs">UUID</td><td className="px-4 py-2"><span className="bg-blue-500/20 text-blue-600 text-xs px-1.5 py-0.5 rounded">FK → User</span> <span className="bg-destructive/20 text-destructive text-xs px-1.5 py-0.5 rounded">NOT NULL</span></td><td className="px-4 py-2 text-muted-foreground">接收者 ID</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs">notification_campaign_id</td><td className="px-4 py-2 font-mono text-xs">UUID</td><td className="px-4 py-2"><span className="bg-blue-500/20 text-blue-600 text-xs px-1.5 py-0.5 rounded">FK → Campaign</span> <span className="bg-muted text-muted-foreground text-xs px-1.5 py-0.5 rounded">NULLABLE</span></td><td className="px-4 py-2 text-muted-foreground">相關活動 ID</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs">notification_type</td><td className="px-4 py-2 font-mono text-xs">ENUM</td><td className="px-4 py-2"><span className="bg-destructive/20 text-destructive text-xs px-1.5 py-0.5 rounded">NOT NULL</span></td><td className="px-4 py-2 text-muted-foreground">'donation' | 'deadline' | 'completed' | 'system'</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs">notification_title</td><td className="px-4 py-2 font-mono text-xs">VARCHAR(200)</td><td className="px-4 py-2"><span className="bg-destructive/20 text-destructive text-xs px-1.5 py-0.5 rounded">NOT NULL</span></td><td className="px-4 py-2 text-muted-foreground">通知標題</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs">notification_message</td><td className="px-4 py-2 font-mono text-xs">TEXT</td><td className="px-4 py-2"><span className="bg-destructive/20 text-destructive text-xs px-1.5 py-0.5 rounded">NOT NULL</span></td><td className="px-4 py-2 text-muted-foreground">通知內容</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs">notification_is_read</td><td className="px-4 py-2 font-mono text-xs">BOOLEAN</td><td className="px-4 py-2"><span className="bg-secondary text-secondary-foreground text-xs px-1.5 py-0.5 rounded">DEFAULT FALSE</span></td><td className="px-4 py-2 text-muted-foreground">是否已讀</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs">notification_created_at</td><td className="px-4 py-2 font-mono text-xs">TIMESTAMPTZ</td><td className="px-4 py-2"><span className="bg-secondary text-secondary-foreground text-xs px-1.5 py-0.5 rounded">DEFAULT NOW()</span></td><td className="px-4 py-2 text-muted-foreground">建立時間</td></tr>
                </tbody>
              </table>
            </div>
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
