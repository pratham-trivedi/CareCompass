import React from 'react'
import {listData} from "../../lib/dummudata"
import Card from '../card/Card'
import "./list.css"

function List() {
  return (
    <div className="list">
        {listData.map(item => (
            <Card key={item.id} item={item}/>
        ))}
    </div>
  )
}

export default List