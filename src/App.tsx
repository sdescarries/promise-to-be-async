import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

let globalBusy = false;

const sleepPromise = (delay: number) => 
  new Promise(done => setTimeout(done, delay));

const Button = (props: any) => (
  <button className='Button' {...props}>
    {props.id}
  </button>
)

function useBusy(): [boolean, Function] {
  const [busy, setBusy] = useState<boolean>(globalBusy);

  const wrapper = (value: boolean) => {
    console.log(`${Date.now()} setBusy ${globalBusy} => ${value}`);

    if (globalBusy === value) {
      throw new Error('double clicked');
    }

    setBusy(value);

    // bypass lifecycle for actual busyness check
    globalBusy = value;
  }

  return [busy, wrapper];
}

export function App() {

  const [busy, setBusy] = useBusy();

  const badHandler = () => 
    Promise
      .resolve()
      .then(() => setBusy(true))
      .then(() => sleepPromise(1000))
      .then(() => setBusy(false));

  const asyncHandler = async () => {
    setBusy(true);
    await sleepPromise(1000);
    setBusy(false);
  };

  const nestedHandler = async () => {
    await Promise.resolve();
    await asyncHandler();
  };

  const goodHandler = () => {
    setBusy(true);
    return sleepPromise(1000)
      .then(() => setBusy(false));
  };

  const logTime = (cb: Function) => () => {
    console.log(`${Date.now()} click enter`);
    cb();
    console.log(`${Date.now()} click exit`);
  }

  console.log(`${Date.now()} render ${busy}`);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div className='Actions'>
          <Button disabled={busy} id='async' onClick={logTime(asyncHandler)} />
          <Button disabled={busy} id='good' onClick={logTime(goodHandler)} />
          <Button disabled={busy} id='bad' onClick={logTime(badHandler)} />
          <Button disabled={busy} id='nested' onClick={logTime(nestedHandler)} />
        </div>
      </header>
    </div>
  );
}

const doubleClick = (id: string) => {
  const element = window.document.getElementById(id);
  element?.click();
  element?.click();
}

Object.assign(window, { doubleClick });

export default App;
