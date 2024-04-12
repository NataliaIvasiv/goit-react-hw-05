import ImageCard from "../ImageCard/ImageCard";
import css from './ImageGallery.module.css'

const ImageGallery = ({ images, handleImageClick}) => {
    return(
    <ul className={css.imageGalleryList}>
            {images.map((image) => 
                <li className={css.imageGalleryItem} key={image.id}>
                    <ImageCard image={image} handleImageClick={handleImageClick } />
                </li>
            )
            }
    </ul>
    )
}
export default ImageGallery;