import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { WordType } from "./types";

 
export const wordsApi = createApi({
  reducerPath: "words",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/",
  }),
  endpoints: (builder) => ({
    getWords: builder.mutation<
    WordType[],
    any
    >({
      query: () => ({
        url: 'words',
        method: "get",
      }),
    }),
    getScore: builder.mutation<
    number,
    number
    >({
      query: (score) => ({
        url: 'rank',
        method: "post",
        body:{score}
      }),
    }),
  }),
})

export const { useGetWordsMutation ,useGetScoreMutation } = wordsApi;
