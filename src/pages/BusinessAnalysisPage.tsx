import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BusinessAnalysisPage = () => {
  const navigate = useNavigate();

  const businessAnalysis = {
    background: {
      title: "商業背景脈絡",
      context: "MY WISH ONLINE 是一個結合電商與社交募資的創新平台，專為台灣市場設計。平台利用 LINE 生態系統的高滲透率（台灣 2,100 萬用戶），讓使用者能輕鬆發起願望清單募資並透過熟人網絡完成禮物眾籌。",
      painPoints: [
        { problem: "生日/節慶送禮煩惱", solution: "許多人不知道該送什麼禮物，導致重複購買或不實用的禮物" },
        { problem: "禮金湊不齊", solution: "多人合資買高價禮物時，金流協調困難" },
        { problem: "公益募資門檻高", solution: "小型公益活動缺乏簡易的線上募資工具" },
      ],
      valueProposition: "透過「願望清單」+「社交分享」+「多人贊助」三合一模式，解決送禮與募資的痛點",
    },
    marketAnalysis: {
      title: "預期市場與反應",
      targetSegments: [
        { segment: "年輕家庭 (25-40歲)", size: "主力市場", behavior: "生日派對、Baby Shower、滿月禮", potential: "高頻使用，每年 3-5 次" },
        { segment: "學生族群 (18-24歲)", size: "成長市場", behavior: "畢業禮物、社團募資", potential: "高社交傳播力" },
        { segment: "企業 HR/福委會", size: "B2B 潛力", behavior: "員工福利、退休禮物", potential: "高客單價" },
        { segment: "公益團體", size: "利基市場", behavior: "小額募款、物資募集", potential: "品牌形象加分" },
      ],
      marketSize: "台灣禮品市場年產值約 500 億台幣，線上禮品佔比約 15%，社交募資為新興藍海",
      competitors: [
        { name: "傳統電商", weakness: "缺乏社交募資功能" },
        { name: "募資平台 (如 flyingV)", weakness: "偏向創業專案，非個人禮物導向" },
        { name: "LINE 禮物", weakness: "僅支援單人送禮，無多人合資" },
      ],
    },
    expectedReactions: {
      title: "市場反應預測",
      positive: [
        "LINE 整合降低使用門檻，容易被年輕族群接受",
        "解決真實痛點，使用者黏著度高",
        "社交裂變效應帶來自然流量",
      ],
      challenges: [
        "使用者習慣培養需要時間",
        "需要足夠的商品種類才能滿足不同需求",
        "金流信任度需要時間建立",
      ],
    },
    improvements: {
      title: "功能強化建議",
      categories: [
        {
          category: "使用者體驗優化",
          priority: "P0 - 必要",
          items: [
            { feature: "推播通知系統", description: "募資進度更新、截止提醒、達標通知", impact: "高" },
            { feature: "多語言支援", description: "支援英文介面，服務在台外籍人士", impact: "中" },
            { feature: "深色模式", description: "符合現代 App 標準體驗", impact: "低" },
          ],
        },
        {
          category: "社交功能強化",
          priority: "P1 - 重要",
          items: [
            { feature: "祝福留言牆", description: "贊助者可附上祝福訊息，募資結束後彙整成電子卡片", impact: "高" },
            { feature: "進度分享圖", description: "一鍵生成募資進度圖片，分享至社群", impact: "高" },
            { feature: "匿名贊助選項", description: "部分贊助者希望低調贈禮", impact: "中" },
          ],
        },
        {
          category: "商業模式擴展",
          priority: "P2 - 擴展",
          items: [
            { feature: "企業方案", description: "提供企業專屬後台，管理員工福利募資", impact: "高" },
            { feature: "禮品包裝加值", description: "提供精美包裝與賀卡加購服務", impact: "中" },
            { feature: "合作商家系統", description: "開放商家上架商品，抽成模式", impact: "高" },
          ],
        },
        {
          category: "數據與分析",
          priority: "P2 - 擴展",
          items: [
            { feature: "募資數據儀表板", description: "提供發起人查看瀏覽次數、轉換率等數據", impact: "中" },
            { feature: "熱門商品推薦", description: "根據類似募資活動推薦商品", impact: "中" },
            { feature: "季節性活動提醒", description: "節慶前推播提醒發起募資", impact: "低" },
          ],
        },
        {
          category: "信任與安全",
          priority: "P0 - 必要",
          items: [
            { feature: "實名認證", description: "公益募資需驗證發起人身份", impact: "高" },
            { feature: "退款保障機制", description: "募資未達標或商品缺貨時的退款流程", impact: "高" },
            { feature: "詐騙檢舉系統", description: "讓使用者回報可疑活動", impact: "中" },
          ],
        },
      ],
    },
    roadmap: {
      title: "建議開發路線圖",
      phases: [
        { phase: "Phase 1 - MVP 完善 (1-2 個月)", items: ["推播通知系統", "退款保障機制", "匿名贊助選項"] },
        { phase: "Phase 2 - 社交強化 (2-3 個月)", items: ["祝福留言牆", "進度分享圖", "實名認證"] },
        { phase: "Phase 3 - 商業擴展 (3-6 個月)", items: ["企業方案", "合作商家系統", "數據儀表板"] },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <button onClick={() => navigate(-1)} className="text-foreground">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-semibold text-foreground">商業分析報告</h1>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Business Background Section */}
        <section className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
          <h2 className="text-lg font-bold text-primary mb-3">📊 {businessAnalysis.background.title}</h2>
          <p className="text-sm text-foreground mb-4">{businessAnalysis.background.context}</p>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">痛點與解決方案</h3>
            {businessAnalysis.background.painPoints.map((point, idx) => (
              <div key={idx} className="bg-background/50 rounded p-3 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-destructive text-xs">❌</span>
                  <span className="text-sm font-medium text-foreground">{point.problem}</span>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <span className="text-primary text-xs">✓</span>
                  <span className="text-xs text-muted-foreground">{point.solution}</span>
                </div>
              </div>
            ))}
            <div className="mt-4 p-3 bg-primary/10 rounded-lg">
              <span className="text-sm font-semibold text-primary">💡 價值主張：</span>
              <span className="text-sm text-foreground ml-1">{businessAnalysis.background.valueProposition}</span>
            </div>
          </div>
        </section>

        {/* Market Analysis Section */}
        <section className="bg-card rounded-lg p-4 border border-border">
          <h2 className="text-lg font-bold text-foreground mb-4">🎯 {businessAnalysis.marketAnalysis.title}</h2>
          
          <h3 className="text-sm font-semibold text-foreground mb-2">目標客群分析</h3>
          <div className="grid gap-2 mb-4">
            {businessAnalysis.marketAnalysis.targetSegments.map((seg, idx) => (
              <div key={idx} className="bg-muted/50 rounded p-3">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-sm font-medium text-foreground">{seg.segment}</span>
                  <span className="text-xs px-2 py-0.5 bg-primary/20 text-primary rounded">{seg.size}</span>
                </div>
                <p className="text-xs text-muted-foreground">行為：{seg.behavior}</p>
                <p className="text-xs text-primary">潛力：{seg.potential}</p>
              </div>
            ))}
          </div>

          <div className="bg-accent/30 rounded p-3 mb-4">
            <span className="text-sm font-semibold text-foreground">📈 市場規模：</span>
            <span className="text-sm text-muted-foreground ml-1">{businessAnalysis.marketAnalysis.marketSize}</span>
          </div>

          <h3 className="text-sm font-semibold text-foreground mb-2">競爭分析</h3>
          <div className="space-y-2">
            {businessAnalysis.marketAnalysis.competitors.map((comp, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm">
                <span className="font-medium text-foreground">{comp.name}</span>
                <span className="text-muted-foreground">→</span>
                <span className="text-xs text-destructive/80">{comp.weakness}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Expected Reactions */}
        <section className="bg-card rounded-lg p-4 border border-border">
          <h2 className="text-lg font-bold text-foreground mb-4">💬 {businessAnalysis.expectedReactions.title}</h2>
          
          <div className="grid gap-4">
            <div>
              <h3 className="text-sm font-semibold text-primary mb-2">✅ 正面反應預測</h3>
              <ul className="space-y-1">
                {businessAnalysis.expectedReactions.positive.map((item, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-amber-600 dark:text-amber-400 mb-2">⚠️ 挑戰與風險</h3>
              <ul className="space-y-1">
                {businessAnalysis.expectedReactions.challenges.map((item, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-amber-600 dark:text-amber-400 mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Feature Improvements */}
        <section className="bg-card rounded-lg p-4 border border-border">
          <h2 className="text-lg font-bold text-foreground mb-4">🚀 {businessAnalysis.improvements.title}</h2>
          
          <div className="space-y-4">
            {businessAnalysis.improvements.categories.map((cat, idx) => (
              <div key={idx} className="border border-border rounded-lg p-3">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-semibold text-foreground">{cat.category}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    cat.priority.includes("P0") ? "bg-destructive/20 text-destructive" :
                    cat.priority.includes("P1") ? "bg-amber-500/20 text-amber-600 dark:text-amber-400" :
                    "bg-muted text-muted-foreground"
                  }`}>{cat.priority}</span>
                </div>
                <div className="space-y-2">
                  {cat.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="bg-muted/30 rounded p-2">
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-medium text-foreground">{item.feature}</span>
                        <span className={`text-xs px-1.5 py-0.5 rounded ${
                          item.impact === "高" ? "bg-primary/20 text-primary" :
                          item.impact === "中" ? "bg-secondary text-secondary-foreground" :
                          "bg-muted text-muted-foreground"
                        }`}>影響: {item.impact}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Development Roadmap */}
        <section className="bg-gradient-to-br from-accent/30 to-accent/10 rounded-lg p-4 border border-accent/30">
          <h2 className="text-lg font-bold text-foreground mb-4">🗺️ {businessAnalysis.roadmap.title}</h2>
          
          <div className="space-y-4">
            {businessAnalysis.roadmap.phases.map((phase, idx) => (
              <div key={idx} className="relative">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    {idx + 1}
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">{phase.phase}</h3>
                </div>
                <div className="ml-11 flex flex-wrap gap-1.5">
                  {phase.items.map((item, itemIdx) => (
                    <span key={itemIdx} className="text-xs px-2 py-1 bg-background rounded border border-border">
                      {item}
                    </span>
                  ))}
                </div>
                {idx < businessAnalysis.roadmap.phases.length - 1 && (
                  <div className="absolute left-4 top-10 w-0.5 h-8 bg-primary/30" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Last Updated */}
        <div className="text-center text-xs text-muted-foreground py-4">最後更新：2026 年 1 月</div>
      </div>
    </div>
  );
};

export default BusinessAnalysisPage;
