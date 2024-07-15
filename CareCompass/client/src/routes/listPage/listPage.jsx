import React, { Suspense } from 'react';
import Filter from '../../components/filter/Filter';
import Card from "../../components/card/Card";
import Map_component from "../../components/map/Map"
import "./listPage.css";
import { Await, useLoaderData } from 'react-router-dom';

function listPage() {
  const data = useLoaderData();
  return (
    <div className="listPage">
      <div className="listContain">
        <div className="wrapper">
          <Filter />
          <Suspense fallback={<p>Loading...</p>}>
            <Await 
            resolve={data.postResponse}
            errorElement={<p>Something went wrong</p>} >
            {(postResponse) => (
              postResponse.data.map(item => (
                        <Card key={item.id} item={item} />
                      ))
          )}
          </Await>
          </Suspense>
        </div>
      </div>
      <div className="mapContain">
      <Suspense fallback={<p>Loading...</p>}>
            <Await 
            resolve={data.postResponse}
            errorElement={<p>Something went wrong</p>} >
            {(postResponse) => (
              (<Map_component hospitals={postResponse.data}/>)
          )}
          </Await>
          </Suspense>
      </div>
    </div>
  )
}

export default listPage