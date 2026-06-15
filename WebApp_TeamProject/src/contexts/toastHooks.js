import { useContext } from 'react';
import { ConfirmCtx, ToastCtx } from './toastContexts';

export function useToast() {
    return useContext(ToastCtx);
}

export function useConfirm() {
    return useContext(ConfirmCtx);
}
