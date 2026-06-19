import { ChevronDown } from "lucide-react";
import Input from "../../../components/common/Input";
import FormButtons from "./FormButtons";

function SubCategoryForm({
  categories = [],
  selectedCategory,
  onCategoryChange,
  value,
  onChange,
  onSubmit,
  onCancel,
}) {
  return (
    <div
      className="
        flex
        flex-col
        gap-6
      "
    >
      {/* Category */}
      <div className="flex flex-col gap-2">
        <label
          className="
            font-medium
            text-sm
            sm:text-base
          "
        >
          Category
        </label>

        <div className="relative">
          <select
            value={selectedCategory}
            onChange={onCategoryChange}
            className="
              w-full
              h-11
              md:h-12

              rounded-lg

              border
              border-[#E59C11]

              px-4
              pr-10

              appearance-none
              outline-none
            "
          >
            <option value="">Select Category</option>

            {categories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.categoryName}
              </option>
            ))}
          </select>

          <ChevronDown
            size={18}
            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              pointer-events-none
            "
          />
        </div>
      </div>

      {/* Sub Category */}
      <div className="flex flex-col gap-2">
        <label
          className="
            font-medium
            text-sm
            sm:text-base
          "
        >
          Sub Category
        </label>

        <Input
          placeholder="Enter Sub Category"
          value={value}
          onChange={onChange}
          className="w-full"
          inputClassName="
            border
            border-[#E59C11]
          "
        />
      </div>

      <FormButtons onSubmit={onSubmit} onCancel={onCancel} />
    </div>
  );
}

export default SubCategoryForm;
