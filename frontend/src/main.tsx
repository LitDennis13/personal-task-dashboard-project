import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./other/josh-comeau-css-reset.css";
import "./main.css";

import App from './components/App/App';
import ErrorPage from './components/error_page/error_page';
import NotFound from './components/not_found/not_found';
import Dashboard from './components/dashboard/dashboard';
import DashBoardRedirect from './components/dashboard_redirect/dashboard_redirect';
import PomodoroTimer from './components/pomodoro_timer/pomodoro_timer';
import TodoList from './components/todo_list/todo_list';
import Notes from './components/notes/notes';


const router = createBrowserRouter([
{
	path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
		{
			path: "/",
			element: <Dashboard />
		},
		{
		path: "/dashboard",
		element: <DashBoardRedirect />
		},
		{
			path: "/pomodoro-timer/",
			element: <PomodoroTimer />,
		},
		{
			path: "/todo-list",
			element: <TodoList />
		},
		{
			path: "/notes",
			element: <Notes />
		},
			{
			path: "*",
			element: <NotFound />
		}
	]
}
]);

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router}/>
		</QueryClientProvider>
	</StrictMode>
)