import './App.css';

import {
	Button,
	logTime,
	useAsyncJob,
	useBusy,
} from './tools';

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
