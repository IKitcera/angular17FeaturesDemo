import {booleanAttribute, Component, Input, numberAttribute} from "@angular/core";

@Component({
  selector: 'app-shelving',
  styles: [`
    .stellage {
      display: flex;
      position: absolute;
      top: 80px;
      left: 750px;
    }

    .shelf {
      width: 80px;
      height: 150px;
      background-color: #bdc3c7;
      margin-right: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
    }

    .box {
      width: 60px;
      height: 40px;
      background-color: dimgray;
      margin-bottom: 10px;
    }
  `],
  template: `
      @if (show) {
          <div class="stellage">
              <div class="shelf">
                  <div class="box"></div>
                  <div class="box"></div>
                  <div class="box"></div>
              </div>
              <div class="shelf">
                  <div class="box"></div>
                  <div class="box"></div>
                  <div class="box"></div>
              </div>
              <div class="shelf">
                  <div class="box"></div>
                  <div class="box"></div>
                  <div class="box"></div>
              </div>
          </div>
      }
  `,
  standalone: true
})
export class ShelvingComponent {

  // @Input() show: boolean;
  @Input({required: true, transform: booleanAttribute}) show: boolean = true;

  // Will parse string to nr
  // @Input({required: true, transform: numberAttribute}) show: number = 0;
}
