'use client'
import React, { useState } from 'react';
import Arweave from "arweave"
import keyfile from "../../wallet.json"

import { ConnectButton, useConnection } from "arweave-wallet-kit";
import { createTransaction, signTransaction, postTransaction } from 'arweavekit/transaction'

export default function IndexPage() {
  console.log(keyfile)
  const { connected, connect, disconnect } = useConnection();
  const [initialTimestamp, setInitialTimestamp] = useState(null);
  const [arrayBuffer, setArrayBuffer] = useState(null);

  const arweave = Arweave.init({
    host: "localhost",
    port: 1984,
    protocol: "http",
  })

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      // Create a FileReader
      const reader = new FileReader();

      // Set up the onload event handler
      reader.onload = function (e) {
        // e.target.result contains the ArrayBuffer
        const fileArrayBuffer = e.target.result;

        // Set the ArrayBuffer in the state
        setArrayBuffer(fileArrayBuffer);

        // Display or use the ArrayBuffer as needed
        console.log('ArrayBuffer:', fileArrayBuffer);
      };

      // Read the file as ArrayBuffer
      reader.readAsArrayBuffer(selectedFile);
    }
  };

  const handlePayNow = async () => {
    if (arrayBuffer) {
      await arweave.api.get(
        `mint/Wt9B4MMXAwHFdm9k1sFgMNswh3KYyaY9TDjL8lGwxoA/10000000000000000`
      )
      const transaction = await createTransaction({
        type: 'data',
        environment: 'local',
        data: arrayBuffer,
      });

      // You can perform actions with the selected file, such as uploading to a server
      console.log('Selected File:', transaction);

      const signedTransaction = await signTransaction({
        environment: 'local',
        createdTransaction: transaction,
      }
      )
      const postedTransaction = await postTransaction({
        transaction: signedTransaction,
        environment: 'local',
      });
      console.log(postedTransaction)
    } else {
      alert('Please select a file to upload.');
    }
  };
  const handleAd = async () => {
    if (arrayBuffer) {
      if (arrayBuffer.byteLength / 1024 > 100) {
      }

      const transaction = await createTransaction({
        type: 'data',
        key: keyfile,
        environment: 'local',
        data: arrayBuffer,
      });

      // You can perform actions with the selected file, such as uploading to a server
      console.log('Selected File:', transaction);

      const signedTransaction = await signTransaction({
        key: keyfile,
        environment: 'local',
        createdTransaction: transaction,
      }
      )

      const postedTransaction = await postTransaction({
        key: keyfile,
        transaction: signedTransaction,
        environment: 'local',
      });
    } else {
      alert('Please select a file to upload.');
    }
  }

  return (
    <div className="flex">
      {
        !connected ?
          <section className="container flex justify-center items-center py-96  gap-4 h-84 w-full">
            <h1>Get Unlimited Permaent Storage</h1>
            <ConnectButton />
          </section>
          :
          <section className="container  justify-center items-center py-8 gap-4 h-84 w-full">
            <div className='flex justify-end'>
              <ConnectButton />
            </div>
            <div className='p-10 '>
              <h1 className='text-3xl font-bold pb-10'>Upload Your File</h1>
              <input type='file' placeholder="Your Name" onChange={handleFileChange} />
              <div>
                <button onClick={handlePayNow} className='px-4 py-2 rounded-lg mt-4 mr-4 bg-black text-white'>Pay Now</button>
                <button onClick={handleAd} className='px-4 py-2 rounded-lg mt-4 bg-black text-white'>Do it for free</button>
              </div>
            </div>
          </section>
      }
    </div>
  );
}
