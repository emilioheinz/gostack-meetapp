import React from 'react'

import MaInput from '~/components/MaInput'
import Container from '~/components/Container'

import logo from '~/assets/logo.svg'

import { MaForm } from './styles'

export default function SignIn() {
  return (
    <Container>
      <img src={logo} alt='MeetApp logo' />
      <MaForm>
        <MaInput name='name' placeholder='Nome Completo' />
      </MaForm>
    </Container>
  )
}