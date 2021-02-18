import {createContext, useContext} from 'react'


const Context = createContext({
    currentContext: null,
    isAuth: false,
    draft: null
})

export default Context