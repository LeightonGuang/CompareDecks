import { CardTableType } from "./CardsTableType";
import { AttributeTableType } from "./AttributeTableType";

export interface FetchCardType extends CardTableType {
  attribute_values: {
    id: number;
    card_id: number;
    attribute_id: number;
    value: string;
    attributes: AttributeTableType;
  }[];
}
