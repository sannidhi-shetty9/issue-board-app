import type { ReactNode } from "react";

export interface DragProps {
  children?: ReactNode;
  draggable?: boolean;
  className?: string;
  onDragStart?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrag?: (e: React.DragEvent<HTMLDivElement>) => void;
  onClick?: () => void;
}

export function Drag({
  children = null,
  draggable = true,
  className = "",
  onDragStart = () => {},
  onDragEnd = () => {},
  onDrag = () => {},
  onClick = () => {},
}: DragProps) {
  return (
    <div
      className={` ${className}`}
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDrag={onDrag}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export interface DropProps {
  children?: ReactNode;
  className?: string;
  onDrop?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnter?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave?: (e: React.DragEvent<HTMLDivElement>) => void;
}

export function Drop({
  children = null,
  className = "",
  onDrop = () => {},
  onDragOver = () => {},
  onDragEnter = () => {},
  onDragLeave = () => {},
}: DropProps) {
  return (
    <div
      className={` ${className}`}
      onDrop={onDrop}
      onDragOver={(e) => {
        e.preventDefault();
        onDragOver(e);
      }}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
    >
      {children}
    </div>
  );
}
