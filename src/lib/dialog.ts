import {
    type App,
    type Component,
    type ComponentPublicInstance,
    shallowRef,
} from 'vue';
import type {
    ComponentProps,
    ComponentExposed,
} from 'vue-component-type-helpers';

export interface DialogInstance {
    comp?: ComponentPublicInstance & { returnValue?: () => unknown};
    dialog: Component;
    wrapper: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- idk how else to get it to work atm
    props: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- generic type is erased once stored at rest; see openDialog()
    resolve: (data: any) => void;
}

export const dialogRef = shallowRef<DialogInstance>();

/**
 * Closes the currently opened dialog, resolving the promise with the return value of the dialog, or with the given
 * data if any.
 */
export function closeDialog(data?: unknown) {
    if (data === undefined) {
        data = dialogRef.value?.comp?.returnValue?.();
    }
    dialogRef.value?.resolve(data);
    dialogRef.value = undefined;
}

type DialogReturnValue<C>
    = ComponentExposed<C> extends { returnValue: () => infer Y }
        ? Y
        : unknown;

/**
 * Opens a dialog.
 * @param dialog The dialog you want to open.
 * @param props The props to be passed to the dialog.
 * @param wrapper The dialog wrapper you want the dialog to open into.
 * @return A promise that resolves when the dialog is closed
 */
export function openDialog<C extends Component>(
    dialog: C,
    props?: ComponentProps<C>,
    wrapper: string = 'default'
): Promise<DialogReturnValue<C>> {
    return new Promise(resolve => {
        dialogRef.value = {
            dialog,
            props,
            wrapper,
            resolve
        }
    });
}

export const PromiseDialog = {
    install: (app: App, _options?: unknown) => {
        app.config.globalProperties.$close = (_comp: unknown, alternateValue: unknown) => {
            closeDialog(alternateValue);
        }
    }
}