import {configureStore} from '@reduxjs/toolkit'
import userSlice from '../slice/userId';
import commentSlice from '../slice/commentLength'
import userDetailsSlice from '../slice/userDetails'
export const store=configureStore({
    reducer:{
       userId:userSlice,
       comment:commentSlice,
       userDetails:userDetailsSlice
    }
})