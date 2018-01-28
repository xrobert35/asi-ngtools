/** 
 * Class de configuration
 */
export class AsiNotificationConfig {
  position : AsiNotificationPosition;
  type : AsiNotificationType;
  delayInMs : number;
  withIcon : boolean;
}

/** 
 * Les differentes positions d'affichage possible
 */
export class AsiNotificationPosition {
  
  static TOP_LEFT = new AsiNotificationPosition("top_left");
  static TOP_RIGHT = new AsiNotificationPosition("top_right");
  static TOP_CENTER = new AsiNotificationPosition("top_center");
  static BOTTOM_LEFT = new AsiNotificationPosition("bottom_left");
  static BOTTOM_RIGHT = new AsiNotificationPosition("bottom_right");
  static BOTTOM_CENTER = new AsiNotificationPosition("bottom_center");

  constructor(public value: string) {
  }
  toString() {
    return this.value;
  }
}

/**
 * Les differents type de notification possible
 */
export class AsiNotificationType {

  static SUCCESS = new AsiNotificationType("success");
  static INFO = new AsiNotificationType("info");
  static ERROR = new AsiNotificationType("error");
  static WARNING = new AsiNotificationType("warning");

  constructor(public value: string) {
  }
  toString() {
    return this.value;
  }
}