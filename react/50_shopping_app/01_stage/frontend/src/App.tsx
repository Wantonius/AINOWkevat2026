import useAction from './hooks/useAction';
import ShoppingForm from './components/ShoppingForm';
import Navbar from './components/Navbar';
function App() {

	const {add} = useAction()

	return (
		<>
			<Navbar/>
			<ShoppingForm add={add}/>
		</>
	)
}

export default App
