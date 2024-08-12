import { createSlice } from '@reduxjs/toolkit'




const initialState= {
  currentuser:null,
  error:null,
  loading:false
}
 const counterSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true,
      state.error = null
    },

    signInSuccess:(state,action)=>{
        state.currentuser= action.payload
        state.loading =false,
        state.error = null
    },
    signInFailure:(state,action)=>{
        state.loading = false,
        state.error = action.payload
    },
    updateStart: (state) => {
      state.loading = true,
      state.error = null
    },

   updateSuccess:(state,action)=>{
        state.currentuser= action.payload
        state.loading =false,
        state.error = null
    },
   updateFailure:(state,action)=>{
        state.loading = false,
        state.error = action.payload
    }
    ,
    deleteUserStart: (state) => {
      state.loading = true,
      state.error = null
    },

   deleteUserSuccess:(state,action)=>{
        state.currentuser = null;
        state.loading = false;
        state.error = null;
    },
   deleteUserFailure:(state,action)=>{
        state.loading = false,
        state.error = action.payload
    },
    signoutSuccess: (state) => {
      state.currentuser = null;
      state.error = null;
      state.loading = false;
    },
  
  },
})

// Action creators are generated for each case reducer function
export const {signInFailure, signInStart, signInSuccess,updateFailure,updateStart,updateSuccess,deleteUserFailure,deleteUserStart,deleteUserSuccess,signoutSuccess} = counterSlice.actions

export default counterSlice.reducer