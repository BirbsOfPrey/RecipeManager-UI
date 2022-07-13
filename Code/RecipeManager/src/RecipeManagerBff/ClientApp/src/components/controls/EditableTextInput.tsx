import { ChangeEventHandler, Component, FocusEventHandler, KeyboardEventHandler } from 'react';
import './EditableInputText.css'

interface IState {
  editingValue?: string
  valid: boolean
  readonly: boolean
}

interface IProps {
  setValue: (value: string) => void
  validator?: (value: string) => boolean
  className?: string
  name?: string
  placeholder?: string
  readonly?: boolean
  value?: string
}

export class EditableInputText extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      editingValue: props.value,
      readonly: props.readonly || false,
      valid: true
    }
  }

  onChange: ChangeEventHandler<HTMLInputElement> = (event) => this.setState({ editingValue: event.target.value })

  onKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter" || event.key === "Escape") {
      event.target.blur()
    }
  }

  onBlur: FocusEventHandler<HTMLInputElement> = (event) => {
    this.setState({valid: this.props.validator ? this.props.validator(event.target.value) : true})
    this.props.setValue(event.target.value)
  }

  render() {
    const classNames: string = `${this.props.className} editable ${this.state.valid ? "" : "invalid"}`

    return (
      <input
        className={classNames}
        type="text"
        aria-label={this.props.name}
        placeholder={this.props.placeholder}
        value={this.state.editingValue}
        readOnly={this.state.readonly}
        onChange={this.onChange}
        onKeyDown={this.onKeyDown}
        onBlur={this.onBlur}
      />
    )
  }

}