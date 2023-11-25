import React, { createContext, useContext, useRef, useState } from "react";

const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedItem, setEditedItem] = useState(null);

  const openModal = (user) => {
    setIsModalOpen(true);
    setEditedItem(user);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setEditedItem(null);
  };

  const inputRef = useRef(null);
  const setFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  const contextValue = {
    inputRef,
    setFocus,
    isModalOpen,
    setIsModalOpen,
    editedItem,
    setEditedItem,
    openModal,
    closeModal,
  };
  const Component = GlobalContext.Provider;
  return <Component value={contextValue}>{children}</Component>;
};

const useGlobalContext = () => useContext(GlobalContext);
export { GlobalContextProvider, useGlobalContext };
