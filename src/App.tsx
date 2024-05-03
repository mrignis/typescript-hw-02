// Передаємо замість ImageCardProps, ImageGalleryProps
import React from "react";
import ImageGallery from "../ImageGallery/ImageGallery";
import styles from "./App.module.css";
import { Image } from "../types"; // Імпорт типу Image
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import SearchBar from "../SearchBar/SearchBar";
import ImageModal from "../ImageModal/ImageModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "https://api.unsplash.com/search/photos";
const IMAGES_PER_PAGE = 20;
const API_KEY = "8mcRsNbjAwUXJlUgEJzbvpLMrGD8KOZY1sMb-0IBjCk";

const App: React.FC = () => {
  const [query, setQuery] = React.useState<string>("");
  const [images, setImages] = React.useState<Image[]>([]);
  const [page, setPage] = React.useState<number>(1);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [modalImage, setModalImage] = React.useState<Image | null>(null);

  const handleSearch = async (searchQuery: string): Promise<void> => {
    setQuery(searchQuery);
    setPage(1);
  };

  const handleLoadMore = (): void => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleImageClick = (image: Image): void => {
    setModalImage(image);
  };

  const handleCloseModal = (): void => {
    setModalImage(null);
  };

  React.useEffect(() => {
    const fetchData = async (): Promise<void> => {
      if (query) {
        setIsLoading(true);
        try {
          const response = await fetch(
            `${API_URL}?query=${query}&page=${page}&per_page=${IMAGES_PER_PAGE}&client_id=${API_KEY}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch images");
          }
          const data = await response.json();
          if (page === 1) {
            setImages(data.results);
          } else {
            setImages((prevImages) => [...prevImages, ...data.results]);
          }
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching images:", error);
          setIsLoading(false);
          setError("Error fetching images. Please try again later.");
        }
      }
    };

    fetchData();
  }, [query, page]);

  return (
    <div className={styles.app}>
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {images.length > 0 && <ImageGallery images={images} onImageClick={handleImageClick} />}
      {images.length > 0 && <LoadMoreBtn onLoadMore={handleLoadMore} />}
      {error && <ErrorMessage message={error} />}
      {modalImage && <ImageModal isOpen={!!modalImage} image={modalImage} onClose={handleCloseModal} />}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export default App;
