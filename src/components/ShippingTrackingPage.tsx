import { useState, useMemo } from "react";
import Header from "@/components/Header";
import ShippingOrderDetail from "@/components/ShippingOrderDetail";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronRight, CalendarIcon, Package, RotateCcw } from "lucide-react";
import { format } from "date-fns";
import { zhTW } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface ShippingTrackingPageProps {
  onBack: () => void;
  onMenuClick: () => void;
  onCartClick: () => void;
  cartCount: number;
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
  orderDate?: string;
  products: OrderProduct[];
  total: number;
  recipient?: string;
  phone?: string;
  address?: string;
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
      { productName: "極簡木質時鐘", productStyle: "原木色", productCode: "CK-012", productNumber: "B260301", quantity: 1, unitPrice: 980 },
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
      { productName: "手工皮革錢包", productStyle: "深棕色 / 長夾", productCode: "WL-05", productNumber: "C225001", quantity: 2, unitPrice: 2450 },
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
      { productName: "有機棉枕頭套組", productStyle: "淺灰色 / 雙人組", productCode: "PL-012", productNumber: "D210003", quantity: 1, unitPrice: 1680 },
      { productName: "天然乳膠枕", productStyle: "標準型", productCode: "PL-018", productNumber: "E210004", quantity: 2, unitPrice: 1200 },
      { productName: "純棉床包組", productStyle: "米白色 / 雙人", productCode: "BD-003", productNumber: "F210005", quantity: 1, unitPrice: 2380 },
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

const ShippingTrackingPage = ({ onBack, onMenuClick, onCartClick, cartCount }: ShippingTrackingPageProps) => {
  const [selectedOrder, setSelectedOrder] = useState<ShippingOrder | null>(null);
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

  const clearFilters = () => {
    setStartDate(undefined);
    setEndDate(undefined);
  };

  // Show detail page if an order is selected
  if (selectedOrder) {
    return (
      <ShippingOrderDetail
        order={selectedOrder}
        onBack={() => setSelectedOrder(null)}
        onMenuClick={() => setIsMenuOpen(true)}
      />
    );
  }

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
              const isReturn = order.status === "returning" || order.status === "returned";
              return (
                <div
                  key={order.id}
                  className="border border-border rounded-lg overflow-hidden cursor-pointer hover:bg-muted/30 transition-colors"
                  onClick={() => setSelectedOrder(order)}
                >
                  <div className="flex items-center justify-between px-4 py-3 bg-card">
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
                      <ChevronRight size={16} className="text-muted-foreground" />
                    </div>
                  </div>
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
