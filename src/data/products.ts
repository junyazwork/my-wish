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
  // 短袖上衣
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
    id: "6",
    name: "街頭潮流連帽上衣 彩色塗鴉印花 男女款",
    price: 1680,
    image: product6,
    category: "shirts",
    subcategory: "中性",
  },
  {
    id: "7",
    name: "Adidas 女款修身短袖運動上衣 粉色",
    price: 1180,
    image: product2,
    category: "shirts",
    subcategory: "女裝",
  },
  {
    id: "8",
    name: "Under Armour 女款訓練背心 黑色",
    price: 890,
    image: product3,
    category: "shirts",
    subcategory: "女裝",
  },
  // 戶外鞋
  {
    id: "5",
    name: "Nike W Terra Manta 女 運動休閒鞋 復古鞋 舒適 穿搭 白黑",
    price: 2900,
    image: product1,
    category: "shoes",
    subcategory: "運動鞋",
  },
  {
    id: "9",
    name: "New Balance 574 經典復古休閒鞋 灰色",
    price: 2680,
    image: product1,
    category: "shoes",
    subcategory: "休閒鞋",
  },
  {
    id: "10",
    name: "Merrell 防水登山鞋 男款 棕色",
    price: 4500,
    image: product1,
    category: "shoes",
    subcategory: "登山鞋",
  },
  {
    id: "11",
    name: "Salomon X Ultra 4 GTX 防水越野跑鞋",
    price: 5200,
    image: product1,
    category: "shoes",
    subcategory: "登山鞋",
  },
  // 餐盤
  {
    id: "12",
    name: "北歐風陶瓷餐盤 8吋 霧灰色",
    price: 380,
    image: product4,
    category: "dinnerware",
    subcategory: "陶瓷",
  },
  {
    id: "13",
    name: "日式手繪青花瓷盤 圓形 10吋",
    price: 520,
    image: product5,
    category: "dinnerware",
    subcategory: "陶瓷",
  },
  {
    id: "14",
    name: "304不鏽鋼分隔餐盤 兒童款",
    price: 290,
    image: product6,
    category: "dinnerware",
    subcategory: "不鏽鋼",
  },
  {
    id: "15",
    name: "相思木質圓形托盤 手工製作",
    price: 680,
    image: product2,
    category: "dinnerware",
    subcategory: "木質",
  },
  {
    id: "16",
    name: "橡木質感方形餐盤 日式簡約",
    price: 450,
    image: product3,
    category: "dinnerware",
    subcategory: "木質",
  },
];
