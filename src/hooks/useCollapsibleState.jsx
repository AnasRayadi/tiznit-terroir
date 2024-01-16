import { useState } from "react";

export const useCollapsibleState = (initialState) => {
    const [isOpen, setIsOpen] = useState(initialState);
  
    const toggleCollapsible = () => {
      setIsOpen(!isOpen);
    };
  
    return [isOpen, toggleCollapsible];
}; 