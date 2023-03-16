
import { async } from "@firebase/util";
import { collection, addDoc, doc } from "firebase/firestore";
import { getDocs, updateDoc,  deleteDoc} from "firebase/firestore";
import { db } from "../Config";

async function Add_Data(id, email_id, Data_Collection, Data_Obj) {
    try {
        const docRef = await addDoc(collection(db, id, email_id, Data_Collection), Data_Obj
        );
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

async function Update_Data_Add(id, email_id, unique_id, item_quantity) {
    const Cart_Field = doc(db, id, email_id, "Cart", unique_id);
    await updateDoc(Cart_Field, {
        Quantity: item_quantity + 1,
    });

}

async function Update_Data_Subtract(id, email_id, unique_id, item_quantity) {
    const Cart_Field = doc(db, id, email_id, "Cart", unique_id);
    await updateDoc(Cart_Field, {
        Quantity: item_quantity - 1,
    });
}

async function Remove_CartItem(id, email_id, unique_id) {
await deleteDoc(doc(db, id, email_id, "Cart", unique_id));
}

export { Add_Data, Update_Data_Add, Update_Data_Subtract ,  Remove_CartItem}