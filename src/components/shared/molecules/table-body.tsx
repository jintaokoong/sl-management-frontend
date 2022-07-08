import { Fragment, ReactNode } from "react";

interface Props<T> {
  data: T[];
  loading?: boolean;
  fallback?: ReactNode;
  children: (item: T, index: number) => ReactNode;
}

const TableBody = <T,>(p: Props<T>) => {
  return (
    <tbody>
      {p.loading
        ? Array(5)
            .fill(0)
            .map((_, index) => <Fragment key={index}>{p.fallback}</Fragment>)
        : p.data.map(p.children)}
    </tbody>
  );
};

export default TableBody;
