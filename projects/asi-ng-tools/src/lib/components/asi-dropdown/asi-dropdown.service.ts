import { AsiDropDown } from './asi-dropdown.component';
import { AsiDropdownContainer } from './container/asi-dropdown-container.component';
import { Injectable, ComponentFactory, ComponentFactoryResolver, ComponentRef, ApplicationRef } from '@angular/core';

import * as nh from '../../native-helper';

@Injectable()
export class AsiDropdownService {

  private containers: Array<ComponentRef<AsiDropdownContainer>> = [];

  constructor(private resolver: ComponentFactoryResolver, private appRef: ApplicationRef) {
  }

  /**
   *
   * @param templateRef The template content of the dropdown
   * @param htmlElement The parent HTMLElement, where the dropdown should display
   */
  showDropdown(elementRef: any, asiDropDown: AsiDropDown): ComponentRef<AsiDropdownContainer> {
    let containerRef = this.getContainer();

    containerRef.instance.injectService(this);
    containerRef.instance.forElement(elementRef);
    containerRef.instance.show(asiDropDown);
    containerRef.instance.setIndex(this.containers.length);

    containerRef.instance.onClose().subscribe((containerToRemove) => {
      nh.remove(this.containers, (container) => {
        return containerToRemove.index === container.instance.index;
      });

      console.log(this.containers.length);
    });

    this.containers.push(containerRef);

    return containerRef;
  }

  canClose(index: number) {
    return index >= this.containers.length - 1;
  }

  private getContainer(): ComponentRef<AsiDropdownContainer> {
    // Récuperation du rootComponent
    const rootComponent = this.appRef.components[0].instance;
    if (!rootComponent.viewContainerRef) {
      const appName = this.appRef.componentTypes[0].name;
      // tslint:disable-next-line:max-line-length
      throw new Error('AsiDropdown : Please add "viewContainerRef : ViewContainerRef" declaration in your root component constructor : ' + appName);
    }
    // Création d'un AsiDropdownContainer
    const asiDropdownContainerFactory: ComponentFactory<AsiDropdownContainer> = this.resolver.resolveComponentFactory(AsiDropdownContainer);
    let containerRef = rootComponent.viewContainerRef.createComponent(asiDropdownContainerFactory, 0);

    return containerRef;
  }
}
