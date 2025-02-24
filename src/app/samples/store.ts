import { configureStore } from '@reduxjs/toolkit';
import queuesReducer from './queue-simulator/queues-slice';
import commandsReducer from './queue-simulator/commands-slice';

export const store = configureStore({
  reducer: {
    queues: queuesReducer,
    commands: commandsReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;