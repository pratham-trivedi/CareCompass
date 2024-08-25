import React from 'react'

import Card from '../card/Card'
import "./list.css"

function List({listData}) {
  console.log(listData);
  return (
    <div className="list">
        {listData && listData.map(item => (
            <Card key={item.id} item={item}/>
        ))}
    </div>
  )
}

export default List