'use client';

import { useEffect, useState } from "react";

export default function Main(){
    const [tokens, setTokens] = useState<Token[]>([]);
    const [once, setOnce] = useState(false);
    
    const refresh =() => {
        fetch('/api/get')
        .then(res => res.json())
        .then(data => setTokens(data))
        .catch(err => console.error(err));
    }
    useEffect(() => setOnce(true), []);
    useEffect(() => {
        if(!once) return;
        refresh();
    }, [once]);
    return (
        <div className="flex flex-col justify-start items-center gap-1 md:gap-1.5 lg:gap-2 w-full h-full overflow-x-hidden overflow-y-auto p-2">
            <button className="w-full p-2 rounded-md" onClick={e => refresh()}>Refresh</button>
            {tokens.map((token, i) => {
                const expireDateString = new Date(token.expiration).toLocaleString();
                return <div key={i} className="flex flex-row justify-center items-center gap-1 md:gap-1.5 lg:gap-2 w-full p-1 md:p-1.5 lg:p-2 bg-gray-800 rounded-md">
                    <div className="font-bold">{token.key}</div>
                    <div className="font-bold">{expireDateString}</div>
                    <div className="w-full">{token.perms.join(',')}</div>
                </div>
            })}
        </div>
    )
}