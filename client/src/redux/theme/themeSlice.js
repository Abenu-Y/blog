import { createSlice} from '@reduxjs/toolkit'
import { theme } from 'flowbite-react'

const initialState ={
    theme:'light'
}


const themeSlice = createSlice({
    name:'theme',
    initialState,
    reducers:{
        toggletheme:(state)=>{
            state.theme = state.theme === 'light' ? 'dark':'light'
        }
    }
})


export const {toggletheme} = themeSlice.actions

export default themeSlice.reducer