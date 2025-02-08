import { createSlice } from "@reduxjs/toolkit"

const initialState={
    user:null
}

const userId=createSlice({
    name:"userId",
    initialState,
    reducers:{
        addUser(state,action){
        state.user=action.payload;
        }
    }
})
export const {addUser} =userId.actions
export default userId.reducer