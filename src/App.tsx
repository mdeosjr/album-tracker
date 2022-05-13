import { apiToken } from './services/apiToken'

function App() {
	const token = apiToken()
	console.log(token)
	
	return <h1>{token}</h1>
}

export default App
