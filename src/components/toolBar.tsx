import { useStore } from "@/context/StateContext";
import ColorPicker from "./colorPicker";
import {
  Menubar,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger,
} from "./ui/menubar";
import { cn } from "@/lib/utils";
import { TOOLS } from "@/constants/toolBar";

const hotKeyAssign = ({
  key,
  callBack,
}: {
  key: string;
  callBack: ({
    e,
    hotKey,
  }: {
    e?: KeyboardEvent;
    hotKey?: string;
  }) => void;
}) => {
  document.addEventListener("keydown", (e:KeyboardEvent)=>callBack({e}));
  return key;
};

export type keyType = keyof typeof TOOLS;

export default function ToolBar() {
  const { hotKey, setHotKey, setColor, color } = useStore();

  const toggleHotKey = ({
    e,
    keyPressed,
  }: {
    e?: KeyboardEvent;
    keyPressed?: string;
  }) => {
    const key = e ? e.key.toUpperCase() : keyPressed;
    if (key) {
      if (hotKey === key) {
        setHotKey(null);
      } else {
        if (Object.keys(TOOLS).includes(key)) {
          setHotKey(key);
        }
      }
    }
  };

  return (
    <>
      <div className="flex justify-center fixed w-full px-3 mt-3 h-auto">
        <Menubar className="p-3 flex flex-wrap sm:flex-nowrap sm:flex-row justify-center items-center sm:justify-between gap-5 bg-gray-200 shadow-2xs border border-gray-300 w-fit h-auto sm:h-10">
          <MenubarMenu>
            {Object.keys(TOOLS).map((Key, i) => {
              const key = Key as keyType;
              return (
                <MenubarTrigger
                  onClick={() => toggleHotKey({keyPressed:TOOLS[key].hotkey})}
                  key={`${i}-${TOOLS[key].hotkey}`}
                  className={cn(
                    "group cursor-pointer flex gap-1 items-center justify-center",
                    hotKey === TOOLS[key].hotkey
                      ? "bg-gray-500 text-white"
                      : "hover:bg-gray-500 hover:text-white",
                  )}
                >
                  {TOOLS[key].label}
                  <MenubarShortcut
                    className={cn(
                      hotKey === TOOLS[key].hotkey
                        ? "bg-gray-500 text-white"
                        : "group-hover:bg-gray-500 group-hover:text-white",
                    )}
                  >
                    {hotKeyAssign({
                      key: TOOLS[key].hotkey,
                      callBack: toggleHotKey,
                    })}
                  </MenubarShortcut>
                </MenubarTrigger>
              );
            })}
            <MenubarTrigger className="cursor-pointer flex gap-1 items-center justify-center p-0 rounded-2xl">
              <ColorPicker onChange={setColor} initialColor={color} className="size-5" />
            </MenubarTrigger>
          </MenubarMenu>
        </Menubar>
      </div>
    </>
  );
}
