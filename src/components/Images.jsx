import { useEffect, useState } from "react";

const ImagesScroll = ()=>{
  let apiKey = 'K8UXfWbYDjyvuamVEYwonWn4Hs1nW9FV2n7J8HwBO60' ;
  const[page,setPage] = useState(1);
  const[img,setImg] = useState([]) ;
  const url = `https://api.unsplash.com/photos/?client_id=${apiKey}&page=${page}&per_page=10`;


//Fetching images
async function getImages(){
    try{
    
    let response = await fetch(url);
    let data = await response.json();
    setImg((prevImg)=>[...prevImg, ...data]);
   
} catch(err){
    console.log('Error',err);
  
}
}
//Handling scroll
const handleScroll = ()=>{
    if((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 200){
        setPage(prevPage => prevPage + 1);
        getImages();
    }
}
//Fetching images on mounting phase
  useEffect(()=>{
       getImages();
},[])

//Fetching images on every scroll event
useEffect(()=>{
    window.addEventListener('scroll' , handleScroll);
    return() =>{
        window.removeEventListener('scroll',handleScroll);
    }
},[handleScroll]) 
    return(
        <>
            {
                img.map((images)=>{
                    return(
                        <div key={images.id} className="imageCont">
                            <img  src={images.urls.small} alt={images.description} />
                            <p>{images.description}</p>
                        </div>
                    )
                })
            }
        </>
    ) ;
} ;
export default ImagesScroll ;