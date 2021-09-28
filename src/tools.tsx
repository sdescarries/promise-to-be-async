import { useEffect, useState } from 'react';

export interface Hooks {
	setBusy: (busy: boolean) => void;
	job: () => Promise<void>;
}

export type ButtonCb = () => void;
export type ButtonHooks = [string, ButtonCb];

export const doubleClick = (id: string) => {
  const element = window.document.getElementById(id);
  element?.click();
  element?.click();
}

let globalBusy: boolean = false;

export const trace = () => {
	//debugger;
}

export function sleepPromise(delay: number = 100) {
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

export const Button = (props: any) => (
  <button className='Button' {...props}>
    {props.id}
  </button>
)

export function useBusy(): [boolean, (busy: boolean) => void] {
  const [busy, setBusy] = useState<boolean>(globalBusy);

  const wrapper = (value: boolean): void => {
    console.log(`${Date.now()} setBusy ${globalBusy} => ${value}`);

		const doubleClicked = globalBusy === value;

    setBusy(value);

    // bypass lifecycle for actual busyness check
    globalBusy = value;

    if (doubleClicked) {
      throw new Error('double clicked');
    }
  }

  return [busy, wrapper];
}

export function useAsyncJob(): [number, () => Promise<void>] {
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

export const logTime = (cb: ButtonCb) => () => {
	console.debug(`${Date.now()} click enter`);
	cb();
	console.debug(`${Date.now()} click exit`);
}

export const toTimeLoggedFunction = ([key, fn]: ButtonHooks): ButtonHooks => ([key, logTime(fn)]);