'use client';

import { useState } from "react";

export default function Main(){
    const [key, setKey] = useState("");
    const [date, setDate] = useState("");
    const [unlocked, setUnlocked] = useState<string[]>([]);
    const [isFetching, setIsFetching] = useState(false);
    return (
        <div className="flex flex-col justify-center items-center gap-1 md:gap-1.5 lg:gap-2 w-full h-full">
            <div className="flex flex-row justify-center items-center gap-1 md:gap-1.5 lg:gap-2 w-full">
                <input disabled={isFetching} type="text" id="key" placeholder="Key" value={key} onChange={e => setKey(e.target.value)} />
                <input disabled={isFetching} type="date" id="date" placeholder="Date" value={date} onChange={e => setDate(e.target.value)} />
                <input disabled={isFetching} type="text" id="unlocked" placeholder="Unlocked" value={unlocked.join(',')} onChange={e => setUnlocked(e.target.value.split(',').map(v => v.trim()))} />
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
                            unlocked
                        })
                    }).then(async res => {
                        setIsFetching(false);
                        setKey("");
                        setDate("");
                        setUnlocked([]);
                        if (res.status === 401) {
                            alert("Already Exists");
                        } else if (res.status === 200) {
                            alert("Token generated");
                        }
                    });
                }}>Generate</button>
            </div>
        </div>
    )
}