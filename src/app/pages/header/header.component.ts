import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit
} from "@angular/core";
import { fromEvent, Subscription } from "rxjs";
import { filter, throttleTime } from "rxjs/operators";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css', './header.scss']
})
export class HeaderComponent implements OnDestroy, OnInit{

  isOpen = false;
  resize: Subscription;

  /**
   * Listens for a click in document and then check for isOpen to be true.
   * If so, then close it
   */
  @HostListener("document:click", ["$event"]) onClick(event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.checkIfNavDropDown();
    }
  }

  ngOnDestroy() {
    /**
     * It's a good habit to unsubscribe from observable event to prevent memory leak. If your application create
     * streams without cleaning up it can be a memory hog and will eventually crash.
     */
    this.resize.unsubscribe();
  }

  ngOnInit() {
    /**
     * Although the application doesn't use this.resize. it is used for unsubscribing (memory cleanup)
     */
    this.resize = fromEvent(window, "resize")
      .pipe(
        throttleTime(500),
        filter(() => !!this.elementRef)
      )
      .subscribe(() => this.checkIfNavDropDown());
  }

  checkIfNavDropDown() {
    if (this.isOpen) {
      this.isOpen = false;
    }
  }

  onMenu() {
    this.isOpen = !this.isOpen;
  }

}
