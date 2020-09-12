import { EventDispatcher } from './dispatcher';

class CommunicationManager extends EventDispatcher {
  constructor(private _origin: string, private _source: any) {
    super();
  }

  public listen(): void {
    window.addEventListener('message', this.handleMessageEvent);
  }

  public sendMessage = (message: any): void => {
    this._source.postMessage(message, this._origin);
  }
  
  public onMessage(event: MessageEvent) {
    console.debug('CommunicationManager:: handleMessageEvent', event, this);
  }

  private handleMessageEvent = (event: MessageEvent) => {
    console.debug('CommunicationManager:: handleMessageEvent', event, this);

    if (this._origin !== event.origin) {
      console.debug('CommunicationManager:: message from unauthorized origin', event, this);
      return;
    }
    this._source = !this._source && event.source ? event.source : this._source;

    this.onMessage(event);
  }
}

export default CommunicationManager;