import { createContext, useReducer, useEffect } from 'react';

const CartContext = createContext({
    items: [],
    totalAmount: 0,
    addItem: (item) => { },
    removeItem: (id) => { },
    deleteItem: (id) => { },
    clearCart: () => { }
});

const storedCart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
const totalAmount2 = localStorage.getItem('totalAmount') || 0;

const defaultCartState = {
    items: storedCart,
    totalAmount: +totalAmount2,
};

const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        const updatedTotalAmount =
            state.totalAmount + action.item.price * action.item.amount;

        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );
        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItems;

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount,
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item);
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        };
    }

    if (action.type === 'REMOVE') {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );
        const existingItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingItem.price;
        let updatedItems;
        if (existingItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id);
        } else {
            const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }

    if (action.type === 'DELETE') {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );
        const existingItem = state.items[existingCartItemIndex];

        const updatedTotalAmount = state.totalAmount - (existingItem.amount * existingItem.price);
        let updatedItems = state.items.filter(item => item.id !== action.id);

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }


    if (action.type === 'CLEAR') {
        localStorage.removeItem('cart');
        localStorage.removeItem('totalAmount');
        return {
            items: [],
            totalAmount: 0,
        }
    }

    return defaultCartState;
};

export const CartContextProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(
        cartReducer,
        defaultCartState
    );

    const addItemToCartHandler = (item) => {
        dispatchCartAction({ type: 'ADD', item: item });
    };

    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({ type: 'REMOVE', id: id });
    };

    const clearCartHandler = () => {
        dispatchCartAction({ type: 'CLEAR' });
    };

    const deleteItemFromCartHandler = (id) => {
        dispatchCartAction({ type: 'DELETE', id: id });
    };

    const contextValue = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        deleteItem: deleteItemFromCartHandler,
        clearCart: clearCartHandler
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartState.items))
    }, [cartState.items])

    useEffect(() => {
        localStorage.setItem('totalAmount', JSON.stringify(cartState.totalAmount))
    }, [cartState.totalAmount]);

    return (
        <CartContext.Provider value={contextValue}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartContext;
