import { LuArrowUp, LuArrowDown, LuChevronsUpDown } from "react-icons/lu";

interface SortIconProps {
    direction: false | "asc" | "desc";
}

export function SortIcon({ direction }: SortIconProps) {
    if (direction === "asc")
        return <LuArrowUp className="w-3.5 h-3.5 text-primary" />;
    if (direction === "desc")
        return <LuArrowDown className="w-3.5 h-3.5 text-primary" />;
    return <LuChevronsUpDown className="w-3.5 h-3.5 text-muted/50" />;
}
