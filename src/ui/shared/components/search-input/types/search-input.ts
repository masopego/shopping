export interface ISearchInputProps {
  value: string;
  onChange: (value: string) => void;
  /* Accessible name of the field. Leave it out when the placeholder already describes the field: screen
     readers would read both texts */
  label?: string;
  placeholder?: string;
  clearLabel?: string;
}
