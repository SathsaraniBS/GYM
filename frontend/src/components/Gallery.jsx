import React from "react";

function Gallery() {

    const gallery = ["/img1.webp", "/img2.webp", "/img3.webp", "/img4.webp", "/img5.webp", "/img6.webp","/img7.jpg", "/img8.jpg", "/img9.jpg", "/img10.jpg", "/img11.jpg", "/img12.jpg"]
    return <section className="gallery">
        <h1>BETER BEATS BEST</h1>
        <div>
            {
                gallery.slice(0, 3).map((element, index) => (
                    <img key={index} src={element} alt="gallery image" />
                    )
                    
                )
            }
        </div>
        
        
    </section>;
}

export default Gallery;