import React from "react";

function Gallery() {

    const gallery = ["public/img1.webp", "public/img2.webp", "public/img3.webp", "public/img4.webp", "public/img5.webp", "public/img6.webp","public/img7.jpg", "public/img8.jpg", "public/img9.jpg", "public/img10.jpg", "public/img11.jpg", "public/img12.jpg"]
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