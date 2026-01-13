import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

let isRegistered = false;

export const registerAgGridModules = () => {
  if (isRegistered) return;

  ModuleRegistry.registerModules([AllCommunityModule]);
  isRegistered = true;
};
