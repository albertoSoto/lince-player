import React from 'react'
import HelloWorld from './lib'
import HelloWorldTS from "./lib/components/HelloWorldTS";

const App = () => {
    return (
        <>
            <HelloWorld greetee={'Universe'}/>
            <HelloWorldTS title={"what a cool ts component"} ></HelloWorldTS>
        </>
    )
}

export default App
