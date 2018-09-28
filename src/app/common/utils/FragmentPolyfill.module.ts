import { ActivatedRoute } from '@angular/router';
import { Directive, Input } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Inject } from '@angular/core';
import { InjectionToken } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { NgModule } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

export interface WindowScrollerOptions {
  smooth: boolean;
}

export let WINDOW_SCROLLER_OPTIONS = new InjectionToken<WindowScrollerOptions>('WindowScroller.Options');

export abstract class WindowScroller {
  abstract scrollIntoView(elementRef: ElementRef): void;
}

export class NativeWindowScroller implements WindowScroller {

  private behavior: 'auto' | 'smooth';
  private timer: any;

  // Initialize the window scroller implementation.
  public constructor(@Inject(WINDOW_SCROLLER_OPTIONS) options: WindowScrollerOptions) {
    this.behavior = (options.smooth ? 'smooth' : 'auto');
  }

  // Scroll the given ElementRef into the client's viewport.
  public scrollIntoView(elementRef: ElementRef): void {

    if (this.timer) {
      this.doScroll(elementRef);
    } else {
      this.timer = setTimeout(() => {
        this.doScroll(elementRef);
      }, 0);
    }
  }

  // I perform the scrolling of the viewport.
  private doScroll(elementRef: ElementRef): void {
    elementRef.nativeElement.scrollIntoView({
      behavior: this.behavior,
      block: 'start'
    });

  }

}

@Directive({
  selector: '[scrollFragment]'
})
export class FragmentTargetDirective implements OnInit, OnDestroy {

  @Input()
  public scrollFragment: string;

  private activatedRoute: ActivatedRoute;
  private elementRef: ElementRef;
  private fragmentSubscription: Subscription;
  private windowScroller: WindowScroller;

  // I initialize the fragment-target directive.
  constructor(
    activatedRoute: ActivatedRoute,
    elementRef: ElementRef,
    windowScroller: WindowScroller
  ) {

    this.activatedRoute = activatedRoute;
    this.elementRef = elementRef;
    this.windowScroller = windowScroller;

    this.fragmentSubscription = null;
  }

  public ngOnDestroy(): void {
    if (this.fragmentSubscription) {
      this.fragmentSubscription.unsubscribe();
    }
  }
  public ngOnInit(): void {
    this.fragmentSubscription = this.activatedRoute.fragment.subscribe(
      (fragment: string): void => {
        if (!fragment) {
          return;
        }
        if (fragment !== this.scrollFragment) {
          return;
        }
        this.windowScroller.scrollIntoView(this.elementRef);
      }
    );
  }
}

interface ModuleOptions {
  smooth?: boolean;
}

@NgModule({
  exports: [
    FragmentTargetDirective
  ],
  declarations: [
    FragmentTargetDirective
  ]
})
export class FragmentPolyfillModule {
  static forRoot(options?: ModuleOptions): ModuleWithProviders {
    return ({
      ngModule: FragmentPolyfillModule,
      providers: [
        {
          provide: WINDOW_SCROLLER_OPTIONS,
          useValue: {
            smooth: ((options && options.smooth) || false)
          }
        },
        {
          provide: WindowScroller,
          useClass: NativeWindowScroller
        }
      ]
    });

  }

}
