import { Category } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CategoryTabsProps {
  categories: Category[];
  activeCategory: string;
  activeSubcategory: string | null;
  onCategoryChange: (categoryId: string) => void;
  onSubcategoryChange: (subcategory: string | null) => void;
}

const CategoryTabs = ({
  categories,
  activeCategory,
  activeSubcategory,
  onCategoryChange,
  onSubcategoryChange,
}: CategoryTabsProps) => {
  const currentCategory = categories.find((c) => c.id === activeCategory);

  return (
    <div className="bg-background p-3 flex gap-3">
      {/* Main Category Dropdown */}
      <Select
        value={activeCategory}
        onValueChange={(value) => {
          onCategoryChange(value);
          onSubcategoryChange(null);
        }}
      >
        <SelectTrigger className="flex-1 bg-card">
          <SelectValue placeholder="選擇分類" />
        </SelectTrigger>
        <SelectContent className="bg-card">
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Subcategory Dropdown */}
      {currentCategory?.subcategories && currentCategory.subcategories.length > 0 && (
        <Select
          value={activeSubcategory || "all"}
          onValueChange={(value) => onSubcategoryChange(value === "all" ? null : value)}
        >
          <SelectTrigger className="flex-1 bg-card">
            <SelectValue placeholder="選擇子分類" />
          </SelectTrigger>
          <SelectContent className="bg-card">
            <SelectItem value="all">全部</SelectItem>
            {currentCategory.subcategories.map((sub) => (
              <SelectItem key={sub} value={sub}>
                {sub}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
};

export default CategoryTabs;
