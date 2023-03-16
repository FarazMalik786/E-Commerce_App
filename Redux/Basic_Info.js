import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import {  getDocs , collection } from "firebase/firestore";
import { db } from "../Config";



export const fetchUserById = createAsyncThunk(
    'basic-info/fetchByIdStatus',
    async ( obj ) => {
        var a;
        const querySnapshot = await getDocs(collection(db, obj.userId, obj.email_id , "Basic_Info"));
        querySnapshot.forEach((doc) => {
         a = doc.data() 
       });
       return a;
    }
  )

const Basic_Info_Slice = createSlice({
    name: 'basic-info',
    initialState: [],
    reducers:{
        Clear_data:  (state , action) =>{
       return []
        }
    },
    extraReducers: (builder) => {

        builder.addCase(fetchUserById.pending, (state, action) => {
            // Add user to the state array
            state.push("pending")
          })
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchUserById.fulfilled, (state, action) => {
          // Add user to the state array
         return action.payload
        })
        //
        builder.addCase(fetchUserById.rejected, (state, action) => {
            // Add user to the state array
            state.push("rejected")
          })
      },
})
export const {Clear_data} = Basic_Info_Slice.actions;

export default Basic_Info_Slice.reducer;