import { AsiDialogView } from './asi-dialog-view';
import { AsiDialog } from './dialog/asi-dialog.component';
import { AsiDialogConfig } from './asi-dialog-config';
import { AsiDialogContainer } from './container/asi-dialog-container.component';
import { ComponentType } from './../common/component-type';
import { Injectable, ComponentFactory, ComponentFactoryResolver, ComponentRef, ApplicationRef } from '@angular/core';

@Injectable()
export class AsiDialogService {

  private dialogContainer : ComponentRef<AsiDialogContainer>;

  constructor(private resolver: ComponentFactoryResolver, private appRef: ApplicationRef) {
  }

  fromComponent<T extends AsiDialogView>(content: ComponentType<T>, config: AsiDialogConfig): AsiDialog<T> {
    let containerRef = this.getContainer();

    containerRef.instance.onContainerEmpty().subscribe(() => {
      this.dialogContainer.destroy();
      this.dialogContainer = null;
    });


    let dialogRef = this.createDialog(content, containerRef, config);
    containerRef.instance.addDialog(dialogRef, config);

    return dialogRef.instance;
  }

  private getContainer(): ComponentRef<AsiDialogContainer> {
    if (this.dialogContainer == null) {
      //Récuperation du rootComponent
      const rootComponent = this.appRef.components[0].instance;
      if (!rootComponent.viewContainerRef) {
        const appName = this.appRef.componentTypes[0].name;
        throw new Error("AsiDialog : Please add 'viewContainerRef : ViewContainerRef' declaration in your root component constructor : " + appName);
      }
      //Création d'un AsiDialogContainer
      const asiDialogContainerFactory: ComponentFactory<AsiDialogContainer> = this.resolver.resolveComponentFactory(AsiDialogContainer);
      let containerRef : ComponentRef<AsiDialogContainer> = rootComponent.viewContainerRef.createComponent(asiDialogContainerFactory, 0);
      this.dialogContainer = containerRef;
    }
    return this.dialogContainer;
  }

  private createDialog<T extends AsiDialogView>(content: ComponentType<T>, containerRef: ComponentRef<AsiDialogContainer>, config: AsiDialogConfig): ComponentRef<AsiDialog<T>> {
    //Creation de la notification
    const asiDialogFactory: ComponentFactory<AsiDialog<T>> = this.resolver.resolveComponentFactory(AsiDialog);
    let asiDialogRef = containerRef.instance.viewContainerRef.createComponent(asiDialogFactory, 0);

    asiDialogRef.instance.setConfig(config);

    //Deplacement de la dialog dans la div dialog-container
    containerRef.location.nativeElement.children[0].appendChild(asiDialogRef.location.nativeElement);

    //Création du composant désiré
    const contentFactory = this.resolver.resolveComponentFactory(content);
    let contentRef = asiDialogRef.instance.viewContainerRef.createComponent(contentFactory);

    let contentComponent = contentRef.instance;

    //Ajout de la reference du composant dans le AsiDialog
    asiDialogRef.instance['_component'] = contentComponent;
    
    contentComponent.registerDialog( asiDialogRef.instance);

    //Deplacement du contenu dans la div dialog-panel
    asiDialogRef.location.nativeElement.children[0].appendChild(contentRef.location.nativeElement);

    return asiDialogRef;
  }
}