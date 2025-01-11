import { DeckAttributesTableType } from "./DeckAttributesTableType";

// type for attribute_values table

export interface AttributeValuesTableType {
  id?: number;
  attribute_id?: number;
  card_id?: number;
  value: string;
  deck_attributes: DeckAttributesTableType;
  created_at?: string;
  edited_at?: string;
}
