import { DeckAttributesType } from "./DeckAttributesType";

export interface AttributeValuesType {
  id: number;
  value: string;
  attribute_id: number;
  card_id: number;
  deck_attributes: DeckAttributesType;
  created_at: string;
  edited_at: string;
}
