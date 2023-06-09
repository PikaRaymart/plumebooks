import ReactDOMServer from 'react-dom/server';
import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import route from '../../vendor/tightenco/ziggy/dist/index.m';
import { GlobalStyle, Theme } from './Styled/base';
import { ThemeProvider } from 'styled-components';

const appName = 'PlumeBooks';

createServer((page) =>
	createInertiaApp({
		page,
		render: ReactDOMServer.renderToString,
		title: (title) => `${title} - ${appName}`,
		resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
		setup: ({ App, props }) => {
			global.route = (name, params, absolute) =>
				route(name, params, absolute, {
					// @ts-expect-error
					...page.props.ziggy,
					// @ts-expect-error
					location: new URL(page.props.ziggy.location),
				});

			return <>
				<GlobalStyle />
				<ThemeProvider theme={ Theme }>
					<App {...props} />
				</ThemeProvider>
			</>
		},
	})
);
