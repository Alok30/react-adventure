import create from 'zustand';

export const userAppStore=create(()=>({
    colorPreference:'',
    isUserLogined:false,
    userName:'',
}))