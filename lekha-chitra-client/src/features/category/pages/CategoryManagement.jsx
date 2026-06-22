import { useEffect, useState } from "react";
import CategoryHeader from "../components/CategoryHeader";
import CategoryCard from "../components/CategoryCard";
import CategoryForm from "../components/CategoryForm";
import SubCategoryForm from "../components/SubCategoryForm";
// import CategoryTable from "../components/CategoryTable";
import { DataTable } from "../../../components/table";
import { categoryColumns } from "../columns/categoryColumns";

import {
  getCategories,
  addCategory,
  getSubCategories,
  addSubCategory,
} from "../services/categoryService";

function CategoryManagement() {
  // ==========================
  // Form States
  // ==========================
  const [category, setCategory] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  // ==========================
  // API Data
  // ==========================
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  // ==========================
  // Fetch Categories
  // ==========================
  const fetchCategories = async () => {
    try {
      const response = await getCategories();

      if (response.isSuccess) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // ==========================
  // Fetch Sub Categories
  // ==========================
  const fetchSubCategories = async () => {
    try {
      const response = await getSubCategories();

      if (response.isSuccess) {
        setSubCategories(response.data);
      }
    } catch (error) {
      console.error("Error fetching sub categories:", error);
    }
  };

  // ==========================
  // Initial Load
  // ==========================
  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
  }, []);

  // ==========================
  // Add Category
  // ==========================
  const handleCategorySubmit = async () => {
    const categoryName = category.trim();

    if (!categoryName) {
      alert("Please enter category name.");
      return;
    }

    const alreadyExists = categories.some(
      (item) => item.toLowerCase() === categoryName.toLowerCase(),
    );

    if (alreadyExists) {
      alert("Category already exists.");
      return;
    }

    try {
      const response = await addCategory({
        name: categoryName,
      });

      if (response.isSuccess) {
        alert(response.message);

        setCategory("");

        await fetchCategories();
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to add category.");
    }
  };

  // ==========================
  // Add Sub Category
  // ==========================
  const handleSubCategorySubmit = async () => {
    const subCategoryName = subCategory.trim();

    if (!selectedCategory) {
      alert("Please select a category.");
      return;
    }

    if (!subCategoryName) {
      alert("Please enter sub category.");
      return;
    }

    const alreadyExists = subCategories.some(
      (item) =>
        item.category.toLowerCase() === selectedCategory.toLowerCase() &&
        item.subCategory.toLowerCase() === subCategoryName.toLowerCase(),
    );

    if (alreadyExists) {
      alert("Sub category already exists.");
      return;
    }

    try {
      const response = await addSubCategory({
        category: selectedCategory,
        subCategoryName: subCategoryName,
      });

      if (response.isSuccess) {
        alert(response.message);

        setSelectedCategory("");
        setSubCategory("");

        await fetchSubCategories();
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to add sub category.");
    }
  };
const tableData = subCategories.map((item) => ({
  category: item.category,
  subCategory: item.subCategory,
}));


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

        <DataTable
        columns ={categoryColumns} 
        data={tableData}
        />
      </main>
    </div>
  );
}

export default CategoryManagement;