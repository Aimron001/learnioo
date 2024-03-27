import { apiSlice } from "./apiSlice";

const BASE_URL = "/api/books"

const bookApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        retrieve: builder.query({
            query: () => ({
                url: BASE_URL,
                method: 'GET',
            }),
        }),
        upload: builder.mutation({
            query: (data) => ({
                url: BASE_URL,
                method: 'POST',
                body: data,
                // headers: { "Content-Type": "multipart/form-data" },
            }),
        }),
        prompt: builder.mutation({
            query: (data) => ({
                url: `${BASE_URL}/ask-question`,
                method: 'POST',
                body: data,
                // headers: { "Content-Type": "multipart/form-data" },
            }),
        }),

    })
})

export const { useRetrieveQuery, useUploadMutation, usePromptMutation } = bookApiSlice