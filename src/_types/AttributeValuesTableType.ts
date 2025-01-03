import { DeckAttributesTableType } from "./DeckAttributesTableType";

export interface AttributeValuesTableType {
  id: number;
  value: string;
  attribute_id: number;
  card_id: number;
  deck_attributes: DeckAttributesTableType;
  created_at: string;
  edited_at: string;
}
