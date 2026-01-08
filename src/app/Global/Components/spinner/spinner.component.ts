import { Component } from "@angular/core";

@Component({
    selector:'ngx-loading-spinner',
    template:`
    <div class="spinner-container">
    <div class="sk-chase">
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
</div>
  </div>
    `,
    styleUrls:['./spinner.component.css']
    
})

export class SpinnerComponent{

}