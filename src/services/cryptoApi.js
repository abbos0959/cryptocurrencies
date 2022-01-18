import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
  "x-rapidapi-host": "coinranking1.p.rapidapi.com",
  "x-rapidapi-key": "79ee844cfdmshfc2d432bf4de50dp18d924jsnc8520a931a04",
};
const baseUrl = 'https://coinranking1.p.rapidapi.com';

const creatRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => creatRequest(`/coins?limit=${count}`),
    }),
    getCryptosDetails:builder.query({
      query:(coinId)=>creatRequest(`/coin/${coinId}`)
    }),
    getCryptoHistory:builder.query({
      query:({coinId,timePeriod})=>creatRequest(`/coin/${coinId}/history/${timePeriod}`)
    }),
    getExchanges: builder.query({
      query: () => creatRequest(`/exchanges`),
    }),
  }),
});
 export const { useGetCryptosQuery, useGetCryptosDetailsQuery ,useGetCryptoHistoryQuery,useGetExchangesQuery}=cryptoApi
// var options = {
//     method: 'GET',
//     url: 'https://coinranking1.p.rapidapi.com/coins',
//     params: {
//       referenceCurrencyUuid: 'yhjMzLPhuIDl',
//       timePeriod: '24h',
//       tiers: '1',
//       orderBy: 'marketCap',
//       orderDirection: 'desc',
//       limit: '50',
//       offset: '0'
//     },
//     headers: {
//       'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
//       'x-rapidapi-key': '79ee844cfdmshfc2d432bf4de50dp18d924jsnc8520a931a04'
//     }
//   };
