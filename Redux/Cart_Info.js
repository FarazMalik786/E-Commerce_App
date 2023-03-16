import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDocs, collection } from "firebase/firestore";
import { Alert } from "react-native";
import { db } from "../Config";



export const fetchUserCart = createAsyncThunk(
  'Cart_Info/fetchUserCartStatus',
  async (obj) => {
    var a = [];
    const querySnapshot = await getDocs(collection(db, obj.userId, obj.email_id, "Cart"));
    querySnapshot.forEach((doc) => {
      let data = doc.data()
      data.Unique_Id = doc.id;
      a.push(data);
    });
    return a;
  }
)
const Cart_Info_Slice = createSlice({
  name: "Cart_Info",
  initialState: [],
  reducers: {
    product_Quantity_Add(state, action) {
      console.log("k")
      console.log(action.payload.Index)
      state[action.payload.Index].Quantity = state[action.payload.Index].Quantity + 1;
    },
    product_Quantity_Subtract(state, action) {
      console.log("k")
      console.log(action.payload.Index)
      state[action.payload.Index].Quantity = state[action.payload.Index].Quantity - 1;
    },
    clear_Cart(){
      return []
    }
  },
  extraReducers: (builder) => {

    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchUserCart.fulfilled, (state, action) => {
      return action.payload
    })
    //
    builder.addCase(fetchUserCart.rejected, (state, action) => {
      Alert.alert("Something Wronge , Please Try Again Later")
    })
  },
});

export const { product_Quantity_Add, product_Quantity_Subtract } = Cart_Info_Slice.actions;
export default Cart_Info_Slice.reducer;