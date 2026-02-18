let listeners = [];

export const toastService = {
  subscribe(fn) {
    listeners.push(fn);
    return () => {
      listeners = listeners.filter(l => l !== fn);
    };
  },

  show(message, type = 'success') {
    listeners.forEach(fn =>
      fn({
        id: Date.now(),
        message,
        type
      })
    );
  },

  success(msg) {
    this.show(msg, 'success');
  },

  error(msg) {
    this.show(msg, 'danger');
  },

  info(msg) {
    this.show(msg, 'info');
  },

  warning(msg) {
    this.show(msg, 'warning');
  }
};
