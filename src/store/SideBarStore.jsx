import { create } from 'zustand'

 const useSidebarStore = create((set, get) => ({
  menu: false,
  sideBar: null,

  setMenu: (value) => set({ menu: value }),
  toggleMenu: () => set((state) => ({ menu: !state.menu })),
  setsideBar: (ref) => set({ sideBar: ref }),

  handleClickOutside: (event) => {
    const { sideBar } = get()
    if (sideBar && !sideBar.contains(event.target)) {
      set({ menu: false })
    }
  },
}))

export default useSidebarStore