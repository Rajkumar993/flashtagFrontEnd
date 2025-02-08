import { createSlice } from "@reduxjs/toolkit"
import { use } from "react"


const initialState={
    data:[]
}

const userDetails=createSlice({
    name:"userDetails",
    initialState,
    reducers:{
        addUserProfile(state,action){
         state.data=action.payload
        }
    }

})

export const {addUserProfile} = userDetails.actions;
export default userDetails.reducer