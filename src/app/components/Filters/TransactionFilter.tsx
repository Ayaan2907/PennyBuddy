import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CategoryDropDown from "@/app/components/Filters/CategoryDropDown";
import { TransactionFiltersProps } from "@/app/models/transactionUtils";

export default function TransactionFilters({
  filter,
  setFilter,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  selectedCategories,
  setSelectedCategories,
  categoryColorMap,
  searchTerm,
  setSearchTerm,
  isOpen,
  toggleDropdown,
}: TransactionFiltersProps) {
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  };

  const handleDateRangeChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start ?? undefined);
    setEndDate(end ?? undefined);
  };

  const handleCategorySelection = (category: string) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((cat) => cat !== category)
        : [...prevCategories, category]
    );
  };

  const filteredCategories = Object.keys(categoryColorMap).filter((category) =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="mb-6 p-6 bg-white shadow rounded-lg w-full">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:flex-wrap">
        {/* Transaction Type */}
        <div className="flex flex-col mb-4 sm:mb-0">
          <h3 className="font-semibold text-lg text-gray-800 mb-2">
            Transaction Type
          </h3>
          <div className="flex space-x-2">
            {["all", "credit", "debit"].map((type) => (
              <label key={type} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="type"
                  value={type}
                  checked={filter.type === type}
                  onChange={handleFilterChange}
                  className="peer hidden"
                />
                <span
                  className={`
                    px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors duration-300
                    ${filter.type === type
                      ? type === "all"
                        ? "peer-checked:bg-blue-600 peer-checked:text-white"
                        : type === "credit"
                          ? "peer-checked:bg-green-600 peer-checked:text-white"
                          : "peer-checked:bg-red-600 peer-checked:text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"}
                  `}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Category Filter Dropdown */}
        <div className="flex flex-col mb-4 sm:mb-0 sm:flex-grow">
          <h3 className="font-semibold text-lg text-gray-800 mb-2">Category</h3>
          <CategoryDropDown isOpen={isOpen} toggle={toggleDropdown}>
            <div className="p-4 bg-white border rounded shadow-lg">
              <input
                type="text"
                placeholder="Search categories"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
              />
              <div className="flex flex-wrap gap-2">
                {filteredCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategorySelection(category)}
                    className={`
                      px-4 py-2 text-sm rounded-full transition-all duration-300
                      ${selectedCategories.includes(category)
                        ? "bg-gray-800 text-white font-semibold"
                        : `${categoryColorMap[category]} bg-gray-100 text-gray-700 hover:bg-gray-200`}
                    `}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </CategoryDropDown>
        </div>

        {/* Date Range Picker */}
        <div className="flex flex-col mb-4 sm:mb-0">
          <h3 className="font-semibold text-lg text-gray-800 mb-2">
            Date Range
          </h3>
          <DatePicker
            selected={startDate}
            onChange={handleDateRangeChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            isClearable
            className="px-4 py-2 border rounded-md w-full sm:w-auto text-black"
          />
        </div>

        {/* Date Sorting */}
        <div className="flex flex-col">
          <h3 className="font-semibold text-lg text-gray-800 mb-2">
            Sort By Date
          </h3>
          <div className="flex space-x-2">
            {["asc", "desc"].map((sort) => (
              <label key={sort} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="sortByDate"
                  value={sort}
                  checked={filter.sortByDate === sort}
                  onChange={handleFilterChange}
                  className="peer hidden"
                />
                <span
                  className={`
                    px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors duration-300
                    ${filter.sortByDate === sort
                      ? sort === "asc"
                        ? "peer-checked:bg-blue-600 peer-checked:text-white"
                        : "peer-checked:bg-indigo-600 peer-checked:text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"}
                  `}
                >
                  {sort.charAt(0).toUpperCase() + sort.slice(1)}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}