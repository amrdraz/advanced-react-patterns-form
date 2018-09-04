class EventEmitter {
  subscribers = {};
  getSubscribers(event) {
    this.subscribers[event] = this.subscribers[event] || new Set();
    return this.subscribers[event];
  }
  on(event, subscriber) {
    this.getSubscribers(event).add(subscriber);
    return () => this.off(event, subscriber);
  }
  off(event, subscriber) {
    this.getSubscribers(event).delete(subscriber);
    if (!this.getSubscribers(event).size) {
      delete this.subscribers[event];
    }
  }
  emit(event, ...args) {
    this.getSubscribers(event).forEach(subscriber => subscriber(...args));
  }
}

export { EventEmitter };
