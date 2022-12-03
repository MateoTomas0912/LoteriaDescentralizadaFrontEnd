import { useEffect } from "react";
import { useMoralis } from "react-moralis"

export default function Home(){

    const {enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3, isWeb3EnableLoading} = useMoralis();

    useEffect(() => {
        if(isWeb3Enabled) return;
        if(typeof window !== "undefined"){
            if(window.localStorage.getItem("connected")){
                enableWeb3();
            }
        }
    }, [isWeb3Enabled])

    useEffect(()=> {
        Moralis.onAccountChanged((account) => {
            if(account == null){
                window.localStorage.removeItem("connected");
                deactivateWeb3();
            }
        })
    })

    return (<div>
        {account ? (<div>Conectado a {account}</div>) : 
        (<button onClick={async () => 
            {await enableWeb3(); 
                if(typeof window !== "undefined"){
                    window.localStorage.setItem("connected", "injected");
                }
        }}
        disabled = {isWeb3EnableLoading}
        >Connect</button>)}
        </div>)
}