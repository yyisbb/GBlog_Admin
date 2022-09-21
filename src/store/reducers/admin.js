/*
// types
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { reqLogin } from '../../api/api';
import tokenUtil from '../../utils/tokenUtil';
// initial state
const initialState = {
    loginResp: {
        token: '',
        msg: '',
        code: 0
    }
};

export const login = createAsyncThunk('admin/login', async (user, thunkAPI) => {
    return await reqLogin(user.username, user.password);
});

// ==============================|| SLICE - MENU ||============================== //

const admin = createSlice({
    name: 'admin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            const { payload } = action;
            if (payload.Code === 10000) {
                state.loginResp.token = payload.Data;
                // 设置到本地里
                tokenUtil.saveToken(payload.Data);
            } else {
                state.loginResp.msg = payload.Msg;
                state.loginResp.code = payload.Code;
            }
        });
    }
});

export default admin.reducer;
*/
