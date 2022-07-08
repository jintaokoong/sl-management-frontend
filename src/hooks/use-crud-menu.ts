import { useState } from "react";

type State = "edit" | "delete" | "initial";

interface UseCRUDMenuReturn {
  state: State;
  onConfirm: (s: Exclude<State, "initial">) => void;
  onReset: () => void;
}

const useCRUDMenu = (): UseCRUDMenuReturn => {
  const [state, setState] = useState<State>("initial");
  return {
    onConfirm: (s: Exclude<State, "initial">) => setState(s),
    onReset: () => setState("initial"),
    state,
  };
};

export default useCRUDMenu;
