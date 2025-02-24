import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Queue {
  id: string;
  counter: number;
  messages: string[];
}

const initialState: { [id: string]: Queue } = { };

export const queuesSlice = createSlice({
  name: 'queues',
  initialState,
  reducers: {
    addQueue: (state, action: PayloadAction<string>) => {
      state[action.payload] = {
        id: action.payload,
        counter: 0,
        messages: []
      }
    },
    enqueue: (state, action: PayloadAction<{ queue: string, message: string}>) => {
      state[action.payload.queue].counter++;
      state[action.payload.queue].messages.push(action.payload.message);
    },
    dequeue: (state, action: PayloadAction<{ queue: string, message: string }>) => {
      const index = state[action.payload.queue]?.messages?.indexOf(action.payload.message);
      state[action.payload.queue]?.messages?.splice(index, 1);
    }
  }
});

export const {
  addQueue,
  enqueue,
  dequeue
} = queuesSlice.actions;

export default queuesSlice.reducer;