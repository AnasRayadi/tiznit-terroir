import { useState } from "react";

export const useCollapsibleState = (initialState = false) => {
    const [isOpen, setIsOpen] = useState(initialState);
  
    const toggleCollapsible = () => {
      setIsOpen(!isOpen);
    };
  
    return [isOpen, toggleCollapsible];
};