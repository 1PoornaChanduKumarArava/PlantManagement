import { createStore } from "redux"

const initialState={
    LoginState:0,
    Countries:[],
}

function reducer1(state=initialState,action:{type:string,payload:any}){
    switch(action.type){
        case "LOGIN_STATE":
            return {...state,LoginState:action.payload}
        case "COUNTRIES":
            return {...state,Countries:action.payload}
        default :
            return {...state}
    }
}


const store1= createStore(reducer1);
export default store1