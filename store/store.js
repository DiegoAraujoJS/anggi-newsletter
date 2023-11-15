import { create } from 'zustand';
const useStore = create((set) => ({
  theme: "anggi",
  setTheme: (theme) => {
    document.querySelector('html')?.setAttribute('data-theme', theme)
    return set((state) => ({theme: theme}))
  }
}));
export default useStore;
