export interface AttributeValuesTableType {
  id?: number; //	Unique ID for the value row
  attribute_id?: number; // Foreign key to Attributes(id)
  card_id?: number; // Foreign key to Cards(id)
  value: string; // Attribute value stored as string
}
