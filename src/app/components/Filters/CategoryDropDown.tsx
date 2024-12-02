import { useRef, FC, ReactNode } from "react";

interface DropdownProps {
    children: ReactNode;
    isOpen: boolean;
    toggle: (isOpen: boolean) => void;
}

const CategoryDropDown: FC<DropdownProps> = ({ children, isOpen, toggle }) => {
    const dropdownRef = useRef<HTMLDivElement>(null);
    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => toggle(!isOpen)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
            >
                Select Categories
            </button>
            {isOpen && (
                <div className="absolute z-10 mt-2 py-2 w-64 bg-white rounded-md shadow-xl border border-gray-200">
                    {children}
                </div>
            )}
        </div>
    );
};

export default CategoryDropDown;
