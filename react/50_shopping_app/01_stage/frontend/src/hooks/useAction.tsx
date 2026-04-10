import {useState,useEffect} from 'react';
import ShoppingItem  from '../models/ShoppingItem';

interface State {
	list:ShoppingItem[];
}

interface UrlRequest {
	request:Request;
	action:string;
}

const useAction = () => {
	
	const [state,setState] = useState<State>({
		list:[]
	})
	
	const [urlRequest,setUrlRequest] = useState<UrlRequest>({
		request:new Request({},""),
		action:""
	})
	
	useEffect(() => {},[urlRequest]);
	
	const getList = () => {
		
	}
	
	const add = (item:ShoppingItem) => {
		
	}
	
	const remove = (id:number) => {
		
	}
	
	const edit = (item:ShoppingItem) => {
		
	}
	
	return {state,add,remove,edit}
}

export default useAction;