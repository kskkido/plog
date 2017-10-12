import styled from 'styled-components'

export const HEIGHT = 10

export const Container = styled.div`
  margin-left: 5%;
  padding-top: 20px;
  width: 20%;
  display: flex;
  flex-direction: column;
`

export const Form = styled.form`
  margin-top: 20px;
  display: block;

`

export const Input = styled.input`
  color: white;
  font-size: 17px;
  margin-top: 20px;
  padding: 5px;
  display: block;
  border-width: 0 0 1px 0;
  border-style: solid;
  border-color: white;
  background-color: transparent;
  maxlength: 20;
`

export const Add = styled.div`
  text-align: center;
  margin-top: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  width: 120px;
  display: inline-block;
  cursor: pointer;
`

export const Tag = styled.div`
  margin-top: 5px;
  padding-left: 5px;
  max-width: 80%;
  overflow-X: hidden;
`
