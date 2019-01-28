import { AsiDialogView } from './asi-dialog-view';
import { AsiDialog } from './dialog/asi-dialog.component';
import { AsiDialogConfig } from './asi-dialog-config';
import { AsiDialogContainer } from './container/asi-dialog-container.component';
import { ComponentType } from './../common/component-type';
import { Injectable, ComponentFactory, ComponentFactoryResolver, ComponentRef, ApplicationRef } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable()
export class AsiDialogService {

  private dialogContainer: ComponentRef<AsiDialogContainer>;
  private dialogEmptySubscription: Subscription;

  constructor(private resolver: ComponentFactoryResolver, private appRef: ApplicationRef) {
  }

  fromComponent<T extends AsiDialogView>(content: ComponentType<T>, config: AsiDialogConfig): AsiDialog<T> {
    let containerRef = this.getContainer();

    if (!this.dialogEmptySubscription || this.dialogEmptySubscription.closed) {
      this.dialogEmptySubscription = containerRef.instance.onContainerEmpty().subscribe(() => {
        this.dialogEmptySubscription.unsubscribe();
        this.dialogContainer.destroy();
        this.dialogContainer = null;
      });
    }

    let dialogRef = this.createDialog(content, containerRef, config);
    containerRef.instance.addDialog(dialogRef);

    return dialogRef.instance;
  }

  private getContainer(): ComponentRef<AsiDialogContainer> {
    if (this.dialogContainer == null) {
      // Récuperation du rootComponent
      const rootComponent = this.appRef.components[0].instance;
      if (!rootComponent.viewContainerRef) {
        const appName = this.appRef.componentTypes[0].name;
        // tslint:disable-next-line:max-line-length
        throw new Error('AsiDialog: Please add "viewContainerRef : ViewContainerRef" declaration in your root component constructor : ' + appName);
      }
      // Création d'un AsiDialogContainer
      const asiDialogContainerFactory: ComponentFactory<AsiDialogContainer> = this.resolver.resolveComponentFactory(AsiDialogContainer);
      let containerRef: ComponentRef<AsiDialogContainer> = rootComponent.viewContainerRef.createComponent(asiDialogContainerFactory, 0);
      this.dialogContainer = containerRef;
    }
    return this.dialogContainer;
  }

  private createDialog<T extends AsiDialogView>(content: ComponentType<T>, containerRef: ComponentRef<AsiDialogContainer>,
    config: AsiDialogConfig): ComponentRef<AsiDialog<T>> {

    // Creation de la dialog
    const asiDialogFactory: ComponentFactory<AsiDialog<T>> = this.resolver.resolveComponentFactory<AsiDialog<T>>(AsiDialog);
    let asiDialogRef = containerRef.instance.viewContainerRef.createComponent(asiDialogFactory, 0);

    asiDialogRef.instance.setConfig(config);

    // Moving dialog in div dialog-container
    containerRef.location.nativeElement.children[0].appendChild(asiDialogRef.location.nativeElement);

    //  Create component
    const contentFactory = this.resolver.resolveComponentFactory(content);
    let contentRef = asiDialogRef.instance.viewContainerRef.createComponent(contentFactory);

    let contentComponent = contentRef.instance;

    // Ajout de la reference du composant dans le AsiDialog
    asiDialogRef.instance['_component'] = contentComponent;

    contentComponent.registerDialog(asiDialogRef.instance);

    // Deplacement du contenu dans la div dialog-panel
    asiDialogRef.location.nativeElement.children[0].appendChild(contentRef.location.nativeElement);

    return asiDialogRef;
  }
}
