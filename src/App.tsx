import { useEffect, useState } from 'react';
import './App.css';

const doubleClick = (id: string) => {
  const element = window.document.getElementById(id);
  element?.click();
  element?.click();
}

Object.assign(window, { doubleClick });

let globalBusy: boolean = false;

const trace = () => {
	//debugger;
}

function sleepPromise(delay: number = 100) {
	trace();
	return Promise
		.resolve()
		.then(() => 
			new Promise<void>(done => {
				trace();
				setTimeout(() => {
					trace();
					done();
				}, delay);
			})
		);
}

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

function useAsyncJob(): [number, Function] {
	const [counter, setCounter] = useState<number>(0);

	useEffect(() => console.log(`Use doubleClick(<id>) to stress test`), []);
	useEffect(() => {
		const timeout = setTimeout(() => setCounter(counter + 1), 100);
		return () => clearTimeout(timeout);
	}, [counter]);

	const job = () => 
	sleepPromise(1000)
	.then(() => setCounter(0));

	return [counter, job];
}

const logTime = (cb: Function) => () => {
	console.log(`${Date.now()} click enter`);
	cb();
	console.log(`${Date.now()} click exit`);
}

export function App() {

  const [busy, setBusy] = useBusy();
	const [counter, job] = useAsyncJob();

	const a = () => {
		setBusy(true);
		alert('hold it');
		setBusy(false);
	};

  const b = async () => {
    setBusy(true);
    await job();
    setBusy(false);
  };

  const c = async () => {
    await Promise.resolve();
    await b();
  };

  const d = () => 
    Promise
      .resolve()
      .then(() => setBusy(true))
      .then(() => job())
      .finally(() => setBusy(false));

  const e = () => {
    setBusy(true);
    return job()
      .finally(() => setBusy(false));
  };

  return (
    <div className="App">
      <header className="App-header">
				<p>idle counter: {counter}</p>
				<p>{busy ? 'busy' : 'ready'}</p>
        <div className='Actions'>
					<Button disabled={busy} id='a' onClick={logTime(a)} />
          <Button disabled={busy} id='b' onClick={logTime(b)} />
          <Button disabled={busy} id='c' onClick={logTime(c)} />
          <Button disabled={busy} id='d' onClick={logTime(d)} />
          <Button disabled={busy} id='e' onClick={logTime(e)} />
        </div>
      </header>
    </div>
  );
}

export default App;
