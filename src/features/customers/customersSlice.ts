import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Customer } from "~/types";

interface DialogPayload {
  show: boolean;
  customer?: Customer;
}
interface InitState {
  data: Customer[];
  showDialog: boolean;
  selected: string[];
  edit?: Customer;
  filterByIndustries: string[];
}

const initialState: InitState = {
  data: [],
  showDialog: false,
  selected: [],
  edit: undefined,
  filterByIndustries: [],
};

export const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    initCustomers: (state, action: PayloadAction<Customer[]>) => {
      state.data = action.payload;
    },
    addNew: (state, action: PayloadAction<Customer>) => {
      state.data = [action.payload, ...state.data];
    },
    remove: (state, action: PayloadAction<string[]>) => {
      state.data = state.data.filter(
        (customer) => !action.payload.includes(customer.id),
      );
      state.selected = state.selected.filter(
        (id) => !action.payload.includes(id),
      );
    },
    dialog: (state, action: PayloadAction<DialogPayload>) => {
      state.showDialog = action.payload.show;
      state.edit = action.payload.customer;
    },
    select: (state, action: PayloadAction<string>) => {
      state.selected = [...state.selected, action.payload];
    },
    unSelect: (state, action: PayloadAction<string>) => {
      state.selected = state.selected.filter((id) => id !== action.payload);
    },
    update: (state, action: PayloadAction<Customer>) => {
      state.data = state.data.map((customer) =>
        customer.id === action.payload.id ? action.payload : customer,
      );
    },
    // not sure if it should be here or in separate slice
    filterByIndustries: (state, action: PayloadAction<string[]>) => {
      state.filterByIndustries = action.payload;
    },
  },
});

export const {
  initCustomers,
  remove,
  dialog,
  select,
  unSelect,
  update,
  addNew,
  filterByIndustries,
} = customersSlice.actions;
