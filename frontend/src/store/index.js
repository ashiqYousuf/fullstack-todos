import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { todoApi , useFetchItemsQuery , useDeleteItemMutation , useAddItemMutation , useEditItemMutation } from "./apis/todoApi";


const store = configureStore({
    reducer: {
        [todoApi.reducerPath]: todoApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(todoApi.middleware)
    }
});

setupListeners(store.dispatch);

export { store };
export { useFetchItemsQuery, useDeleteItemMutation , useAddItemMutation , useEditItemMutation };
