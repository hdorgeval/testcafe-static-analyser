import { EventEmitter } from "events";

const emitter = new EventEmitter();

export const eventBus = {
  register: (listener: <T>(data: T) => void ) => {
    return {
      forEvent: (event: string) => emitter.on(event, listener),
    };
  },
  send: <T extends {[index: string]: any}>(event: string, eventArgs: T) => emitter.emit(event, eventArgs),
};
