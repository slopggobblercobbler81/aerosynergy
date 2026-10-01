import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('aeroSynergyDesktop', {
  isElectron: true,
  version: '1.0.0',
  platform: process.platform,
});