"use client";

import "@/src/app/styles/controlArea.css";
import styles from "./ItemSelector.module.css";

import { ItemSelectorEntity } from "@/src/app/types/ItemSelectorEntity";

interface SelectorProps {
  itemArray: ItemSelectorEntity[];
  onLabelSelected: (label: string) => void;
}

export default function Selector({
  itemArray,
  onLabelSelected,
}: SelectorProps) {
  const handleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLabel = event.target.value;
    const matchedDoc = itemArray?.find((doc) => doc.label === selectedLabel);

    if (matchedDoc) {
      onLabelSelected(selectedLabel);
    }
  };

  return (
    <div>
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
