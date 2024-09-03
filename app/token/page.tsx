'use client';

import { useEffect, useState } from "react";

export default function Main(){
    const [tokens, setTokens] = useState<Token[]>([]);
    const [once, setOnce] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [key, setKey] = useState("");
    const [date, setDate] = useState("");
    const [perms, setPerms] = useState<string[]>([]);
    
    const refresh =() => {
        if(isFetching) return;
        setIsFetching(true);
        fetch('/api/gettokens')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setTokens(data);
            setIsFetching(false);
        })
        .catch(err => {
            console.error(err);
            setIsFetching(false);
        });
    }
    useEffect(() => setOnce(true), []);
    useEffect(() => {
        if(!once) return;
        refresh();
    }, [once]);
    return (
        <div className="flex flex-col justify-start items-center gap-1 md:gap-1.5 lg:gap-2 w-full h-full overflow-x-hidden overflow-y-auto p-2">
            <div className="flex flex-row justify-center items-center gap-1 md:gap-1.5 lg:gap-2 w-full">
                <input disabled={isFetching} type="text" id="key" placeholder="Key" value={key} onChange={e => setKey(e.target.value)} />
                <input disabled={isFetching} type="date" id="date" placeholder="Date" value={date} onChange={e => setDate(e.target.value)} />
                <input disabled={isFetching} type="text" id="perms" placeholder="Perms" value={perms.join(',')} onChange={e => setPerms(e.target.value.split(',').map(v => v.trim()))} />
                <button disabled={isFetching} onClick={e => {
                    setIsFetching(true);
                    fetch("/api/generate", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            key,
                            expiration: new Date(date).getTime(),
                            perms
                        })
                    }).then(async res => {
                        setIsFetching(false);
                        setKey("");
                        setDate("");
                        setPerms([]);
                        if (res.status === 401) {
                            alert("Already Exists");
                        } else if (res.status === 200) {
                            alert("Token generated");
                        }
                        refresh();
                    });
                }}>Generate</button>
            </div>
            <button disabled={isFetching} className="w-full p-2 rounded-md" onClick={e => refresh()}>Refresh</button>
            {tokens.map((token, i) => {
                const expireDateString = new Date(token.expiration).toLocaleString();
                return <div key={i} className="flex flex-row justify-center items-center gap-1 md:gap-1.5 lg:gap-2 w-full p-1 md:p-1.5 lg:p-2 bg-gray-800 rounded-md">
                    <div className="font-bold">{token.key}</div>
                    <div className="font-bold">{expireDateString}</div>
                    <div className="w-full">{token.perms.join(',')}</div>
                    <button disabled={isFetching}>Edit</button>
                    <button disabled={isFetching} onClick={e => {
                        if(isFetching) return;
                        setIsFetching(true);
                        fetch('/api/delete', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({key: token.key})
                        })
                        .then(res => res.json())
                        .then(data => {
                            if(data.success) refresh();
                            setIsFetching(false);
                        })
                        .catch(err => {
                            console.error(err);
                            setIsFetching(false);
                        });
                    }}>Delete</button>
                </div>
            })}
        </div>
    )
}