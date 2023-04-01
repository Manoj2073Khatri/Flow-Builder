
import { configureStore } from '@reduxjs/toolkit'
import sidebarToggleReducer from './reducer/sidebarToggleSlice';
import workflowBuilderSlice from './reducer/workflowBuilderSlice';

export const store = configureStore({
  reducer: {
        sidebarToggle:sidebarToggleReducer,
        workflowBuilder:workflowBuilderSlice,
  }

           })
 
   

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch