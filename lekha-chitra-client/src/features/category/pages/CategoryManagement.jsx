import { useEffect, useState } from "react";
import CategoryHeader from "../components/CategoryHeader";
import CategoryCard from "../components/CategoryCard";
import CategoryForm from "../components/CategoryForm";
import SubCategoryForm from "../components/SubCategoryForm";
import SubCategoryCard from "../components/SubCategoryCard";
// import CategoryTable from "../components/CategoryTable";
import SubCategoryDataTable from "../components/SubCategoryDataTable";
import { categoryColumns } from "../columns/categoryColumns";
import Sidebar from "../../client/components/Sidebar";
import Notification from "../../../components/common/Notification";
import {
  getCategories,
  addCategory,
  getSubCategories,
  addSubCategory,
} from "../services/categoryService";
import Header from "../../auth/pages/Header";

function CategoryManagement() {
  
  const [category, setCategory] = useState("");
  const [open, setOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
    const [openAddClient, setOpenAddClient] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notification, setNotification] = useState({
    message: "",
    type: "",
  });

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);


  const showNotification = (message, type) => {
    setNotification({
      message,
      type,
    });

    setTimeout(() => {
      setNotification({
        message: "",
        type: "",
      });
    }, 5000);
  };
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
      showNotification(
        "Please enter category name.",
        "error"
      )
      return;
    }

    const alreadyExists = categories.some(
      (item) => item.toLowerCase() === categoryName.toLowerCase(),
    );

    // if (alreadyExists) {
    //   alert("Category already exists.");
    //   return;
    // }
     if (alreadyExists) {
       showNotification("Category already exists.", "error");
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
        showNotification(response.message, "error");
      }
    } catch (error) {
      console.error(error);
       showNotification("Failed to add category.", "error");
    }
  };

  // ==========================
  // Add Sub Category
  // ==========================
  const handleSubCategorySubmit = async () => {
    const subCategoryName = subCategory.trim();

    if (!selectedCategory) {
      showNotification("Please select a category.", "error");
      return;
    }

    if (!subCategoryName) {
     showNotification("Please enter sub category.", "error");
      return;
    }

    const alreadyExists = subCategories.some(
      (item) =>
        item.category.toLowerCase() === selectedCategory.toLowerCase() &&
        item.subCategory.toLowerCase() === subCategoryName.toLowerCase(),
    );

    if (alreadyExists) {
      showNotification("Sub category already exists.", "error");
      return;
    }

    try {
      const response = await addSubCategory({
        category: selectedCategory,
        subCategoryName: subCategoryName,
      });

      if (response.isSuccess) {
         showNotification(response.message, "success");

        setSelectedCategory("");
        setSubCategory("");

        await fetchSubCategories();
      } else {
       showNotification(response.message, "error");
      }
    } catch (error) {
      console.error(error);
      showNotification("Failed to add sub category.", "error");
    }
  };
const tableData = subCategories.map((item) => ({
  category: item.category,
  subCategory: item.subCategory,
}));


  return (
     <div className="flex min-h-screen bg-[#F3F3F3]">
      
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main
        className="
          flex-1
          overflow-x-hidden
          p-4
          md:p-6
          lg:p-8
        "
      >
        <div className="-mt-2">
  <Header title="Category" />
</div>
        <div className="flex gap-4 m-1 mt-6 ">
          <button
            onClick={() => setOpen(true)}
            className="px-3 py-2 w-[220px] h-[50px] rounded-lg text-sm text-white rounded hover:opacity-90 bg-[#032A4E]"
          >
            Add Category
          </button>

          <button
            onClick={() => setSubOpen(true)}
            className="px-3 py-2 w-[220px] h-[50px] rounded-lg text-sm text-white rounded hover:opacity-90 bg-[#E59C11]"
          >
            Add Sub Category
          </button>

          <CategoryCard
            open={open}
            setOpen={setOpen}
            category={category}
            setCategory={setCategory}
            handleCategorySubmit={handleCategorySubmit}
          />

          <SubCategoryCard
            open={subOpen}
            setOpen={setSubOpen}
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            subCategory={subCategory}
            setSubCategory={setSubCategory}
            handleSubCategorySubmit={handleSubCategorySubmit}
          />
        </div>
        <div className="flex justify-center mb-1">
          <Notification
            message={notification.message}
            type={notification.type}
          />
        </div>
        <SubCategoryDataTable
          title="Sub Categories"
          columns={categoryColumns}
          data={tableData}
          rowHeight={56}
          onEdit={(row) => {
            console.log("Editing row:", row);
          }}
        />
      </main>
    </div>
  );
}

export default CategoryManagement; 