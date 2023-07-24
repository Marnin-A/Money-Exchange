export type balanceElement = {
  [key: string]: number;
};
export interface CurrencyProps {
  options: Array<option>;
}
export type option = {
  flag?: string;
  label: string;
  value?: string;
  sign?: string;
};
