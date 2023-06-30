import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
import * as Sentry from '@sentry/svelte';

Sentry.init({
	dsn: 'https://2e8f8e0563144a928e6d72aabccdc196@o4505447362068480.ingest.sentry.io/4505447365017600',
	integrations: [
		new Sentry.BrowserTracing({
			// Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
			tracePropagationTargets: ['localhost', /^https:\/\/pixelvaultbackend\.fly\.dev\/api/]
		}),
		new Sentry.Replay()
	],

	// Set tracesSampleRate to 1.0 to capture 100%
	// of transactions for performance monitoring.
	// We recommend adjusting this value in production
	tracesSampleRate: 1.0,

	// Capture Replay for 10% of all sessions,
	// plus for 100% of sessions with an error
	replaysSessionSampleRate: 0.1,
	replaysOnErrorSampleRate: 1.0
});

export async function load({ fetch }) {
	const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/image', {
		method: 'GET',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const res = await resp.json();
	if (resp.status == 200) {
		return {
			images: res
		};
	} else {
		return {
			images: []
		};
	}
}
