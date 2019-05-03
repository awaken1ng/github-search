import * as React from 'react';
import { debounce } from 'throttle-debounce';

interface Attributes {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

interface Props extends Attributes {
  // capture `onKeyUp` handler so it won't override internal handler
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onDebounce: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  delay: number;
}

export default class DebouncedInput extends React.Component<Props, object> {
  attributes: Attributes;

  constructor(props: Props) {
    super(props);
    // separate `onKeyUp`, `onChange` and `delay` from the rest of the props
    // to pass as <input> attributes
    const {
      onKeyUp, onDebounce, delay, ...attributes
    } = this.props;
    this.attributes = attributes;
    this.debouncedEmit = debounce(delay, this.debouncedEmit);
  }

  handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.isPropagationStopped()) return;

    const { onKeyUp } = this.props;
    event.persist();
    if (onKeyUp) onKeyUp(event);
    this.debouncedEmit(event);
  }

  // eslint-disable-next-line react/destructuring-assignment
  debouncedEmit = (event: React.KeyboardEvent<HTMLInputElement>) => this.props.onDebounce(event)

  render() {
    return (
      <input
        onKeyUp={this.handleKeyUp}
        tabIndex={0}
        {...this.attributes}
      />
    );
  }
}
