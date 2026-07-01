import { useStore } from "@/context/StateContext";
import { drawRect } from "./canvas";
import ColorPicker from "./colorPicker";
import {
  Menubar,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger,
} from "./ui/menubar";

const hotKeyAssign = ({
  key,
  callBack,
}: {
  key: string;
  callBack: () => void;
}) => {
  document.addEventListener("keydown", callBack);
  return key;
};

export default function ToolBar() {
  const { setHotKey, setColor, getCanvas, getCords, current } = useStore();
  const cords = getCords();
  const canvas = getCanvas();

  return (
    <>
      <div className="flex justify-center fixed w-full mt-3 h-auto">
        <Menubar className="bg-gray-200 shadow-2xs border border-gray-300 w-1/2 h-10">
          <MenubarMenu>
            <MenubarTrigger className="flex gap-1 items-center justify-center">
              Rectangle
              <MenubarShortcut>
                {hotKeyAssign({
                  key: "R",
                  callBack: () => {
                    if(canvas && cords && current){
                      setHotKey('R');
                      return drawRect(canvas, cords, current);
                    }
                  },
                })}
              </MenubarShortcut>
            </MenubarTrigger>
            <MenubarTrigger className="flex gap-1 items-center justify-center p-0 rounded-2xl">
              <ColorPicker onChange={setColor} className="size-5" />
            </MenubarTrigger>
          </MenubarMenu>
        </Menubar>
      </div>
    </>
  );
}
