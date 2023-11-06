export interface AdminBackendSettingsData {
  quasar: boolean;
}

export const constructEmptyAdminBackendSettingsData =
  (): AdminBackendSettingsData => {
    return {
      quasar: false,
    };
  };
