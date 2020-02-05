const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

const getErrors = err => {
  return err.response
    ? err.response.data.errors
    : [];
};

export function fetchKey ({ state, commit }) {
  commit('fetchKeyStart');

  return fetch('/api/keys', {
    headers,
    credentials: 'same-origin'
  })
    .then(res => res.json())
    .then(json => {
      if (!json.ok) {
        return commit('fetchKeyFailure');
      }

      return commit('fetchKeySuccess', json.key);
    })
    .catch(() => commit('fetchKeyFailure'));
};

export function createKey ({ state, commit }) {
  commit('createKeyStart');

  return fetch('/api/keys', {
    method: 'POST',
    headers,
    credentials: 'same-origin'
  })
    .then(res => res.json())
    .then(json => {
      if (!json.ok) {
        return commit('createKeyFailure', json.errors || []);
      }

      return commit('createKeySuccess', json.key);
    })
    .catch(err => commit('createKeyFailure', getErrors(err)));
};

export function updateKey ({ state, commit }, id) {
  commit('updateKeyStart');

  return fetch(`/api/keys/${id}`, {
    method: 'PATCH',
    headers,
    credentials: 'same-origin'
  })
    .then(res => res.json())
    .then(json => {
      if (!json.ok) {
        return commit('updateKeyFailure', json.errors || []);
      }

      return commit('updateKeySuccess', json.key);
    })
    .catch(err => commit('updateKeyFailure', getErrors(err)));
};

export function updateUser ({ state, commit }, payload) {
  commit('updateUserStart');

  return fetch('/api/users', {
    method: 'PUT',
    headers,
    credentials: 'same-origin',
    body: JSON.stringify(payload)
  })
    .then(res => res.json())
    .then(json => {
      if (!json.ok) {
        return commit('updateUserFailure', json.errors || []);
      }

      return commit('updateUserSuccess', json.user);
    })
    .catch(err => commit('updateUserFailure', getErrors(err)));
};
