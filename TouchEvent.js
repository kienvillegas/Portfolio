export default class TouchEvent {
  static SWIPE_THRESHOLD = 50;

  static SWIPE_LEFT = 1;
  static SWIPE_RIGHT = 2;

  constructor(startEvent, endEvent) {
    this.startEvent = startEvent;
    this.endEvent = endEvent;
  }

  isSwipeLeft() {
    return this.getSwipeDirection() == TouchEvent.SWIPE_LEFT;
  }

  isSwipeRight() {
    return this.getSwipeDirection() == TouchEvent.SWIPE_RIGHT;
  }

  getSwipeDirection() {
    if (!this.startEvent.changedTouches || !this.endEvent.changedTouches) {
      return null;
    }

    let start = this.startEvent.changedTouches[0];
    let end = this.endEvent.changedTouches[0];

    if (!start || !end) {
      return null;
    }

    let horizontalDiff = start.screenX - end.screenX;

    if (Math.abs(horizontalDiff) > Math.abs(verticalDiff)) {
      if (horizontalDiff >= TouchEvent.SWIPE_THRESHOLD) {
        return TouchEvent.SWIPE_LEFT;
      } else if (horizontalDiff >= -TouchEvent.SWIPE_THRESHOLD) {
        return TouchEvent.SWIPE_RIGHT;
      }
    }
    return null;
  }
  sendEndEvent(endEvent) {
    this.endEvent = endEvent;
  }
}
