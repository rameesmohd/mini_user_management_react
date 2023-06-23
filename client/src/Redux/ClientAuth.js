import { createSlice } from "@reduxjs/toolkit";

export const ClientAuth = createSlice({
    name: "Client",
    initialState: {
        Token: null,
        User:{},
        Name:''
    },
    reducers: {
        ClientLogin(state, action) {
            state.Token = action.payload.token;
            state.Name = action.payload.name
        },
        ClientLogout(state, action) {
            state.Token = "";
            state.User = {}
            state.Name=''
        },
        AddUser(state,action){
            console.log(action)
            state.User=action.payload.user
        }

    }
})
export const { ClientLogin, ClientLogout,AddUser } = ClientAuth.actions;
export default ClientAuth.reducer;
