import { range } from "ramda";
import { FC, Fragment, PropsWithChildren } from "react";

interface Props {
  occurence: number;
}

const Repeat: FC<PropsWithChildren<Props>> = (p) => {
  return (
    <>
      {range(0, p.occurence).map((val) => (
        <Fragment key={val}>{p.children}</Fragment>
      ))}
    </>
  );
};

export default Repeat;
