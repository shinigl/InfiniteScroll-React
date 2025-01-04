import { useEffect, useState } from "react";

const ImagesScroll = () => {
  const apiKey = 'K8UXfWbYDjyvuamVEYwonWn4Hs1nW9FV2n7J8HwBO60';
  const [page, setPage] = useState(1);
  const [img, setImg] = useState([]);
  const [loader, setLoader] = useState(false); // Track loader state

  // Fetch images function
  const getImages = async () => {
    setLoader(true); // Show loader when fetching images
    try {
      const response = await fetch(`https://api.unsplash.com/photos/?client_id=${apiKey}&page=${page}&per_page=10`);
      const data = await response.json();
      setImg((prevImg) => [...prevImg, ...data]);
    } catch (err) {
      console.log('Error:', err);
    } finally {
      setLoader(false); // Hide loader once fetching is complete
    }
  };

  // Handle scroll and load more images
  const handleScroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 200) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // Fetch images on page mount
  useEffect(() => {
    getImages();
  }, []);

  // Fetch images whenever `page` changes
  useEffect(() => {
    getImages();
  }, [page]);

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Infinite Scroll</h1>
      <div className="container">
        {img.map((image) => (
          <div key={image.id} className="imageCont">
            <a href={image.links.html} target="_blank" rel="noopener noreferrer">
              <img src={image.urls.small} alt={image.description || "Image"} />
            </a>
            <p>{image.description}</p>
          </div>
        ))}
      </div>

      {/* Loader Section */}
      {loader && (
        <div className="loader">
          <div className="spinner"></div>
        </div>
      )}
    </>
  );
};

export default ImagesScroll;
