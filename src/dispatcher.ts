abstract class EventDispatcher {
  private _listeners: {[key: string]: any} = {};

  addEventListener = (type: string, listener: CallableFunction) => {
    if (this._listeners === undefined) this._listeners = {};
    const listeners = this._listeners;

    if (listeners[type] === undefined) {
      listeners[type] = [];
    }

    if (listeners[type].indexOf(listener) === - 1) {
      listeners[type].push(listener);
    }
  }

  dispatchEvent = <K extends string, T>(event: {type: K, payload: T}) => {
    if (this._listeners === undefined) return;
    const listeners = this._listeners;
    const listenerArray = listeners[event.type];

    if (listenerArray !== undefined) {
      // event.target = this;
      // Make a copy, in case listeners are removed while iterating.
      const array = listenerArray.slice(0);
      for (let i = 0, l = array.length; i < l; i++) {
        array[i].call(this, event);
      }
    }
  }
}

export { EventDispatcher };