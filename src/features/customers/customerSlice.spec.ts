import { Store, configureStore } from "@reduxjs/toolkit";
import {
  addNew,
  customersSlice,
  dialog,
  filterByIndustries,
  initCustomers,
  remove,
  select,
  unSelect,
  update,
} from "./customersSlice";
import { generateID, generateRandomString, getRandomInt } from "~/utils";
import { Customer } from "~/types";

function randBool() {
  return Math.random() < 0.5;
}

function generateProject() {
  return {
    id: generateID(),
    name: generateRandomString(getRandomInt(20)),
    contact: `generateRandomString(getRandomInt(20)@mail.com`,
    start_date: new Date().toISOString(),
    end_date: new Date().toISOString(),
  };
}

function generateCustomer() {
  return {
    id: generateID(),
    isActive: randBool(),
    company: generateRandomString(15),
    industry: generateRandomString(15),
    about: `${generateRandomString(15)} ${generateRandomString(
      15,
    )} ${generateRandomString(15)}`,
    projects: new Array(getRandomInt(5)).fill(0).map(() => generateProject()),
  };
}

const initialCustomers: Customer[] = new Array(5).fill(0).map(generateCustomer);

describe("customers reducer", () => {
  let store: Store;

  beforeEach(() => {
    store = configureStore({ reducer: { customers: customersSlice.reducer } });
    store.dispatch(initCustomers(initialCustomers));
  });

  test("should handle initial state", () => {
    expect(store.getState().customers.data).toEqual(initialCustomers);
  });

  test("should add new customer", () => {
    const newCustomer = generateCustomer();

    store.dispatch(addNew(newCustomer));
    expect(store.getState().customers.data[0]).toEqual(newCustomer);
  });

  test("should remove customer", () => {
    const customers: Customer[] = new Array(5).fill(0).map(generateCustomer);

    store.dispatch(initCustomers(customers));
    const customerIdsToRemove = [customers[1].id, customers[3].id];

    store.dispatch(remove(customerIdsToRemove));
    const state = store.getState().customers;

    const customerExists = state.data.some((customer: Customer) =>
      customerIdsToRemove.includes(customer.id),
    );

    expect(customerExists).toBeFalsy();
  });

  test("dialog", () => {
    // ...
  });

  test("should open the dialog with a customer for editing", () => {
    const index = getRandomInt(initialCustomers.length);
    const customerForEdit = initialCustomers[index];

    store.dispatch(dialog({ show: true, customer: customerForEdit }));
    const state = store.getState().customers;

    expect(state.showDialog).toBe(true);
    expect(state.edit).toEqual(customerForEdit);

    store.dispatch(dialog({ show: false, customer: undefined }));
    const newState = store.getState().customers;

    expect(newState.showDialog).toBe(false);
    expect(newState.edit).toBeUndefined();
  });

  test("select and unSelect", () => {
    const index = getRandomInt(initialCustomers.length);
    const customerId = initialCustomers[index].id;

    store.dispatch(select(customerId));
    const state = store.getState().customers;

    expect(state.selected).toContain(customerId);

    store.dispatch(unSelect(customerId));
    const newState = store.getState().customers;

    expect(newState.selected).not.toContain(customerId);
  });

  test("update", () => {
    const index = getRandomInt(initialCustomers.length);
    const updatedCustomer = {
      ...generateCustomer(),
      id: initialCustomers[index].id,
    };

    store.dispatch(update(updatedCustomer));
    const state = store.getState().customers;
    const customer = state.data.find(
      (c: Customer) => c.id === updatedCustomer.id,
    );

    expect(customer).toEqual(updatedCustomer);
  });

  test("filterByIndustries", () => {
    const industriesSet = new Set<string>();

    initialCustomers.forEach((customer) =>
      industriesSet.add(customer.industry),
    );

    const someIndustry = industriesSet.values().next().value;

    console.log("initialCustomers", initialCustomers);
    console.log("someIndustry", someIndustry);

    store.dispatch(filterByIndustries([someIndustry]));

    const state = store.getState().customers;

    expect(state.filterByIndustries).toContain(someIndustry);
  });
});
