import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        modal: false
    },
    reducers: {
        openModal(state) {
            state.modal = true
        },
        closeModal(state) {
            state.modal = false
        }
    }
})

export const { closeModal, openModal } = modalSlice.actions
export const modalReducer = modalSlice.reducer