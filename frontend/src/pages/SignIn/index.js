import React from 'react'

import MaInput from '~/components/MaInput'
import Container from '~/components/Container'
import MaButton from '~/components/MaButton'

import logo from '~/assets/logo.svg'

import { MaForm } from './styles'

export default function SignIn() {
  return (
    <Container>
      <img src={logo} alt='MeetApp logo' />
      <MaForm>
        <MaInput name='email' placeholder='Digite seu e-mail' type='email' />
        <MaInput
          name='password'
          placeholder='Sua senha secreta'
          type='password'
        />
        <MaButton type='submit' title='Entrar' />
      </MaForm>
    </Container>
  )
}
