import Item from "./item";

interface ItemData {
  name: string;
  quantity: number;
  category: string;
}

const item1: ItemData = {
  name: "milk, 4 L 🥛",
  quantity: 1,
  category: "dairy",
};

const item2: ItemData = {
  name: "bread 🍞",
  quantity: 2,
  category: "bakery",
};

const item3: ItemData = {
  name: "eggs, dozen 🥚",
  quantity: 2,
  category: "dairy",
};

const item4: ItemData = {
  name: "bananas 🍌",
  quantity: 6,
  category: "produce",
};

const item5: ItemData = {
  name: "broccoli 🥦",
  quantity: 3,
  category: "produce",
};

const item6: ItemData = {
  name: "chicken breasts, 1 kg 🍗",
  quantity: 1,
  category: "meat",
};

const item7: ItemData = {
  name: "pasta sauce 🍝",
  quantity: 3,
  category: "canned goods",
};

const item8: ItemData = {
  name: "spaghetti, 454 g 🍝",
  quantity: 2,
  category: "dry goods",
};

const item9: ItemData = {
  name: "toilet paper, 12 pack 🧻",
  quantity: 1,
  category: "household",
};

const item10: ItemData = {
  name: "paper towels, 6 pack",
  quantity: 1,
  category: "household",
};

const item11: ItemData = {
  name: "dish soap 🍽️",
  quantity: 1,
  category: "household",
};

const item12: ItemData = {
  name: "hand soap 🧼",
  quantity: 4,
  category: "household",
};

export default function ItemList() {
  return (
    <ul>
      <Item {...item1} />
      <Item {...item2} />
      <Item {...item3} />
      <Item {...item4} />
      <Item {...item5} />
      <Item {...item6} />
      <Item {...item7} />
      <Item {...item8} />
      <Item {...item9} />
      <Item {...item10} />
      <Item {...item11} />
      <Item {...item12} />
    </ul>
  );
}
