import React from "react";
import { useDroppable } from "@dnd-kit/core";

const CustomStyle = {
  display: "block",
  minWidth: "1000px",
  minHeight: "500px",
  border: "1px solid #000000",
};

export function Droppable({ children }) {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable"
  });
  const style = {
    color: isOver ? "green" : undefined
  };

  return (
    <div ref={setNodeRef} style={{ ...style, ...CustomStyle }}>
      {children}
    </div>
  );1
}