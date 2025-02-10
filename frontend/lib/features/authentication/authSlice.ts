import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state
export type AuthState = {
  role: "admin" | "talent" | null;
  id: number;
};

const initialState: AuthState = {
  role: null,
  id: NaN,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setRole: (state, action: PayloadAction<AuthState["role"]>) => {
      state.role = action.payload;
    },
    setId: (state, action: PayloadAction<AuthState["id"]>) => {
      state.id = action.payload;
    },
  },
});

export const { setRole, setId } = authSlice.actions;
export default authSlice.reducer;