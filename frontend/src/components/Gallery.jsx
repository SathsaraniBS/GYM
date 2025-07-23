import React from "react";

function Gallery() {

    const gallery = ["public/images/img1.webp", "public/images/img2.webp", "public/images/img3.webp", "public/images/img4.webp", "public/images/img5.webp", "public/images/img6.webp","public/images/img7.jpg", "public/images/img8.jpg", "public/images/img9.jpg", "public/images/img10.jpg", "public/images/img11.jpg", "public/images/img12.jpg"]
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