import React from 'react'

function GlobalFilter({ filter, setFilter }){
    return (
        <div>
            <input className="form-control" placeholder="Search" value={filter || ''} onChange={(event) => setFilter(event.target.value)} />
        </div>
    )
}

export default GlobalFilter