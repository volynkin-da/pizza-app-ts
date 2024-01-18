import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { loadState } from './storage';

export const CART_PERSISTENT_STATE = 'cartData';

export interface CartItem {
    id: number;
    count: number;
}

export interface CartState {
    items: CartItem[];
}

const initialState: CartState = loadState<CartState>(CART_PERSISTENT_STATE) ?? {
    items: []
};

export const cartSlise = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clean: (state) => {
            state.items = [];
        },
        add: (state, action: PayloadAction<number>) => {
            const existed = state.items.find((i) => i.id === action.payload);
            if (!existed) {
                state.items.push({ id: action.payload, count: 1 });
                return;
            }
            state.items.map((item) => {
                if (item.id === action.payload) {
                    item.count += 1;
                }
                return item;
            });
        },

        remove: (state, action: PayloadAction<number>) => {
            const existed = state.items.find((i) => i.id === action.payload);
            if (!existed) {
                return;
            }
            if (existed) {
                if (existed.count === 1) {
                    state.items = state.items.filter(
                        (item) => item.id !== action.payload
                    );
                } else {
                    state.items.map((item) => {
                        if (item.id === action.payload) {
                            item.count -= 1;
                        }
                        return item;
                    });
                    return;
                }
            }
        },
        delete: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(
                (item) => item.id !== action.payload
            );
        }
    }
});

export default cartSlise.reducer;
export const cartActions = cartSlise.actions;
