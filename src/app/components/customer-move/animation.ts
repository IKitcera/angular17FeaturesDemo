// animations.ts

import {trigger, keyframes, style, animate, transition} from '@angular/animations';

export const customerAnimation = trigger('customerAnimation', [
  // Use 'state()' and 'animate()' inside 'transition()'
  transition('void => *', [
    style({ transform: 'translateX(0)' }),
    animate('15s', keyframes([
      style({ transform: 'translateX(700px)', offset: 0.5 }),
      style({ transform: 'translateX(700px) translateY(360px)', offset: 0.75 }),
      style({ transform: 'translateX(1200px) translateY(360px)', offset: 1 })
    ]))
  ]),
]);
