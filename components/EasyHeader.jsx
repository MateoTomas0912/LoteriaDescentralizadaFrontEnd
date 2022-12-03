import {ConnectButton} from "web3uikit"

export default function Header(){
    return(
        <div className="p-5 flex flex-row border-b-2">
            <h1 className="py-4 px-4 font-blog text-3xl">Loteria descentralizada</h1>
            <div className="ml-auto py-2 px-4">
                <ConnectButton moralisAuth = {false}></ConnectButton>
            </div>
        </div>
    )
}