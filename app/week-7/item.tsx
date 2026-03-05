type ItemProps = {
  name: string;
  quantity: number;
  category: string;
  onSelect?: () => void;
};

export default function Item({ name, quantity, category, onSelect }: ItemProps) {
  return (
    <li
      onClick={onSelect}
      className="m-2 p-4 bg-slate-900 border border-slate-700 rounded-lg max-w-sm cursor-pointer hover:bg-slate-800"
    >
      <p className="text-lg font-bold text-white">{name}</p>
      <p className="text-sm text-slate-300">
        Buy {quantity} in {category}
      </p>
    </li>
  );
}