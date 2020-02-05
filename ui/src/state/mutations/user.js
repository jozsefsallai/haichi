import Toaster from 'lib/toaster';
import errorsDict from 'lib/errors';

// --------------------------------------------- //
// updateUser
// --------------------------------------------- //

export function updateUserStart (state) {
  state.meta.user = {
    errored: false,
    mutating: true
  };
};

export function updateUserSuccess (state, json) {
  state.meta.user = {
    mutating: false,
    errored: false
  };

  state.user = json;

  Toaster.create('success', 'Your details have been updated successfully!', 'Yay!');
};

export function updateUserFailure (state, errors) {
  state.meta.user = {
    mutating: false,
    errored: true
  };

  if (errors.length) {
    errors.forEach(error => {
      Toaster.create('danger', errorsDict.userUpdate[error.code], 'Error');
    });
  } else {
    Toaster.create('danger', 'Failed to update your details, please reload the page.', 'Uh-oh!');
  }
};
