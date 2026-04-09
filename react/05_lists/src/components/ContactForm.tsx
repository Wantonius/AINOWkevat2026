import React,{useState} from 'react';
import Contact from '../models/Contact';

interface State {
	firstname:string;
	lastname:string;
	email:string;
	phone:string;
}

interface Props {
	addContact(contact:Contact):void;
}

const ContactForm = (props:Props) => {
	
	const [state,setState] = useState<State>({
		firstname:"",
		lastname:"",
		email:"",
		phone:""
	})
	
	const onChange = (event:React.ChangeEvent<HTMLInputElement>) => {
		setState((state) => {
			return {
				...state,
				[event.target.name]:event.target.value
			}
		})
	}
	
	const onSubmit = (event:React.SyntheticEvent) => {
		event.preventDefault();
		if(state.firstname === "" || state.lastname === "") {
			return;
		}
		const contact = new Contact(state.firstname,state.lastname,state.email,state.phone,0)
		props.addContact(contact);
		setState({
			firstname:"",
			lastname:"",
			email:"",
			phone:""
		})
	}
	return(
		<form onSubmit={onSubmit}>
			<label htmlFor="firstname">First Name</label>
			<input type="text"
					name="firstname"
					id="firstname"
					value={state.firstname}
					onChange={onChange}/>
			<br/>
			<label htmlFor="lastname">Last Name</label>
			<input type="text"
					name="lastname"
					id="lastname"
					value={state.lastname}
					onChange={onChange}/>
			<br/>
			<label htmlFor="email">Email</label>
			<input type="email"
					name="email"
					id="email"
					value={state.email}
					onChange={onChange}/>
			<br/>
			<label htmlFor="phone">Phone</label>
			<input type="tel"
					name="phone"
					id="phone"
					value={state.phone}
					onChange={onChange}/>
			<br/>
			<input type="submit" value="Add"/>
		</form>
	
	)
}

export default ContactForm;