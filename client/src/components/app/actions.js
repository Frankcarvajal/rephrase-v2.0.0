export const TOGGLE_BTN = 'TOGGLE_BTN';
export const toggleBtn = () => ({
    type: TOGGLE_BTN
});
export const  EDIT_BTN = 'EDIT_BTN';
export const editBtn = (isEditing) => ({
    type: EDIT_BTN,
    isEditing
})
export const TOGGLE_DICTAPHONE_IS_MOUNTED = 'TOGGLE_DICTAPHONE_IS_MOUNTED';
export const toggleDictaphoneIsMounted = (dictaphoneIsMounted) => ({
    type: TOGGLE_DICTAPHONE_IS_MOUNTED,
    dictaphoneIsMounted
})