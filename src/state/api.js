import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  tagTypes: ['User', 'Products', 'Customers', 'Geography', 'Sales'],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => `general/user/${id}`,
      providesTags: ['User'],
    }),
    getProducts: builder.query({
      query: () => 'client/products',
      providesTags: ['Products'],
    }),
    getCustomers: builder.query({
      query: () => 'client/customers',
      providesTags: ['Customers'],
    }),
    getTransactions: builder.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: 'client/transactions',
        method: 'GET',
        params: { page, pageSize, sort, search },
      }),
      providesTags: ['Transactions'],
    }),
    getGeography: builder.query({
      query: () => 'client/geography',
      providesTags: ['Geography'],
    }),
    getSales: builder.query({
      query: () => 'sales',
      providesTags: ['Sales'],
    }),
  }),
})

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
} = api
