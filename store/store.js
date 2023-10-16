import { create } from 'zustand';
const useStore = create((set) => ({
  isAdmin: false,
  authenticate: (password) => fetch("/api/isAuthenticated", {
    method: "POST",
    body: password,
  })
    .then(res => res.json())
    .then((res) => set(() => ({isAdmin: res})))
}));
export default useStore;
