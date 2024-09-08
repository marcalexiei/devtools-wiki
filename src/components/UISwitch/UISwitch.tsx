import { splitProps, type JSX, type ParentProps } from 'solid-js';

import './UISwitch.scss';

function UISwitchRoot(props: ParentProps): JSX.Element {
  return <div class="ui-switch">{props.children}</div>;
}

interface UISwitchItem extends ParentProps {
  name: string;
  value: string;
  checked: boolean;
  onChange: JSX.ChangeEventHandler<HTMLInputElement, Event>;
}

function UISwitchItem(props: UISwitchItem): JSX.Element {
  const [childrenProps, checkboxProps, restProps] = splitProps(
    props,
    ['children'],
    ['name', 'value', 'checked', 'onChange'],
  );

  return (
    <label class="material-icons" {...restProps}>
      <input type="radio" {...checkboxProps} />
      <span>{childrenProps.children}</span>
    </label>
  );
}

export { UISwitchRoot, UISwitchItem };
