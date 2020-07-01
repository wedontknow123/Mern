import React,{Component,createContext} from 'react';

export const GlobalContext=createContext();

class GlobalContextProvider extends Component{
    state={
        username:''
    }
    gety=(a)=>{
        this.setState({
            username:a
        })
        console.log(this.state.username)
    }
    
    render(){
        return(
            <GlobalContext.Provider value={{gety:this.gety}}>
                {this.props.children}
            </GlobalContext.Provider>
        );
    }
}

export default GlobalContextProvider;