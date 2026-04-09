import ContactForm from './components/ContactForm';
import Person from './models/Person';
import {useState} from 'react';

interface State {
	greeting:string;
}

function App() {

	const [state,setState] = useState<State>({
		greeting:"No greeting yet"
	})
	
	const setGreeting = (person:Person) => {
		setState({
			greeting:"Hello "+person.firstname+" "+person.lastname
		})
	}

	return (
		<>
			<ContactForm setGreeting={setGreeting}/>
			<h2>{state.greeting}</h2>
		</>
	)
}

export default App
