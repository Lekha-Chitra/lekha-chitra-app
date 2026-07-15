import { useEffect, useState, useMemo } from "react";
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
import { Search } from "lucide-react";
import { FaPlus } from "react-icons/fa";

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
  const [search, setSearch] = useState("");

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

const tableData = useMemo(() => {
  return subCategories.map((item) => ({
    category: item.category,
    subCategory: item.subCategory,
  }));
}, [subCategories]);

const filteredTableData = useMemo(() => {
  if (!search.trim()) return tableData;

  const term = search.toLowerCase();

  return tableData.filter((item) => {
    return (
      item.category?.toLowerCase().includes(term) ||
      item.subCategory?.toLowerCase().includes(term)
    );
  });
}, [tableData, search]);
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
        // alert(response.message);
        showNotification(response.message, "success");

        setCategory("");

        await fetchCategories();
      } else {
        showNotification(response.message, "error");
      }
    } catch (error) {
      // console.error(error);
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
      // console.error(error);
      showNotification("Failed to add sub category.", "error");
    }
  };



  return (
    <div className="flex min-h-screen bg-[#F3F3F3]">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <main
        className="
        flex-1
         md:ml-[70px]
        min-h-screen
        overflow-y-auto
        overflow-x-hidden
        p-4
        md:p-6
        lg:p-8
      "
      >
        {/* Header */}
        <Header title="Category" />

        {/* Mobile Hamburger */}
        <div className="md:hidden mt-4 mb-5">
          <button
            onClick={() => setSidebarOpen(true)}
            className="bg-[#032A5C] text-white p-3 rounded-lg shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Action Buttons */}

<div className="flex flex-wrap items-center gap-4 mt-6 mb-4">
  {/* Add Category */}
  <button
    onClick={() => setOpen(true)}
    className="
      inline-flex
      items-center
      gap-2
      px-3
      h-10
      rounded-lg
      text-sm
      font-medium
      text-white
      bg-[#032A4E]
      hover:opacity-90
      whitespace-nowrap
    "
  >
    <FaPlus size={12} />
    Add Category
  </button>

  {/* Search */}
  <div className="relative flex-1 min-w-[250px]">
    <Search
      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      size={18}
    />
    <input
      type="text"
      placeholder="Search category or subcategory..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="
        w-full
        h-10
        rounded-lg
        border
        border-gray-300
        pl-10
        pr-4
        text-sm
        focus:outline-none
        focus:ring-2
        focus:ring-[#032A4E]
      "
    />
  </div>

  {/* Add Sub Category */}
  <button
    onClick={() => setSubOpen(true)}
    className="
      inline-flex
      items-center
      gap-2
      px-3
      h-10
      rounded-lg
      text-sm
      font-medium
      text-white
      bg-[#E59C11]
      hover:opacity-90
      whitespace-nowrap
    "
  >
    <FaPlus size={12} />
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
        {/* Notification */}
        <div className="flex justify-center mb-4">
          <Notification
            message={notification.message}
            type={notification.type}
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <SubCategoryDataTable
            title="Sub Categories"
            columns={categoryColumns}
            data={filteredTableData}
            rowHeight={56}
            onEdit={(row) => {
              console.log("Editing row:", row);
            }}
          />
        </div>
      </main>
    </div>
  );
}

export default CategoryManagement; 