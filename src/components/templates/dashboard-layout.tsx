import { AppShell, Container, Group, Header, Text } from "@mantine/core";
import { Outlet } from "react-router-dom";
import useAuthState from "@/hooks/use-auth-state";
import AvatarDropdown from "@/components/molecules/avatar-dropdown";
import useLogout from "@/hooks/use-logout";

const initial = (value: string | undefined | null) => {
  if (!value) return null;
  return value.charAt(0).toUpperCase();
};

const DashboardLayout = () => {
  const { user } = useAuthState();
  const signOut = useLogout();
  return (
    <Container px={0}>
      <AppShell
        header={
          <Header height={60}>
            <Group
              position={"apart"}
              px={"md"}
              align={"center"}
              sx={{ height: "100%" }}
            >
              <Text>歌單管理</Text>
              <AvatarDropdown
                signOut={() => signOut()}
                initial={initial(user?.email)}
              />
            </Group>
          </Header>
        }
      >
        <Outlet />
      </AppShell>
    </Container>
  );
};

export default DashboardLayout;
