import create from 'zustand';

export const userAppStore=create(()=>({
    colorPreference:'',
    username:'',
}))