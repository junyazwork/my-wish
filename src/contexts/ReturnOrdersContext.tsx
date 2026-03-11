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
}

const ReturnOrdersContext = createContext<ReturnOrdersContextType>({
  returnOrders: [],
  addReturnOrder: () => {},
});

export const useReturnOrders = () => useContext(ReturnOrdersContext);

export const ReturnOrdersProvider = ({ children }: { children: ReactNode }) => {
  const [returnOrders, setReturnOrders] = useState<ReturnOrder[]>([]);

  const addReturnOrder = (order: ReturnOrder) => {
    setReturnOrders((prev) => [order, ...prev]);
  };

  return (
    <ReturnOrdersContext.Provider value={{ returnOrders, addReturnOrder }}>
      {children}
    </ReturnOrdersContext.Provider>
  );
};
