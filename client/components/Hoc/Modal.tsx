import * as React from 'react'
import { createPortal } from 'react-dom'

export interface Props {
  elementType: string,
  target: string
}

class Modal extends React.Component<any, any> {
  constructor(props) {
    super(props)

    const { elementType, root } = this.props

    this.modalChild = document.createElement(elementType || 'div')
    this.modalRoot = document.querySelector(root)
    this.createHandlers()
  }

  componentDidMount() {
    this.append()
  }

  componentWillUnmount() {
    this.remove()
  }

  createHandlers = () => {
    if (Array.isArray(this.modalRoot)) {
      const modalRoots = [].slice.call(this.modalRoot)

      this.append = () => modalRoots.forEach(this._append)
      this.remove = () => modalRoots.forEach(this._remove)
    } else {
      this.append = () => this._append(this.modalRoot)
      this.remove = () => this._remove(this.modalRoot)
    }
  }

  _append(root: any) {
    root.appendChild(this.modalChild)
  }

  _remove(root: any) {
    root.removeChild(this.modalChild)
  }

  render() {

    return createPortal(
      this.props.children,
      this.modalChild
    )
  }
}

export default Modal
