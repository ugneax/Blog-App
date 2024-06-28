import {create} from "zustand";

const useStore = create((set, get) => ({
    message: "",
    setNewMessage: (newMessage) => set({message: newMessage}),
    logged: false,
    IsLogged: (logged) => set({logged: logged}),
    favorites: 0,
    setFavorites: (favorites) => set({favorites: favorites})
}))

export default useStore