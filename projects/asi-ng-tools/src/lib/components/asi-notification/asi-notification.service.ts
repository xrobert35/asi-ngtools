import { ComponentType } from './../common/component-type';
import { AsiNotification } from './notification/asi-notification.component';
import { AsiNotificationContainer } from './container/asi-notification-container.component';
import { AsiNotificationConfig, AsiNotificationPosition } from './asi-notification-config';
import { Injectable, ComponentFactory, ComponentFactoryResolver, ComponentRef, ApplicationRef } from '@angular/core';

@Injectable()
export class AsiNotificationService {

  private containerByPosition = new Map<AsiNotificationPosition, ComponentRef<AsiNotificationContainer>>();

  constructor(private resolver: ComponentFactoryResolver, private appRef: ApplicationRef) {
  }

  fromComponent<T>(content: ComponentType<T>, config: AsiNotificationConfig): AsiNotification<T> {
    let containerRef = this.getContainerForPosition(config.position);

    let notificationRef = this.createNotificiation(content, containerRef, config);
    containerRef.instance.addNotification(notificationRef, config);

    return notificationRef.instance;
  }

  private getContainerForPosition(position: AsiNotificationPosition): ComponentRef<AsiNotificationContainer> {
    if (this.containerByPosition.get(position) == null) {
      // Récuperation du rootComponent
      const rootComponent = this.appRef.components[0].instance;
      if (!rootComponent.viewContainerRef) {
        const appName = this.appRef.componentTypes[0].name;
        // tslint:disable-next-line:max-line-length
        throw new Error('AsiNotification : Please add "viewContainerRef : ViewContainerRef" declaration in your root component constructor : ' + appName);
      }
      // Création d'un AsiNotificationContainer
      const asiNotificationContainerFactory: ComponentFactory<AsiNotificationContainer> =
        this.resolver.resolveComponentFactory(AsiNotificationContainer);
      let containerRef = rootComponent.viewContainerRef.createComponent(asiNotificationContainerFactory, 0);
      containerRef.instance.setPosition(position);
      this.containerByPosition.set(position, containerRef);

      // Ecoute de la mise a vide du container pour le supprimer
      containerRef.instance.onContainerEmpty().subscribe((asiNotificationContainer: AsiNotificationContainer) => {
        const containerToDestroy = this.containerByPosition.get(asiNotificationContainer.getPosition());
        this.containerByPosition.delete(asiNotificationContainer.getPosition());
        containerToDestroy.destroy();
      });
    }
    return this.containerByPosition.get(position);
  }

  private createNotificiation<T>(content: ComponentType<T>, containerRef: ComponentRef<AsiNotificationContainer>,
    config: AsiNotificationConfig): ComponentRef<AsiNotification<T>> {

    // Creation de la ntoficiation
    const asiNotificationFactory: ComponentFactory<AsiNotification<T>> =
      this.resolver.resolveComponentFactory<AsiNotification<T>>(AsiNotification);
    let asiNotificationRef = containerRef.instance.viewContainerRef.createComponent(asiNotificationFactory, 0);

    asiNotificationRef.instance.setConfig(config);

    // Deplacement de la notification dans la div notifications-container
    containerRef.location.nativeElement.children[0].appendChild(asiNotificationRef.location.nativeElement);

    // Création du composant désiré
    const contentFactory = this.resolver.resolveComponentFactory(content);
    let contentRef = asiNotificationRef.instance.viewContainerRef.createComponent(contentFactory);

    let contentComponent = contentRef.instance;

    // Ajout de la reference du composant dans le AsiNotification
    asiNotificationRef.instance['_component'] = contentComponent;

    // Deplacement du contenu dans la div notification-panel
    asiNotificationRef.location.nativeElement.appendChild(contentRef.location.nativeElement);

    return asiNotificationRef;
  }
}
