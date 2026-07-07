import { Compact } from "@uiw/react-color";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export default function ColorPicker({
  initialColor = "#FFFFFF",
  className,
  onChange,
}: {
  initialColor?: string;
  className?: string;
  onChange?: (x: string) => void;
}) {
  const [color, setColor] = useState(initialColor);
  const [open, setOpen] = useState(true);
  const toggle = () => setOpen((prev) => !prev);

  return (
    <>
      <div
        className={twMerge(
          `rounded-full w-full h-full flex flex-col items-center border`,
          className,
        )}
        onClick={toggle}
        style={{ backgroundColor: color }}
      >
        <div hidden={open} className="relative top-9">
          <Compact
            className="ml-5"
            color={color}
            onChange={(color) => {
              if (onChange) {
                onChange(color.hex);
                setColor(color.hex);
              }
            }}
          />
        </div>
      </div>
    </>
  );
}
