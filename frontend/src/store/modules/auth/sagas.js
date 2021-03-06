import { takeLatest, call, put, all } from 'redux-saga/effects'
import { toast } from 'react-toastify'

import { signInSuccess, signFailure } from './actions'

import history from '../../../services/history'
import api from '../../../services/api'

export function* signIn({ payload }) {
  try {
    const { email, password } = payload

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    })

    const { token, user } = response.data

    api.defaults.headers.Authorization = `Bearer ${token}`

    yield put(signInSuccess(token, user))

    history.push('/dashboard')
  } catch (err) {
    toast.error(
      err.response.data.userMessage ||
        'Falha na autenticação, verifique seus dados.'
    )
    yield put(signFailure())
  }
}

export function* signUp({ payload }) {
  const { name, email, password } = payload

  try {
    yield call(api.post, 'users', {
      name,
      email,
      password,
      provider: true,
    })

    toast.success(
      'Usuário cadastrado com sucesso, faça login com seu e-mail e senha.'
    )
    history.push('/')
  } catch (err) {
    toast.error(
      err.response.data.userMessage ||
        'Falha no cadastro, verifique os seus dados.'
    )

    yield put(signFailure())
  }
}

export function setToken({ payload }) {
  if (!payload) return

  const { token } = payload.auth

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`
  }
}

export function signOut() {
  history.push('/')
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
])
