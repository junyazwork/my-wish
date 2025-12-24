import { Category } from "@/types";

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
    <div className="bg-background">
      {/* Main Categories */}
      <div className="flex overflow-x-auto scrollbar-hide border-b border-border">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => {
              onCategoryChange(category.id);
              onSubcategoryChange(null);
            }}
            className={`flex-shrink-0 px-5 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
              activeCategory === category.id
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Subcategories */}
      {currentCategory?.subcategories && currentCategory.subcategories.length > 0 && (
        <div className="flex overflow-x-auto scrollbar-hide py-2 px-2 gap-2 bg-secondary/50">
          <button
            onClick={() => onSubcategoryChange(null)}
            className={`flex-shrink-0 px-4 py-1.5 text-xs font-medium rounded-full transition-colors ${
              activeSubcategory === null
                ? "bg-primary text-primary-foreground"
                : "bg-card text-muted-foreground hover:bg-muted"
            }`}
          >
            全部
          </button>
          {currentCategory.subcategories.map((sub) => (
            <button
              key={sub}
              onClick={() => onSubcategoryChange(sub)}
              className={`flex-shrink-0 px-4 py-1.5 text-xs font-medium rounded-full transition-colors ${
                activeSubcategory === sub
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:bg-muted"
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryTabs;
