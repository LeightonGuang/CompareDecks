import { AttributeValueType } from "./AttributeValueType";

export interface CardType {
  id?: number;
  deck_uuid: string;
  imgUrl: string;
  brand: string;
  name: string;
  year: number;
  price: string;
  description: string;
  attribute_values: AttributeValueType[];
  created_at?: string;
  edited_at?: string;
}
