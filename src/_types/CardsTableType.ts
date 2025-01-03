import { AttributeValuesTableType } from "./AttributeValuesTableType";

export interface CardTableType {
  id: number;
  deck_uuid: string;
  imgUrl: string;
  description: string;
  attribute_values: AttributeValuesTableType[];
  created_at: string;
  edited_at?: string;
}
