import Toaster from 'lib/toaster';
import errorsDict from 'lib/errors';

// --------------------------------------------- //
// fetchKey
// --------------------------------------------- //

export function fetchKeyStart (state) {
  state.meta.key = {
    errored: false,
    mutating: true
  };
};

export function fetchKeySuccess (state, json) {
  state.meta.key = {
    mutating: false,
    errored: false
  };

  state.key = json;
};

export function fetchKeyFailure (state) {
  state.meta.key = {
    mutating: false,
    errored: true
  };
};

// --------------------------------------------- //
// createKey
// --------------------------------------------- //

export function createKeyStart (state) {
  state.meta.key = {
    errored: false,
    mutating: true
  };
};

export function createKeySuccess (state, json) {
  state.meta.key = {
    mutating: false,
    errored: false
  };

  state.key = json;

  Toaster.create('success', 'API key created successfully!', 'Yay!');
};

export function createKeyFailure (state, errors) {
  state.meta.key = {
    mutating: false,
    errored: true
  };

  if (errors.length) {
    errors.forEach(error => {
      Toaster.create('danger', errorsDict.keys[error.code], 'Error');
    });
  } else {
    Toaster.create('danger', 'Failed to create API key, please reload the page.', 'Uh-oh!');
  }
};

// --------------------------------------------- //
// updateKey
// --------------------------------------------- //

export function updateKeyStart (state) {
  state.meta.key = {
    errored: false,
    mutating: true
  };
};

export function updateKeySuccess (state, json) {
  state.meta.key = {
    mutating: false,
    errored: false
  };

  state.key = json;

  Toaster.create('success', 'API key regenerated successfully!', 'Yay!');
};

export function updateKeyFailure (state, errors) {
  state.meta.key = {
    mutating: false,
    errored: true
  };

  if (errors.length) {
    errors.forEach(error => {
      Toaster.create('danger', errorsDict.keys[error.code], 'Error');
    });
  } else {
    Toaster.create('danger', 'Failed to regenerate API key, please reload the page.', 'Uh-oh!');
  }
};
