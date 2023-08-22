import { createSlice } from "@reduxjs/toolkit";

const initialStateFromLocalStorage = {
    items: JSON.parse(localStorage.getItem("basket")) || [],
    total: parseInt(localStorage.getItem("total")) || 0,
};
const basketSlice = createSlice({
    name: "basket",
    initialState: initialStateFromLocalStorage,
    reducers: {
        addItem: (state, action) => {
            const newItem = { ...action.payload, quantity: 1 };
            state.items = [...state.items, newItem];
            state.total += action.payload.price;
            updateLocalStorage(state);
        },

        removeItem: (state, action) => {
            const itemIndex = state.items.findIndex((item) => item.id === action.payload.id);
            if (itemIndex !== -1) {
                const removedItem = state.items[itemIndex];
                state.total -= removedItem.price * removedItem.quantity;
                state.items = state.items.filter((item) => item.id !== action.payload.id);
                updateLocalStorage(state);
            }
        },
        increaseQuantity: (state, action) => {
            const itemIndex = state.items.findIndex((item) => item.id === action.payload.id);
            if (itemIndex !== -1) {
                state.items[itemIndex].quantity += 1;
                state.total += state.items[itemIndex].price;
                updateLocalStorage(state);
            }
        },
        decreaseQuantity: (state, action) => {
            const itemIndex = state.items.findIndex((item) => item.id === action.payload.id);
            if (itemIndex !== -1) {
                if (state.items[itemIndex].quantity > 1) {
                    state.items[itemIndex].quantity -= 1;
                    state.total -= state.items[itemIndex].price;
                    updateLocalStorage(state);
                } else {
                    const removedItem = state.items[itemIndex];
                    state.total -= removedItem.price * removedItem.quantity;
                    state.items.splice(itemIndex, 1);
                    updateLocalStorage(state);
                }
            }
        },
    },
});

export const { addItem, removeItem, increaseQuantity, decreaseQuantity } = basketSlice.actions;

export default basketSlice.reducer;

const updateLocalStorage = (state) => {
    localStorage.setItem("basket", JSON.stringify(state.items));
    localStorage.setItem("total", state.total);
};
