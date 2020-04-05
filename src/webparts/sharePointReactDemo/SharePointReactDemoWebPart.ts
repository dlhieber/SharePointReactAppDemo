import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'SharePointReactDemoWebPartStrings';
import SharePointReactDemo from './components/SharePointReactDemo';
import { ISharePointReactDemoProps } from './components/ISharePointReactDemoProps';

export interface ISharePointReactDemoWebPartProps {
  description: string;
}

export default class SharePointReactDemoWebPart extends BaseClientSideWebPart <ISharePointReactDemoWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISharePointReactDemoProps> = React.createElement(
      SharePointReactDemo,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
