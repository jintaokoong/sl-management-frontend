import useCRUDMenu from "@/hooks/use-crud-menu";
import { Menu } from "@mantine/core";
import { useBooleanToggle } from "@mantine/hooks";
import { FC } from "react";
import { GoPencil, GoTrashcan, GoInfo } from "react-icons/go";

interface Props {
  onEdit?: () => void;
  onDelete?: () => void;
}

const CRUDControl: FC<Props> = (p) => {
  const { state, onConfirm, onReset } = useCRUDMenu();
  const [opened, toggle] = useBooleanToggle();
  const handler = (s: "edit" | "delete") => () => {
    if (state === "initial") {
      return onConfirm(s);
    } else if (state === "edit") {
      p.onEdit && p.onEdit();
      toggle();
      return onReset();
    } else {
      p.onDelete && p.onDelete();
      toggle();
      return onReset();
    }
  };

  return (
    <Menu
      placement={"end"}
      opened={opened}
      onOpen={() => toggle()}
      onClose={() => {
        if (state === "initial") return;
        toggle();
        return onReset();
      }}
    >
      <Menu.Item
        icon={state === "edit" ? <GoInfo /> : <GoPencil />}
        color={state === "edit" ? "yellow" : "blue"}
        onClick={handler("edit")}
      >
        {state === "edit" ? "確定編輯" : "編輯"}
      </Menu.Item>
      <Menu.Item
        icon={state === "delete" ? <GoInfo /> : <GoTrashcan />}
        color={state === "delete" ? "yellow" : "red"}
        onClick={handler("delete")}
      >
        {state === "delete" ? "確定刪除" : "刪除"}
      </Menu.Item>
    </Menu>
  );
};

export default CRUDControl;
