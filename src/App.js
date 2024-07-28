import React, { useState } from 'react';
import { getSettings, getStateInstance, sendMessage, sendFileByUrl } from './api';

function App() {
    const idInstanceKey = 'idInstance';
    const apiTokenInstanceKey = 'apiTokenInstance';
    const [idInstance, setIdInstanceState] = useState(() => localStorage.getItem(idInstanceKey) || '');
    const [apiTokenInstance, setApiTokenInstanceState] = useState(() => localStorage.getItem(apiTokenInstanceKey) || '');
    const [messagePhone, setMessagePhone] = useState(() => '');
    const [message, setMessage] = useState(() => '');
    const [urlFilePhone, setUrlFilePhone] = useState(() => '');
    const [urlFile, setUrlFile] = useState(() => '');
    const [result, setResult] = useState('');

    const setIdInstance = (val) => {
        setIdInstanceState(val);
        localStorage.setItem(idInstanceKey, val);
    };

    const setApiTokenInstance = async (val) => {
        setApiTokenInstanceState(val);
        localStorage.setItem(apiTokenInstanceKey, val);
    };

    const handleGetSettings = async () => {
        setResult(await getSettings(idInstance, apiTokenInstance));
    };

    const handleGetStateInstance = async () => {
        setResult(await getStateInstance(idInstance, apiTokenInstance));
    };

    const handleSendMessage = async () => {
        setResult(await sendMessage(idInstance, apiTokenInstance, message, messagePhone));
    };

    const handleSendFileByUrl = async () => {
        setResult(await sendFileByUrl(idInstance, apiTokenInstance, urlFile, urlFilePhone));
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">GREEN-API Test Page</h1>
            <div className="flex">
                <div className="w-1/2 pr-2">
                    <input
                        type="text"
                        className="border p-2 w-full mb-4"
                        placeholder="ID Instance"
                        value={idInstance}
                        onChange={(e) => setIdInstance(e.target.value)}
                    />
                    <input
                        type="text"
                        className="border p-2 w-full mb-4"
                        placeholder="API Token Instance"
                        value={apiTokenInstance}
                        onChange={(e) => setApiTokenInstance(e.target.value)}
                    />

                    <button
                        className="bg-blue-500 text-white p-2 w-full mb-2 mt-10"
                        onClick={handleGetSettings}
                    >
                        getSettings
                    </button>
                    <button
                        className="bg-blue-500 text-white p-2 w-full mb-2"
                        onClick={handleGetStateInstance}
                    >
                        getStateInstance
                    </button>

                    <input
                        type="text"
                        className="border p-2 w-full mb-4 mt-10"
                        placeholder="Message Phone"
                        value={messagePhone}
                        onChange={(e) => setMessagePhone(e.target.value)}
                    />
                    <input
                        type="text"
                        className="border p-2 w-full mb-4"
                        placeholder="Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button
                        className="bg-blue-500 text-white p-2 w-full mb-2"
                        onClick={handleSendMessage}
                    >
                        sendMessage
                    </button>

                    <input
                        type="text"
                        className="border p-2 w-full mb-4 mt-10"
                        placeholder="File Phone"
                        value={urlFilePhone}
                        onChange={(e) => setUrlFilePhone(e.target.value)}
                    />
                    <input
                        type="text"
                        className="border p-2 w-full mb-4"
                        placeholder="File Url"
                        value={urlFile}
                        onChange={(e) => setUrlFile(e.target.value)}
                    />
                    <button
                        className="bg-blue-500 text-white p-2 w-full mb-2"
                        onClick={handleSendFileByUrl}
                    >
                        sendFileByUrl
                    </button>
                </div>
                <div className="w-1/2 pl-2">
                    <h2 className="text-xl font-bold mb-2">Ответ:</h2>
                    <pre className="bg-gray-100 p-4 mt-4 break-words whitespace-pre-wrap">{result}</pre>
                </div>
            </div>
        </div>
    );
}

export default App;