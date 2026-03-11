import React, { useState, useMemo } from "react";
import Header from "@/components/Header";
import SlideMenu from "@/components/SlideMenu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDown, ChevronUp, CalendarIcon, Package, RotateCcw } from "lucide-react";
import { format } from "date-fns";
import { zhTW } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface ShippingTrackingPageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

type OrderStatus = "shipping" | "delivered" | "returning" | "returned";

interface OrderProduct {
  productName: string;
  productStyle?: string;
  productCode?: string;
  productNumber?: string;
  quantity: number;
  unitPrice: number;
}

interface ShippingOrder {
  id: string;
  orderNumber: string;
  date: string;
  status: OrderStatus;
  // Shipping fields
  orderDate?: string;
  products: OrderProduct[];
  total: number;
  recipient?: string;
  phone?: string;
  address?: string;
  // Return fields
  returnDate?: string;
  originalOrderNumber?: string;
  returnOrderNumber?: string;
  returnQuantity?: number;
  refundAmount?: number;
  returnReason?: string;
  returnPerson?: string;
  returnPhone?: string;
  pickupAddress?: string;
}

const statusLabels: Record<OrderStatus, string> = {
  shipping: "配送中",
  delivered: "已送達",
  returning: "退貨中",
  returned: "已退貨",
};

const statusVariants: Record<OrderStatus, "default" | "secondary" | "destructive" | "outline"> = {
  shipping: "default",
  delivered: "secondary",
  returning: "destructive",
  returned: "outline",
};

const mockOrders: ShippingOrder[] = [
  {
    id: "1",
    orderNumber: "202603010001",
    date: "2026-03-01",
    status: "shipping",
    orderDate: "2026-03-01",
    products: [
      { productName: "北歐風簡約檯燈", productStyle: "白色 / 標準款", productCode: "LP-001", productNumber: "A260301", quantity: 1, unitPrice: 1280 },
      { productName: "極簡木質時鐘", productStyle: "原木色", productCode: "CK-012", productNumber: "A260302", quantity: 1, unitPrice: 980 },
    ],
    total: 2260,
    recipient: "王小明",
    phone: "0912-345-678",
    address: "台北市信義區松高路100號5F",
  },
  {
    id: "2",
    orderNumber: "202602250002",
    date: "2026-02-25",
    status: "shipping",
    orderDate: "2026-02-25",
    products: [
      { productName: "手工皮革錢包", productStyle: "深棕色 / 長夾", productCode: "WL-05", productNumber: "B225001", quantity: 2, unitPrice: 2450 },
    ],
    total: 4900,
    recipient: "李小華",
    phone: "0923-456-789",
    address: "新北市板橋區文化路二段50號",
  },
  {
    id: "3",
    orderNumber: "202602200003",
    date: "2026-02-20",
    status: "returning",
    products: [
      { productName: "無線藍牙耳機", quantity: 1, unitPrice: 3200 },
    ],
    returnDate: "2026-03-05",
    originalOrderNumber: "202602200003",
    returnOrderNumber: "R123456789",
    total: 3200,
    returnQuantity: 1,
    refundAmount: 3200,
    returnReason: "商品功能異常，右耳無聲音輸出",
    returnPerson: "陳大文",
    returnPhone: "0934-567-890",
    pickupAddress: "台中市西屯區台灣大道三段200號",
  },
  {
    id: "4",
    orderNumber: "202602100004",
    date: "2026-02-10",
    status: "delivered",
    orderDate: "2026-02-10",
    products: [
      { productName: "有機棉枕頭套組", productStyle: "淺灰色 / 雙人組", productCode: "PL-012", productNumber: "C210003", quantity: 1, unitPrice: 1680 },
      { productName: "天然乳膠枕", productStyle: "標準型", productCode: "PL-018", productNumber: "C210004", quantity: 2, unitPrice: 1200 },
      { productName: "純棉床包組", productStyle: "米白色 / 雙人", productCode: "BD-003", productNumber: "C210005", quantity: 1, unitPrice: 2380 },
    ],
    total: 6460,
    recipient: "林美玲",
    phone: "0945-678-901",
    address: "高雄市前鎮區中華五路789號",
  },
  {
    id: "5",
    orderNumber: "202602050005",
    date: "2026-02-05",
    status: "returned",
    products: [
      { productName: "陶瓷馬克杯禮盒", quantity: 1, unitPrice: 890 },
    ],
    returnDate: "2026-02-15",
    originalOrderNumber: "202602050005",
    returnOrderNumber: "R987654321",
    total: 890,
    returnQuantity: 1,
    refundAmount: 890,
    returnReason: "收到商品有破損",
    returnPerson: "張小芳",
    returnPhone: "0956-789-012",
    pickupAddress: "桃園市中壢區中正路456號",
  },
];

