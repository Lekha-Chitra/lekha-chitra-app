import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import CategoryForm from "./CategoryForm";

function CategoryCard({
  open,
  setOpen,
  category,
  setCategory,
  handleCategorySubmit,
}) {
  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
      <DialogTitle>Add Category</DialogTitle>

      <DialogContent>
        <CategoryForm
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          onSubmit={(e) => {
            handleCategorySubmit(e);
            setOpen(false);
          }}
          onCancel={() => {
            setCategory("");
            setOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

export default CategoryCard;