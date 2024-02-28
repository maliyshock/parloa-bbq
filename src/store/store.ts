import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { customersApi } from "~services/customers";
import { setupListeners } from "@reduxjs/toolkit/query";
import { customersSlice } from "~features/customers/customersSlice";

export const store = configureStore({
  reducer: {
    [customersApi.reducerPath]: customersApi.reducer,
    customers: customersSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(customersApi.middleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