const ShippingTrackingPage = ({ onBack, onNavigate }: ShippingTrackingPageProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const filteredOrders = useMemo(() => {
    return mockOrders.filter((order) => {
      const orderDate = new Date(order.date);
      if (startDate && orderDate < startDate) return false;
      if (endDate) {
        const endOfDay = new Date(endDate);
        endOfDay.setHours(23, 59, 59, 999);
        if (orderDate > endOfDay) return false;
      }
      return true;
    });
  }, [startDate, endDate]);

  const toggleExpand = (orderId: string) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  const clearFilters = () => {
    setStartDate(undefined);
    setEndDate(undefined);
  };

  const DetailRow = ({ label, value }: { label: string; value?: string | number }) => {
    if (value === undefined || value === null) return null;
    return (
      <div className="flex justify-between py-2 border-b border-border last:border-b-0">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="text-sm font-medium text-foreground text-right max-w-[60%]">{String(value)}</span>
      </div>
    );
  };

  const renderProductTable = (products: OrderProduct[]) => (
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-0 text-xs">
        {/* Header */}
        <div className="bg-muted/60 px-3 py-2 font-medium text-muted-foreground">商品名稱</div>
        <div className="bg-muted/60 px-3 py-2 font-medium text-muted-foreground text-center">品號</div>
        <div className="bg-muted/60 px-3 py-2 font-medium text-muted-foreground text-center">商品編號</div>
        <div className="bg-muted/60 px-3 py-2 font-medium text-muted-foreground text-center">數量</div>
        <div className="bg-muted/60 px-3 py-2 font-medium text-muted-foreground text-right">售價</div>
        {/* Rows */}
        {products.map((p, i) => (
          <React.Fragment key={i}>
            <div className={cn("px-3 py-2 border-t border-border", i % 2 === 1 && "bg-muted/20")}>
              <p className="font-medium text-foreground">{p.productName}</p>
              {p.productStyle && <p className="text-muted-foreground mt-0.5">{p.productStyle}</p>}
            </div>
            <div className={cn("px-3 py-2 border-t border-border text-center text-foreground", i % 2 === 1 && "bg-muted/20")}>{p.productCode || "-"}</div>
            <div className={cn("px-3 py-2 border-t border-border text-center text-foreground", i % 2 === 1 && "bg-muted/20")}>{p.productNumber || "-"}</div>
            <div className={cn("px-3 py-2 border-t border-border text-center text-foreground", i % 2 === 1 && "bg-muted/20")}>{p.quantity}</div>
            <div className={cn("px-3 py-2 border-t border-border text-right text-foreground", i % 2 === 1 && "bg-muted/20")}>NT$ {p.unitPrice.toLocaleString()}</div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );

  const renderShippingDetails = (order: ShippingOrder) => (
    <div className="px-4 pb-4 space-y-3 bg-muted/30 rounded-b-lg">
      <DetailRow label="發單日" value={order.orderDate} />
      <DetailRow label="訂單號碼" value={order.orderNumber} />
      <div className="pt-1">
        <p className="text-xs font-medium text-muted-foreground mb-2">商品明細</p>
        {renderProductTable(order.products)}
      </div>
      <DetailRow label="總計" value={`NT$ ${order.total?.toLocaleString()}`} />
      <DetailRow label="收件人" value={order.recipient} />
      <DetailRow label="聯絡電話" value={order.phone} />
      <DetailRow label="配送地址" value={order.address} />
    </div>
  );

  const renderReturnDetails = (order: ShippingOrder) => (
    <div className="px-4 pb-4 space-y-3 bg-muted/30 rounded-b-lg">
      <DetailRow label="申請退貨日期" value={order.returnDate} />
      <DetailRow label="原訂單號碼" value={order.originalOrderNumber} />
      <DetailRow label="退貨單號" value={order.returnOrderNumber} />
      <div className="pt-1">
        <p className="text-xs font-medium text-muted-foreground mb-2">退貨商品</p>
        {renderProductTable(order.products)}
      </div>
      <DetailRow label="退貨數量" value={order.returnQuantity} />
      <DetailRow label="退款金額" value={`NT$ ${order.refundAmount?.toLocaleString()}`} />
      <DetailRow label="退貨原因" value={order.returnReason} />
      <DetailRow label="退貨人" value={order.returnPerson} />
      <DetailRow label="退貨人電話" value={order.returnPhone} />
      <DetailRow label="取件地址" value={order.pickupAddress} />
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header
        title="配送/退貨查詢"
        showBack
        onBack={onBack}
        onMenuClick={() => setIsMenuOpen(true)}
      />
      <SlideMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={onNavigate}
        currentPage="shipping"
      />

      <div className="px-4 py-4 space-y-4">
        {/* Date Filter */}
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className={cn("flex-1 justify-start text-left font-normal", !startDate && "text-muted-foreground")}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "yyyy/MM/dd", { locale: zhTW }) : "開始日期"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={startDate} onSelect={setStartDate} className="p-3 pointer-events-auto" />
            </PopoverContent>
          </Popover>
          <span className="text-muted-foreground">~</span>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className={cn("flex-1 justify-start text-left font-normal", !endDate && "text-muted-foreground")}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "yyyy/MM/dd", { locale: zhTW }) : "結束日期"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar mode="single" selected={endDate} onSelect={setEndDate} className="p-3 pointer-events-auto" />
            </PopoverContent>
          </Popover>
          {(startDate || endDate) && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="px-2">
              清除
            </Button>
          )}
        </div>

        {/* Order List */}
        <div className="space-y-3">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Package className="mx-auto mb-3 h-10 w-10 opacity-50" />
              <p>沒有符合條件的訂單</p>
            </div>
          ) : (
            filteredOrders.map((order) => {
              const isExpanded = expandedOrderId === order.id;
              const isReturn = order.status === "returning" || order.status === "returned";
              return (
                <div key={order.id} className="border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleExpand(order.id)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-card hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="shrink-0">
                        {isReturn ? (
                          <RotateCcw size={18} className="text-destructive" />
                        ) : (
                          <Package size={18} className="text-primary" />
                        )}
                      </div>
                      <div className="text-left min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{order.orderNumber}</p>
                        <p className="text-xs text-muted-foreground">{order.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge variant={statusVariants[order.status]}>{statusLabels[order.status]}</Badge>
                      {isExpanded ? <ChevronUp size={16} className="text-muted-foreground" /> : <ChevronDown size={16} className="text-muted-foreground" />}
                    </div>
                  </button>
                  {isExpanded && (isReturn ? renderReturnDetails(order) : renderShippingDetails(order))}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default ShippingTrackingPage;
