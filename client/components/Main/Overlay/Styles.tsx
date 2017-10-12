import * as React from 'react'
import styled from 'styled-components'

export const Container = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  opacity: 0.7;
  z-index: 2;
`

export const Card = styled.div`
  margin: 0 15px;
  text-align: center;
  width: 200px;
  border-width: 0px 0px 2px 0px;
`
