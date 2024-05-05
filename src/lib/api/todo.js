import { baseAPI } from './api'

const todoEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query({
      providesTags: ['GetTodos'],
      query: () => ({
        url: `todos`,
        method: 'GET',
      }),
    }),
    addTodo: builder.mutation({
      invalidatesTags: ['GetTodos'],
      query: (DTO) => ({
        url: 'todos/add',
        method: 'POST',
        body: DTO,
      }),
    }),
    editTodo: builder.mutation({
      invalidatesTags: ['GetTodos'],
      query: ({ id, completed }) => ({
        url: `todos/${id}`,
        method: 'PUT',
        body: { completed },
      }),
    }),
    deleteTodo: builder.mutation({
      invalidatesTags: ['GetTodos'],
      query: (DTO) => ({
        url: `todos/${DTO?.id}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useEditTodoMutation,
  useDeleteTodoMutation,
} = todoEndpoints
