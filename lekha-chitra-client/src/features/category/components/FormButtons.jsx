import Button from "../../../components/common/Button";

function FormButtons({
  onSubmit,
  onCancel,
  submitText = "Submit",
  cancelText = "Cancel",
}) {
  return (
    <div
      className="
        flex
        flex-wrap
        gap-4
      "
    >
      <Button
        type="button"
        onClick={onSubmit}
        className="
          h-11
          md:h-12

          px-8

          rounded-full

          bg-[#E59C11]
          text-white
        "
      >
        {submitText}
      </Button>

      <Button
        type="button"
        onClick={onCancel}
        className="
          h-11
          md:h-12

          px-8

          rounded-full

          border
          border-[#E59C11]

          text-[#E59C11]
          bg-white

          hover:bg-[#FFF8EA]
        "
      >
        {cancelText}
      </Button>
    </div>
  );
}

export default FormButtons;
