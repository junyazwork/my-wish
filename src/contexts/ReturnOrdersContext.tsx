import { createContext, useContext, useState, ReactNode } from "react";

interface ReturnOrderProduct {
  productName: string;
  productCode?: string;
  productNumber?: string;
  quantity: number;
  unitPrice: number;
}

export interface ReturnOrder {
  id: string;
  orderNumber: string;
  date: string;
  status: "returning" | "returned";
  products: ReturnOrderProduct[];
  total: number;
  returnDate: string;
  originalOrderNumber: string;
  returnOrderNumber: string;
  returnQuantity: number;
  refundAmount: number;
  returnReason: string;
  returnPerson: string;
  returnPhone: string;
  pickupAddress: string;
}

interface ReturnOrdersContextType {
  returnOrders: ReturnOrder[];
  addReturnOrder: (order: ReturnOrder) => void;
  getReturnOrderByOriginalOrderNumber: (orderNumber: string) => ReturnOrder | undefined;
}

const ReturnOrdersContext = createContext<ReturnOrdersContextType>({
  returnOrders: [],
  addReturnOrder: () => {},
  getReturnOrderByOriginalOrderNumber: () => undefined,
});

export const useReturnOrders = () => useContext(ReturnOrdersContext);

export const ReturnOrdersProvider = ({ children }: { children: ReactNode }) => {
  // Seed with a completed return order for campaign 6 (流浪動物救援行動)
  const [returnOrders, setReturnOrders] = useState<ReturnOrder[]>([
    {
      id: "return-seed-1",
      orderNumber: "R000000001",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      status: "returned",
      products: [
        {
          productName: "寵物飼料大包裝",
          productCode: "AB-001",
          productNumber: "A100001",
          quantity: 3,
          unitPrice: 650,
        },
      ],
      total: 1950,
      returnDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      originalOrderNumber: "202501150006",
      returnOrderNumber: "R000000001",
      returnQuantity: 3,
      refundAmount: 1950,
      returnReason: "商品數量過多，退回部分",
      returnPerson: "林美玲",
      returnPhone: "0912345678",
      pickupAddress: "臺北市大安區忠孝東路四段100號3樓",
    },
  ]);

  const addReturnOrder = (order: ReturnOrder) => {
    setReturnOrders((prev) => [order, ...prev]);
  };

  const getReturnOrderByOriginalOrderNumber = (orderNumber: string) => {
    return returnOrders.find((order) => order.originalOrderNumber === orderNumber);
  };

  return (
    <ReturnOrdersContext.Provider value={{ returnOrders, addReturnOrder, getReturnOrderByOriginalOrderNumber }}>
      {children}
    </ReturnOrdersContext.Provider>
  );
};
