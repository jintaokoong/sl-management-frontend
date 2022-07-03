import { Container, MediaQuery, Paper } from "@mantine/core";
import { ReactNode } from "react";

interface Props {
  formContent: ReactNode;
}

const LoginLayout = (p: Props) => {
  return (
    <MediaQuery smallerThan={"xs"} styles={{ paddingTop: "md" }}>
      <Container size={"xs"} p={"md"} pt={85} sx={{ maxWidth: "420px" }}>
        <Paper p={"md"}>{p.formContent}</Paper>
      </Container>
    </MediaQuery>
  );
};

export default LoginLayout;
