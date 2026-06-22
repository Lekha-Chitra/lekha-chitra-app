import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import SubCategoryForm from "./SubCategoryForm";

function SubCategoryCard({
  open,
  setOpen,
  categories,
  selectedCategory,
  setSelectedCategory,
  subCategory,
  setSubCategory,
  handleSubCategorySubmit,
}) {
  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
      <DialogTitle>Add Sub Category</DialogTitle>

      <DialogContent>
        <SubCategoryForm
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={(e) => setSelectedCategory(e.target.value)}
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
          onSubmit={(e) => {
            handleSubCategorySubmit(e);
            setOpen(false);
          }}
          onCancel={() => {
            setSelectedCategory("");
            setSubCategory("");
            setOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

export default SubCategoryCard;