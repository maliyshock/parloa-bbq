import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Customer } from "~/types";

export const customersApi = createApi({
  reducerPath: "customersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://parloafrontendchallenge.z6.web.core.windows.net/",
  }),
  endpoints: (builder) => ({
    getCustomers: builder.query<[Customer], void>({
      query: () => "customers.json",
    }),
  }),
});

export const { useGetCustomersQuery } = customersApi;
