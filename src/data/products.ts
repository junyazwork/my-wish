import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";
import { Product, Category } from "@/types";

export const categories: Category[] = [
  { id: "shirts", name: "短袖上衣", subcategories: ["男裝", "女裝", "中性"] },
  { id: "shoes", name: "戶外鞋", subcategories: ["運動鞋", "休閒鞋", "登山鞋"] },
  { id: "dinnerware", name: "餐盤", subcategories: ["陶瓷", "不鏽鋼", "木質"] },
  { id: "external", name: "外站連結" },
  { id: "links", name: "連結" },
];

export const products: Product[] = [
  {
    id: "1",
    name: "FILA官方直營 x Rakuten 樂天聯名 短袖圓領T恤",
    price: 1290,
    image: product2,
    category: "shirts",
    subcategory: "中性",
  },
  {
    id: "2",
    name: "NIKE 短袖上衣 男女 中性款 AS U NK SB TEE",
    price: 980,
    image: product3,
    category: "shirts",
    subcategory: "中性",
  },
  {
    id: "3",
    name: "PUMA 背心 男 歐規 灰 68822544",
    price: 1580,
    image: product4,
    category: "shirts",
    subcategory: "男裝",
  },
  {
    id: "4",
    name: "NEW ERA 男女 寬版長袖上衣 Stranger Things",
    price: 2280,
    image: product5,
    category: "shirts",
    subcategory: "中性",
  },
  {
    id: "5",
    name: "Nike W Terra Manta 女 運動休閒鞋 復古鞋 舒適 穿搭 白黑",
    price: 2900,
    image: product1,
    category: "shoes",
    subcategory: "運動鞋",
  },
  {
    id: "6",
    name: "街頭潮流連帽上衣 彩色塗鴉印花 男女款",
    price: 1680,
    image: product6,
    category: "shirts",
    subcategory: "中性",
  },
];
