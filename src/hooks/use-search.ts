import { useDebouncedValue, useInputState } from "@mantine/hooks";
import { useMemo } from "react";

interface UseSearchReturn {
  input: {
    value: string;
    onChange: (
      value: string | React.ChangeEvent<any> | null | undefined
    ) => void;
  };
  search: string | undefined;
}

export const useSearch = (): UseSearchReturn => {
  const [input, setInput] = useInputState("");
  const [debounced] = useDebouncedValue(input, 1000);
  const search = useMemo(
    () => (debounced.length === 0 ? undefined : debounced),
    [debounced]
  );
  return {
    input: {
      value: input,
      onChange: setInput,
    },
    search: search,
  };
};
