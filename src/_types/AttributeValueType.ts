import { DeckAttributesType } from "./DeckAttributesType";

export interface AttributeValueType {
  id: number;
  attribute_id: number;
  card_id: number;
  deck_attributes: DeckAttributesType[];
  created_at: string;
  edited_at: string;
}
