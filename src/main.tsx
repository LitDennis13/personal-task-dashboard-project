import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./other/josh-comeau-css-reset.css";
import "./main.css";
import PageLayout from './components/page_layout/page_layout'


createRoot(document.getElementById('root')!).render(
  	<StrictMode>
		<PageLayout />
  	</StrictMode>,
)