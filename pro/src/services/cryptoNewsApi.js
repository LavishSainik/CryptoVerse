import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsHeaders = {
  'content-type': 'application/json',
  'X-RapidAPI-Key': '1488ab25d9mshae650167b1eae1dp108cebjsn9ac3e0d91e08',
  'X-RapidAPI-Host': 'google-api31.p.rapidapi.com'
};

const baseUrl = 'https://google-api31.p.rapidapi.com';

// Adjusted createRequest function to match Axios code structure
const createRequest = ({ url, body }) => {
    return {
      url,
      method: 'POST',
      headers: cryptoNewsHeaders,
      body // Pass the body directly
    };
  };

  

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) =>
        createRequest({
          url: '/',
          body: {
            text: newsCategory,
            region: 'wt-wt',
            max_results: count
          }
        })
    })
  })
});

export const {
  useGetCryptoNewsQuery
} = cryptoNewsApi;