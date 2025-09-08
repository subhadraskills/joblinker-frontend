import type { ReactElement } from "react";

export function SidebarItem({
  text,
  icon,
  open,
}: {
  text: string;
  icon: ReactElement;
  open: boolean;
}) {
  return (
    <div
      className={`flex items-center text-gray-800 py-2 cursor-pointer hover:bg-gray-200 rounded transition-all duration-150 ${
        open ? "pl-4" : "justify-center"
      }`}
      title={open ? "" : text} 
    >
      <div className="pr-2">{icon}</div>
      {open && <span>{text}</span>}
    </div>
  );
}
