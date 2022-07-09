import { ActionIcon, Menu } from "@mantine/core";
import { GoSignOut } from "react-icons/go";

interface Props {
  initial: string | null;
  signOut: () => void;
}

const AvatarDropdown = (p: Props) => {
  return (
    <Menu
      control={
        <ActionIcon variant={"light"} color={"blue"} radius={"xl"} size={36}>
          {p.initial}
        </ActionIcon>
      }
    >
      <Menu.Label>管理帳號</Menu.Label>
      <Menu.Item icon={<GoSignOut />} onClick={p.signOut}>
        登出
      </Menu.Item>
    </Menu>
  );
};

export default AvatarDropdown;
