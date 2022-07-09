import { FormEvent } from "react";

export interface SharedFormProps<T> {
  initialValues: T;
  isMutating?: boolean;
  onSubmit: (values: T, event: FormEvent) => void;
  networkError?: string;
}
