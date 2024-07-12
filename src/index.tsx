import { render } from 'solid-js/web';

// biome-ignore lint/style/noNonNullAssertion: not needed, this is always present
const root = document.getElementById('root')!;

function HelloWorld() {
  return <div>Hello World!</div>;
}

render(() => <HelloWorld />, root);
