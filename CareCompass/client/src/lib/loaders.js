import apiRequest from "./apiRequest"
import {defer} from "react-router-dom"

export const singlePageLoader = async ({request, params}) => {
 const res = await apiRequest("/post/"+params.id)
 return res.data;
}

export const googleSinglePageLoader = async ({request, params}) => {
   const res = await apiRequest("/googledata/g/"+params.id)
   console.log(res)
   return res.data;
}


export const listPageLoader = async ({request, params}) => {
   const query = request.url.split("?")[1];
   const postPromise = await apiRequest("/post?" + query); 
   return defer({
    postResponse:postPromise
   })
}