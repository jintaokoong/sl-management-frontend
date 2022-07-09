import { Menu } from "@mantine/core";
import { useBooleanToggle } from "@mantine/hooks";
import { FC, useCallback } from "react";
import { GoPencil, GoTrashcan, GoInfo } from "react-icons/go";

interface Props {
  onEdit?: () => void;
  onDelete?: () => void;
}

const CRUDControl: FC<Props> = (p) => {
  const [opened, toggle] = useBooleanToggle();
  const [del, toggleDel] = useBooleanToggle();

  const onClose = useCallback(() => {
    const timer = setTimeout(() => {
      toggleDel(false);
      clearTimeout(timer);
    }, 500);
    toggle();
  }, [toggle, toggleDel]);

  const onEditClick = useCallback(() => {
    p.onEdit && p.onEdit();
    onClose();
  }, [p.onEdit, onClose]);

  const onDeleteClick = useCallback(() => {
    if (!del) return toggleDel();
    p.onDelete && p.onDelete();
    onClose();
  }, [p.onDelete, del, onClose]);

  return (
    <Menu
      placement={"end"}
      opened={opened}
      transition={"pop-top-right"}
      onOpen={() => toggle()}
      closeOnItemClick={false}
      onClose={onClose}
    >
      <Menu.Item icon={<GoPencil />} color={"blue"} onClick={onEditClick}>
        編輯
      </Menu.Item>
      <Menu.Item
        icon={del ? <GoInfo /> : <GoTrashcan />}
        color={del ? "yellow" : "red"}
        onClick={onDeleteClick}
      >
        {del ? "確定刪除" : "刪除"}
      </Menu.Item>
    </Menu>
  );
};

export default CRUDControl;
