import { AttributeValuesType } from "./AttributeValuesType";

export interface CardType {
  id: number;
  deck_uuid: string;
  imgUrl: string;
  description: string;
  attribute_values: AttributeValuesType[];
  created_at: string;
  edited_at?: string;
}
