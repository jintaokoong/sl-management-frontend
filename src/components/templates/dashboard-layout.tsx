import { AppShell, Header, Text } from "@mantine/core";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <AppShell
      header={
        <Header height={60}>
          <Text>歌單管理</Text>
        </Header>
      }
    >
      <Outlet />
    </AppShell>
  );
};

export default DashboardLayout;
