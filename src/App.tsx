// App.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import isEnglish from "is-english";
import "./App.css";

import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
interface Image {
  id: string;
  urls: {
    regular: string;
    small: string;
  };
  alt_description: string;
  user: {
    name: string;
  };
  views: number;
}

const API_URL = "https://api.unsplash.com/search/photos";
const IMAGES_PER_PAGE = 20;
const API_KEY = "8mcRsNbjAwUXJlUgEJzbvpLMrGD8KOZY1sMb-0IBjCk";

const App: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [images, setImages] = useState<Image[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [modalImage, setModalImage] = useState<Image | null>(null);

  const handleSearch = async (searchQuery: string) => {
    if (!isEnglish(searchQuery)) {
      setError("Please enter an English word.");
      return;
    }

    setQuery(searchQuery);
    setPage(1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (query) {
          setIsLoading(true);
          const { data } = await axios.get(
            `${API_URL}?query=${query}&page=${page}&per_page=${IMAGES_PER_PAGE}&client_id=${API_KEY}`
          );
          if (page === 1) {
            setImages(data.results);
          } else {
            setImages((prevImages) => [...prevImages, ...data.results]);
          }
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
        setIsLoading(false);
        toast.error("Error fetching images. Please try again later.");
      }
    };

    fetchData();
  }, [query, page]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleImageClick = (image: Image) => {
    setModalImage(image);
  };

  const handleCloseModal = () => {
    setModalImage(null);
  };

  return (
    <div className="app-container">
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={handleImageClick} />
      )}
      {images.length > 0 && <LoadMoreBtn onLoadMore={handleLoadMore} />}
      {error && <ErrorMessage message={error} />}
      <ImageModal
        isOpen={!!modalImage}
        image={modalImage}
        onClose={handleCloseModal}
      />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default App;
