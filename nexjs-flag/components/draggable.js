import React from "react";
import { useDraggable } from "@dnd-kit/core";
import {CSS} from '@dnd-kit/utilities'

const CustomStyle = {
  display: "block",
  width: "400px",
  height: "400px"
};

export function Draggable({ id, content, styles }) {
  const { 
      // useDraggable properties
      attributes, 
      listeners, 
      setNodeRef, 
      transform,
      transition
   } = useDraggable({id});

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
      }
    : {};

  return (
    <div
      ref={setNodeRef}
      style={{ ...style, ...CustomStyle, ...styles }}
      {...listeners}
      {...attributes}
    >
      {content}
    </div>
  );
}
