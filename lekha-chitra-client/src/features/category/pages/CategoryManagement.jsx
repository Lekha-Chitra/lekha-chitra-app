import { useState, useEffect } from "react";

import CategoryHeader from "../components/CategoryHeader";
import CategoryCard from "../components/CategoryCard";
import CategoryForm from "../components/CategoryForm";
import SubCategoryForm from "../components/SubCategoryForm";
import CategoryTable from "../components/CategoryTable";

import {
  getCategories,
  addCategory,
  addSubCategory,
  getSubCategories,
} from "../services/categoryService";

function CategoryManagement() {
  // Category Form
  const [category, setCategory] = useState("");

  // Sub Category Form
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  // API Data
  const [categories, setCategories] = useState([]);
  // const [subCategories, setSubCategories] = useState([]);

  // =========================
  // Fetch Categories
  // =========================
useEffect(() => {
  const fetchCategories = async () => {
    try {
      const response = await getCategories();
     // console.log(response);
      if (response.isSuccess) {
        setCategories(response.data.categories);
       // console.log(response.data.categories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  fetchCategories();
}, []);

  
  const handleCategorySubmit = async () => {
    console.log(category);
  };

  const handleSubCategorySubmit = async () => {
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
   <p>
    
    {/* {fetchCategories()} */}
    
   </p>
        
      </main>
    </div>
  );
}

export default CategoryManagement;
