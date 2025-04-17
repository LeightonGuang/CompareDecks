import { useEffect } from "react";
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from "../ui/table";

const CompareTable = ({
  attributes,
  cards,
}: {
  attributes: string[];
  cards: any[];
}) => {
  return (
    <div>
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead>Features</TableHead>
            {cards.map((card, i) => (
              <TableHead key={card.name + i}>
                {card.name || (
                  <span className="text-muted-foreground">
                    {"Card " + String(i + 1)}
                  </span>
                )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {/* Display image if at least one card has an image */}
          {cards.some((card: any) => card.imgUrl !== "") && (
            <TableRow>
              <TableCell>Image</TableCell>
              {cards.map((card, i) => (
                <TableCell className="" key={card.name + i}>
                  <div className="flex w-full justify-center">
                    <img
                      alt={card.name}
                      className="w-40 rounded-xs object-contain"
                      src={
                        card.imgUrl ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjt-ewgNomB7qqJH9Hn5VxQsnOgH_rRb2u9Q&s"
                      }
                    />
                  </div>
                </TableCell>
              ))}
            </TableRow>
          )}
          {attributes.length !== 0 &&
            attributes.map((attribute, attributeIndex) => (
              <TableRow key={attributeIndex}>
                {/* first column to show the attribute name */}
                <TableCell>{attribute}</TableCell>
                {/* remaining columns to show the card values */}
                {cards.map((card) => {
                  return Object.entries(card).map(
                    ([key, value]: [string, any]) => {
                      const isLink = (str: string) => {
                        const urlRegex =
                          /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
                        return urlRegex.test(str);
                      };

                      if (key === attribute) {
                        return (
                          <TableCell key={key}>
                            {isLink(value) ? (
                              <a
                                className="text-blue-500 hover:underline"
                                href={value}
                                target="_blank"
                              >
                                {value}
                              </a>
                            ) : value ? (
                              value
                            ) : (
                              "-"
                            )}
                          </TableCell>
                        );
                      }
                      return null;
                    },
                  );
                })}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompareTable;
