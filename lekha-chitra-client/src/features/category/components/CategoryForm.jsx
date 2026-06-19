import Input from "../../../components/common/Input";
import FormButtons from "./FormButtons";

function CategoryForm({ value, onChange, onSubmit, onCancel }) {
  return (
    <div
      className="
        flex
        flex-col
        gap-8
      "
    >
      <Input
        placeholder="Enter Category"
        value={value}
        onChange={onChange}
        className="w-full"
        inputClassName="
          border
          border-[#E59C11]
          placeholder:text-gray-400
        "
      />

      <FormButtons onSubmit={onSubmit} onCancel={onCancel} />
    </div>
  );
}

export default CategoryForm;
