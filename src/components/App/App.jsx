import { useState, useEffect } from "react";
import fetchApi from "../../api/api";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import toast, { Toaster } from 'react-hot-toast';
import ErrorMessage from "../ErrorMessage/ErrorMessage";




const App = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [numberOfPage, setNumberOfPage] = useState(0);
    const [modalIsOpen, setModalIsOpen] = useState(false);


    const loadImages = async (query, currentPage) => {
         if (!query) {
      return;
    }
        try {
            setLoading(true);
            const img = await fetchApi(query, currentPage);
            setNumberOfPage(img.data.total_pages)
            const newImages = img.data.results;
            if (img.data.total_pages === 0) {
                toast.error('Sorry... there are no images for your search')
            }
            setImages((prevImages) => prevImages.concat(newImages));

        }
        catch {
            setIsError(true)
        }
        finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        loadImages(searchValue, currentPage)
    }, [searchValue, currentPage]);

    const handleSearch = (searchValue) => {
        setImages([]);
        setSearchValue(searchValue);
    }
    const handleLoadMore = () => {
        setCurrentPage(currentPage + 1);
    }
    

    const [modalData, setModalData] = useState({
    imageSrc: "",
    imageAltDescription: "",
    imageDescription: "",
    imageAuthor: "",
    imageLikes: 0,
    });
    const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    };
    
    const handleImageClick = (imageData) => {
    setModalData(imageData);
    openModal();
  };


    return (
        <section>
        <SearchBar 
                onSearch={handleSearch} />
        <Toaster toastOptions={{
                className: '',
                error:{style: {
        
        border: '1px solid #713200',
        fontWeight: '500',
        fontSize: '20px',
      padding: '16px',
        color: 'red',
        background: 'grey'},
                },
  }}/>
            
            {images && <ImageGallery images={images} handleImageClick={handleImageClick} />}
            {loading && <Loader/>}
            {isError && <ErrorMessage/>}
            {images.length > 0 && currentPage < numberOfPage && <LoadMoreBtn onLoadMore={handleLoadMore} />}
           
        <ImageModal
        closeModal={closeModal}
        modalIsOpen={modalIsOpen}
        {...modalData}
      />
        </section>
    )

};

export default App;