export interface ISearchInputProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder?: string;
  clearLabel?: string;
}
