import { createSlice } from "@reduxjs/toolkit";

const BACKEND_URL = "http://localhost:8080/auth";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cartItems = action.payload;
    },
  },
});

export const { setCart } = cartSlice.actions;

// ----------------- Slice Functions -----------------
export const fetchCart = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const res = await fetch(`${BACKEND_URL}/cart`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.success) dispatch(setCart(data.data));
  } catch (err) {
    console.log("Fetch cart error:", err);
  }
};

export const addToCart = (productId) => async (dispatch) => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const res = await fetch(`${BACKEND_URL}/cart/add/${productId}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.success) dispatch(fetchCart());
  } catch (err) {
    console.log("Add to cart error:", err);
  }
};

export const increaseQuantity = (productId) => async (dispatch) => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const res = await fetch(`${BACKEND_URL}/cart/increase/${productId}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.success) dispatch(fetchCart());
  } catch (err) {
    console.log("Increase quantity error:", err);
  }
};

export const decreaseQuantity = (productId) => async (dispatch) => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const res = await fetch(`${BACKEND_URL}/cart/decrease/${productId}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.success) dispatch(fetchCart());
  } catch (err) {
    console.log("Decrease quantity error:", err);
  }
};

export const removeFromCart = (productId) => async (dispatch) => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const res = await fetch(`${BACKEND_URL}/cart/remove/${productId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.success) dispatch(fetchCart());
  } catch (err) {
    console.log("Remove from cart error:", err);
  }
};

export const clearCart = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const res = await fetch(`${BACKEND_URL}/cart/clear`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.success) dispatch(setCart([]));
  } catch (err) {
    console.log("Clear cart error:", err);
  }
};

export default cartSlice.reducer;
