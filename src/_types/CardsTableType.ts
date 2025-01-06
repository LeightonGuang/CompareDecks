import { AttributeValuesTableType } from "./AttributeValuesTableType";

// type for cards table

export interface CardTableType {
  id: number;
  deck_uuid: string;
  imgUrl: string;
  attribute_values: AttributeValuesTableType[];
  description?: string;
  edited_at?: string;
  created_at: string;
}
