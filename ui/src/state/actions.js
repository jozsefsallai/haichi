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

      return commit('fetchKeySuccess', json.key)
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
        return commit('createKeyFailure', getErrors(err));
      }

      return commit('createKeySuccess', json.key)
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
        return commit('updateKeyFailure', getErrors(err));
      }

      return commit('updateKeySuccess', json.key)
    })
    .catch(err => commit('updateKeyFailure', getErrors(err)));
};
