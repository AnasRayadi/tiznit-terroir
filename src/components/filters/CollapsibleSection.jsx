import { useCollapsibleState } from "@/hooks/useCollapsibleState";

const CollapsibleSection = ({ title, children, initialState = false }) => {
    const [isOpen, toggleCollapsible] = useCollapsibleState(initialState);
  
    return (
      <div className="border-b-[1px] border-gray-300 lg:border-none order-[-1] p-1 md:px-2 md:py-3 lg:p-0">
        <div
          onClick={toggleCollapsible}
          className="py-3 cursor-pointer flex items-center justify-between lg:justify-start gap-4 text-lg md:text-xl"
        >
          <span className="text-lg font-semibold">{title}</span>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 512 512"
            className={`${
              isOpen ? "transition-all rotate-180" : "transition-all"
            }`}
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z"></path>
          </svg>
        </div>
        {isOpen && children}
      </div>
    );
  };
  
export default CollapsibleSection;