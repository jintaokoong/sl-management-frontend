import { ReactNode } from "react";

interface Props<T> {
  data: T[];
  children: (item: T, index: number) => ReactNode;
}

const TableBody = <T,>(p: Props<T>) => {
  return <tbody>{p.data.map(p.children)}</tbody>;
};

export default TableBody;
