import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

type Item = {
  name: string;
  quantity: number;
  category: string;
};

export async function getItems(userId: string) {
  const itemsCollectionRef = collection(db, "users", userId, "items");
  const querySnapshot = await getDocs(itemsCollectionRef);

  const items: {
    id: string;
    name: string;
    quantity: number;
    category: string;
  }[] = [];

  querySnapshot.forEach((doc) => {
    items.push({
      id: doc.id,
      ...(doc.data() as {
        name: string;
        quantity: number;
        category: string;
      }),
    });
  });

  return items;
}

export async function addItem(userId: string, item: Item) {
  const itemsCollectionRef = collection(db, "users", userId, "items");
  const docRef = await addDoc(itemsCollectionRef, item);
  return docRef.id;
}