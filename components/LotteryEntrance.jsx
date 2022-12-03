import { useEffect, useState } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis"
import {abi, contractAdresses} from "../constants"
import {ethers} from "ethers"
import { useNotification } from "web3uikit";

export default function LotteryEntrance(){
    const { isWeb3Enabled, chainId: chainIdHex } = useMoralis()
    const chainId = parseInt(chainIdHex)
    console.log(chainId)
    const raffleAddress = chainId in contractAdresses ? contractAdresses[chainId][0] : null
    const [entranceFee, setEntranceFee] = useState("0")
    const [numberPlayers, setNumberOfPlayers] = useState("0")
    const [recentWinner, setRecentWinner] = useState("0")

    const dispatch = useNotification()

    const {runContractFunction : enterRaffle , isLoading, isFetching} = useWeb3Contract(
        {
            abi: abi,
            contractAddress: raffleAddress,
            functionName:"enterRaffle",
            params:{},
            msgValue: entranceFee
        }
    )

    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress, // specify the networkId
        functionName: "getEntranceFee",
        params: {},
    })

    const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress, // specify the networkId
        functionName: "getNumPlayers",
        params: {},
    })

    const { runContractFunction: getRecentWinner } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress, // specify the networkId
        functionName: "getRecentWinner",
        params: {},
    })

    async function updateUI(){
        const entranceFeeFromCall = (await getEntranceFee()).toString()
        const numPlayers = (await getNumberOfPlayers()).toString(); 
        const recentWinner = (await getRecentWinner()).toString();
        setEntranceFee(entranceFeeFromCall)
        setNumberOfPlayers(numPlayers);
        setRecentWinner(recentWinner);
    }

    useEffect(() => {
        if(isWeb3Enabled){
            updateUI();
        }
    }, [isWeb3Enabled])

    const handleSuccess = async function(tx){
        await tx.wait(1)
        handleNewNotification(tx)
        updateUI();
    }

    const handleNewNotification = function (){
        dispatch({
            type:"info",
            message: "Transaccion completada!",
            title: "Notificacion Tx",
            position: "topR",
            icon:"bell"
        })
    }

    return (
        <div>
            {raffleAddress ? (
                <div>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
                        onClick={async () =>
                            await enterRaffle({
                                onSuccess: handleSuccess,
                                onError: (error) => console.log(error),
                            })
                        }
                        disabled={isLoading || isFetching}
                    >
                        {isLoading || isFetching ? (
                            <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                        ) : (
                            "Entrar a la loteria"
                        )}
                    </button>
                    <div>La entrance fee es: {ethers.utils.formatUnits(entranceFee,"ether")} ETH</div>
                    <div>Numero de jugadores: {numberPlayers}</div>
                    <div>Ultimo ganador: {recentWinner} </div>
                </div>
                ) :
            <div>
                No se detecto la direccion
            </div>    
        }
            
        </div>
    )
} 