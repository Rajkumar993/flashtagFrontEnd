import { createSlice } from "@reduxjs/toolkit";

const initialState={
    clength:0, 
}

const commentLength=createSlice({
    name:'commentLength',
   initialState,
   reducers:{
    comment(state,action){
     state.clength=action.payload
    }
   }
})

export const {comment}=commentLength.actions;
export default commentLength.reducer;