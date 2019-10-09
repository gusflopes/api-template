import React, { useState } from 'react';

//Components

import Header from '../../components/Header'

import './styles.css';

export default function Clients() {

  const [name, setName] = useState('Sem Nome')

  function alterName() {
    setName('Lucas de Carvalho')
  } 

  return (
    <>
      <Header />
    </>
  )
}
