import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        isLoggedIn: false,
        isLoading: false
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.isLoggedIn = false;
        }
    }
});

export const { setUser, logout, setLoading } = userSlice.actions;
export default userSlice.reducer;
