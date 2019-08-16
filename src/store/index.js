export const state = () => ({
  isLoading: false,
  isSidebarOpen: false,
});

export const mutations = {
  startLoading (state) { state.isLoading = true; },
  finishLoading (state) { state.isLoading = false; },
  openSidebar (state) { state.isSidebarOpen = true; },
  closeSidebar (state) { state.isSidebarOpen = false; },
};
