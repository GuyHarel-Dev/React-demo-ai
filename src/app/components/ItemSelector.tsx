"use client";

import "@/src/app/styles/controlArea.css";

import { ItemSelectorEntity } from "@/src/app/types/ItemSelectorEntity";

interface SelectorProps {
  title: string;
  itemArray: ItemSelectorEntity[];
  onItemSelected: (item: ItemSelectorEntity) => void;
}

export function ItemSelector({
  title,
  itemArray,
  onItemSelected,
}: SelectorProps) {
  const handleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedItem = event.target.value;
    const matchedDoc = itemArray?.find((doc) => doc.label === selectedItem);

    if (matchedDoc) {
      onItemSelected(matchedDoc);
    }
  };

  return (
    <div>
      <div>{title}</div>
      <select className="selectArea" onChange={handleChange} defaultValue="">
        <option value="" disabled>
          (select an item)
        </option>
        {itemArray?.map((doc, index) => (
          <option key={`${doc.id}-${index}`} value={doc.label}>
            {doc.label}
          </option>
        ))}
      </select>
    </div>
  );
}
