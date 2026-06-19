function CategoryCard({ title, children }) {
  return (
    <div
      className="
        w-full
        bg-white
        rounded-lg
        shadow-lg

        p-5
        sm:p-6
        lg:p-8
      "
    >
      <h2
        className="
          text-[#1E1E1E]
          font-semibold

          text-xl
          sm:text-2xl
          lg:text-3xl

          mb-8
        "
      >
        {title}
      </h2>

      {children}
    </div>
  );
}

export default CategoryCard;
