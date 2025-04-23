import { CardTableType } from "./CardsTableType";

export interface DynamicCardType extends CardTableType {
  [key: string]: string | number | boolean | null | undefined;
}
