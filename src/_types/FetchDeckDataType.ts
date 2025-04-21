import { FetchCardType } from "./FetchCardType";
import { DecksTableType } from "./DecksTableType";
import { AttributeTableType } from "./AttributeTableType";

export interface FetchDeckDataType extends DecksTableType {
  attributes: AttributeTableType[];
  cards: FetchCardType[];
}
