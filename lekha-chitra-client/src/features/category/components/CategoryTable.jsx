function CategoryTable() {
  return (
    <div
      className="
        w-full
        bg-white
        rounded-lg
        shadow-lg

        mt-8

        p-5
        sm:p-6
        lg:p-8
      "
    >
      <h2
        className="
          text-xl
          sm:text-2xl
          font-semibold
          mb-6
        "
      >
        Category List
      </h2>

      <div
        className="
          w-full

          min-h-[300px]
          xl:min-h-[420px]

          border-2
          border-dashed
          border-gray-300

          rounded-lg

          flex
          justify-center
          items-center
        "
      >
        <p className="text-gray-400">React Data Grid will be displayed here</p>
      </div>
    </div>
  );
}

export default CategoryTable;