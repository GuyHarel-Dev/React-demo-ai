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
      <div>{itemArray.map((item, index) => (<h1 key={index}>{item.label}</h1>))}</div>
    </div>
  );
}
