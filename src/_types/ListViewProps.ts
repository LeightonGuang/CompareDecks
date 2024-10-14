import { AttributeListType } from "./AttributeListType";

export interface ListViewProps {
  attributeList: AttributeListType[];
  handlePinButton: (objIndex: number) => void;
  handleUnpinButton: (objIndex: number) => void;
  handleEditCardButton: (cardIndex: number, isPinned: boolean) => void;
  handleAddCardButton: () => void;
  handleDeleteCardButton: (cardIndex: number, isPinned: boolean) => void;
  isAuth: boolean;
}
