import React, { Component, createContext } from 'react';
import * as service from 'v2/services/AssetOption/AssetOption';
import { AssetOption, ExtendedAssetOption } from 'v2/services/AssetOption';

interface ProviderState {
  assetOptions: ExtendedAssetOption[];
  createAssetOptions(assetOptionsData: AssetOption): void;
  deleteAssetOptions(uuid: string): void;
  updateAssetOptions(uuid: string, assetOptionsData: AssetOption): void;
}

export const AssetOptionsContext = createContext({} as ProviderState);

export class AssetOptionsProvider extends Component {
  public readonly state: ProviderState = {
    assetOptions: service.readAssetOptions() || [],
    createAssetOptions: (assetOptionsData: AssetOption) => {
      service.createAssetOption(assetOptionsData);
      this.getAssetOptions();
    },
    deleteAssetOptions: (uuid: string) => {
      service.deleteAssetOption(uuid);
      this.getAssetOptions();
    },
    updateAssetOptions: (uuid: string, assetOptionsData: AssetOption) => {
      service.updateAssetOption(uuid, assetOptionsData);
      this.getAssetOptions();
    }
  };

  public render() {
    const { children } = this.props;
    return (
      <AssetOptionsContext.Provider value={this.state}>{children}</AssetOptionsContext.Provider>
    );
  }

  private getAssetOptions = () => {
    const assetOptions: ExtendedAssetOption[] = service.readAssetOptions() || [];
    this.setState({ assetOptions });
  };
}