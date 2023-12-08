// import ArLocal from "arlocal"
import { LoggerFactory, WarpFactory } from "warp-contracts"
import fs from "fs"
import path from "path"
import Arweave from "arweave"
;(async () => {
  const arweave = Arweave.init({
    host: "localhost",
    port: 1984,
    protocol: "http",
  })
  const __dirname = path.resolve()
  let initialState

  //   let arLocal = new ArLocal(1820, false)
  //   await arLocal.start()
  //   LoggerFactory.INST.logLevel("fatal")
  let warp = WarpFactory.forLocal(1984)
  //   let warp = WarpFactory.forLocal()

  let { jwk: ownerWallet, address: owner } = await warp.testing.generateWallet()

  console.log("NEW OWNER", owner)

  let { jwk: brand1Wallet, address: brand1 } =
    await warp.testing.generateWallet()

  let { jwk: brand2Wallet, address: brand2 } =
    await warp.testing.generateWallet()

  await arweave.api.get(
    `mint/Wt9B4MMXAwHFdm9k1sFgMNswh3KYyaY9TDjL8lGwxoA/10000000000000000`
  )

  const testTransaction = await arweave.createTransaction(
    { data: "USER DATA" },
    brand1Wallet
  )

  console.log("New Txn +++++++++++++", testTransaction)

  await arweave.transactions.sign(testTransaction, brand1Wallet)

  console.log("Signed +++++++++++++", testTransaction)

  await arweave.transactions.post(testTransaction)

  console.log("Posted+++++++++++++", testTransaction)

  //   let { contractTxId: uTxId } = await warp.createContract.deploy({
  //     wallet: ownerWallet,
  //     initState: fs.readFileSync(
  //       path.join(__dirname, "./src/contracts/utoken-initial-state.json"),
  //       "utf8"
  //     ),
  //     src: fs.readFileSync(
  //       path.join(__dirname, "./src/contracts/uToken.js"),
  //       "utf8"
  //     ),
  //   })
  //   console.log(uTxId)

  //   initialState = {
  //     uToken: uTxId,
  //     brands: [],
  //   }

  //   let contractSrc = fs.readFileSync(
  //     path.join(__dirname, "./src/contracts/contract.js"),
  //     "utf8"
  //   )
  //   console.log(contractSrc)

  //   let { contractTxId: contractId } = await warp.createContract.deploy({
  //     wallet: ownerWallet,
  //     initState: JSON.stringify(initialState),
  //     src: contractSrc,
  //   })

  //   console.log("Deployed contract: ", contractId)
  //   let adContract = warp.contract(contractId).connect(ownerWallet)
  //   let uTokenContract = warp.contract(uTxId).connect(ownerWallet)

  //   const contractTx = await warp.arweave.transactions.get(uTxId)
  //   //   console.log(contractTx)
  //   //   await arweave.api.get(`mint/${owner}/10000000000000000`)

  //   console.log("BEFORE WRITE ================")

  //   const writeResult = await uTokenContract.writeInteraction(
  //     {
  //       function: "mint",
  //       target: owner,
  //     },
  //     {
  //       disableBundling: true,
  //       reward: "10000000000", // 1 u (you can change this to whatever you want as long as its greater than `72600854` winston)
  //     }
  //   )

  //   console.log(writeResult)

  //   console.log("BEFORE WRITE ================")

  //   //   console.log(
  //   //     ">>>>>>>>>>>>>>>>>>>",
  //   //     await uTokenContract.readState({ function: "balance" })
  //   //   )
  //   //   const bal = await uTokenContract.balance()
  //   //   console.log(bal)
  //   const readResult = await uTokenContract.readState()
  //   console.log(readResult)
  //   const { cachedValue } = await uTokenContract.readState()
  //   console.log(cachedValue)

  //   it("Should Deploy Contract", async () => {
  //     const contractTx = await warp.arweave.transactions.get(contractId)
  //     expect(contractTx).not.toBeNull()
  //   })
  //   it("Should Set Initial State", async () => {
  //     let state = await blip.readState()
  //     expect(state.cachedValue.state).toEqual(initialState)
  //   })
  //   it("Should Create a Video", async () => {
  //     blip = warp.contract < BlipState > contractId.connect(brand1Wallet)
  //     const video: CreateVideoProps = {
  //       creatorAddress: brand1,
  //       transactionId: "test",
  //       title: "test",
  //       timestamp: 16347800,
  //       description: "test",
  //       thumbnail: "test",
  //       comments: [],
  //       reactions: [],
  //     }
  //     let res = await blip.writeInteraction({
  //       function: "createVideo",
  //       data: video,
  //     })
  //     console.log(res.originalTxId)
  //     let { cachedValue } = await blip.readState()
  //     let vid = cachedValue.state.videos.find(
  //       (v) => v.transactionId === video.transactionId
  //     )
  //     expect(vid).toMatchObject(video)
  //   })
  //   it("Should Like a Video", async () => {
  //     blip = warp.contract < BlipState > contractId.connect(brand2Wallet)
  //     let data: ReactionProps = {
  //       account: brand2,
  //       transactionId: "test",
  //       type: "like",
  //     }
  //     await blip.writeInteraction({
  //       function: "addReaction",
  //       data: data,
  //     })
  //     let { cachedValue } = await blip.readState()
  //     let vote = cachedValue.state.videos
  //       .find((v) => v.transactionId === data.transactionId)
  //       .reactions.find((v) => v.account === brand2)
  //     expect(vote.type).toEqual("like")
  //   })
  //   it("Should Remove a Reaction", async () => {
  //     blip = warp.contract < BlipState > contractId.connect(brand2Wallet)
  //     let data: ReactionProps = {
  //       account: brand2,
  //       transactionId: "test",
  //       type: "like",
  //     }
  //     await blip.writeInteraction({
  //       function: "removeReaction",
  //       data: data,
  //     })
  //     let { cachedValue } = await blip.readState()
  //     let vote = cachedValue.state.videos
  //       .find((v) => v.transactionId === data.transactionId)
  //       .reactions.find((v) => v.account === brand2)
  //     expect(vote).toEqual(undefined)
  //   })
  //   it("Should Dislike a Video", async () => {
  //     blip = warp.contract < BlipState > contractId.connect(brand2Wallet)
  //     let data: ReactionProps = {
  //       account: brand2,
  //       transactionId: "test",
  //       type: "dislike",
  //     }
  //     await blip.writeInteraction({
  //       function: "addReaction",
  //       data: data,
  //     })
  //     let { cachedValue } = await blip.readState()
  //     let vote = cachedValue.state.videos
  //       .find((v) => v.transactionId === data.transactionId)
  //       .reactions.find((v) => v.account === brand2)
  //     expect(vote.type).toEqual("dislike")
  //   })
  //   it("Should Reject Add Like if already voted", async () => {
  //     blip = warp.contract < BlipState > contractId.connect(brand2Wallet)
  //     let data: ReactionProps = {
  //       account: brand2,
  //       transactionId: "test",
  //       type: "like",
  //     }
  //     await expect(
  //       blip.writeInteraction(
  //         {
  //           function: "addReaction",
  //           data: data,
  //         },
  //         { strict: true }
  //       )
  //     ).rejects.toThrowError(
  //       `Cannot create interaction: Error: Video with txId ${data.transactionId} has already been reacted on by ${brand2}`
  //     )
  //   })
  //   it("Should Add Comment", async () => {
  //     blip = warp.contract < BlipState > contractId.connect(brand2Wallet)
  //     let data: Comment = {
  //       account: brand2,
  //       content: "test comment",
  //       timestamp: 123,
  //     }
  //     await blip.writeInteraction({
  //       function: "comment",
  //       data: { ...data, transactionId: "test" },
  //     })
  //     let { cachedValue } = await blip.readState()
  //     let comment = cachedValue.state.videos
  //       .find((v) => v.transactionId === "test")
  //       .comments.find(
  //         (v) => v.account === brand2 && v.timestamp === data.timestamp
  //       )
  //     expect(comment).toMatchObject(data)
  //   })
})()
