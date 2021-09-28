import {
	Button,
	ButtonCb,
	ButtonHooks,
	Hooks,
	toTimeLoggedFunction,
	useAsyncJob,
	useBusy,
} from './tools';

const makeCallbacks = ({ setBusy, job }: Hooks) => Object.entries<ButtonCb>({

	a: () => {
		setBusy(true);
		alert('hold it');
		setBusy(false);
	},
	
	b: async () => {
		setBusy(true);
		await job();
		setBusy(false);
	},
	
	c: () => {
		setBusy(true);
		return job()
			.finally(() => setBusy(false));
	},

	d: async () => {
		await Promise.resolve();
		setBusy(true);
		await job();
		setBusy(false);
	},
	
	e: () => 
		Promise
			.resolve()
			.then(() => setBusy(true))
			.then(() => job())
			.finally(() => setBusy(false)),
	
	f: () =>
		Promise.reject(new Error('0xDEADBEEF')),

	g: () => {
		throw new Error('L33TH@X0R');
	}

}).map(toTimeLoggedFunction);

export function App() {

  const [busy, setBusy] = useBusy();
	const [counter, job] = useAsyncJob();

	const toButton = ([key, onClick]: ButtonHooks) => 
		<Button disabled={busy} id={key} key={key} onClick={onClick} />;

	const buttons = makeCallbacks({ setBusy, job }).map(toButton);

  return (
    <div className="App">
      <header className="App-header">
				<p>idle counter: {counter}</p>
				<p>{busy ? 'busy' : 'ready'}</p>
        <div className='Actions'>
					{buttons}
        </div>
      </header>
    </div>
  );
}

export default App;
