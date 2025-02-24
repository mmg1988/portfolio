import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState: string[] = [];

export const commandsSlice = createSlice({
  name: 'commands',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<string>) => {
      state.push(action.payload);
    }
  }
});

export const {
  add
} = commandsSlice.actions;

export default commandsSlice.reducer;