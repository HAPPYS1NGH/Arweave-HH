import { ConnectButton } from "arweave-wallet-kit"


function Brand() {
    return (
        <div className="flex h-full">
            <div className="bg-black text-white">
                <div>
                    <h1>PermaAds</h1>
                    <h2>Ads on Arweave</h2>
                </div>
                <ConnectButton />
            </div>
        </div>
    )
}

export default Brand