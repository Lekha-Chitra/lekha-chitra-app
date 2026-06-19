import { useState } from "react";
import CategoryHeader from "../components/CategoryHeader";
import CategoryCard from "../components/CategoryCard";
import CategoryForm from "../components/CategoryForm";
import SubCategoryForm from "../components/SubCategoryForm";
import CategoryTable from "../components/CategoryTable";

function CategoryManagement() {
  const [category, setCategory] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  // Temporary data
  const categories = [
    { id: 1, categoryName: "Cement" },
    { id: 2, categoryName: "Steel" },
    { id: 3, categoryName: "Sand" },
  ];

  const handleCategorySubmit = () => {
    console.log(category);
  };

  const handleSubCategorySubmit = () => {
    console.log(selectedCategory, subCategory);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <CategoryHeader />

      <main
        className="
          max-w-7xl
          mx-auto

          px-4
          sm:px-6
          lg:px-8

          py-8
        "
      >
        <div
          className="
            grid
            grid-cols-1
            xl:grid-cols-2
            gap-8
          "
        >
          <CategoryCard title="ADD CATEGORY">
            <CategoryForm
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              onSubmit={handleCategorySubmit}
              onCancel={() => setCategory("")}
            />
          </CategoryCard>

          <CategoryCard title="ADD SUB CATEGORY">
            <SubCategoryForm
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={(e) => setSelectedCategory(e.target.value)}
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              onSubmit={handleSubCategorySubmit}
              onCancel={() => {
                setSelectedCategory("");
                setSubCategory("");
              }}
            />
          </CategoryCard>
        </div>

        <CategoryTable />
      </main>
    </div>
  );
}

export default CategoryManagement;