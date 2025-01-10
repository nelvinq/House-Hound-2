import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import * as propertyData from "./services/propertyData";
import * as getToken from "./services/getToken";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import PropertySearchPage from "./components/PropertySearchPage";
import PropertyDetails from "./components/PropertyDetails/PropertyDetails";
import FavoriteProperties from "./components/FavouriteProperties/FavoriteProperties";

function App() {
  const [properties, setProperties] = useState([]);
  const [token, setToken] = useState("");
  const [propertyDetails, setPropertyDetails] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (token === "") {
      const fetchToken = async () => {
        try {
          const data = await getToken.getToken();
          setToken(data);
          console.log("Updated token:", token);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchToken();
    }
  }, []);

  useEffect(() => {
    if (token !== "") {
      const fetchData = async () => {
        try {
          const data = await propertyData.index();
          setProperties(data);
          setFilteredProperties(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [token]);

  const handleDetails = async (project, street) => {
    try {
      const selectedDetails = properties.filter(
        (property) => property.project === project && property.street === street
      );
      setPropertyDetails(selectedDetails);
    } catch (error) {
      console.error("Error fetching property details:", error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredProperties(properties);
    } else {
      setFilteredProperties(
        properties.filter(
          (property) =>
            property.project.toLowerCase().includes(query.toLowerCase()) ||
            property.street.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  const handleAddFavorite = (property) => {
    if (!favorites.find((fav) => fav.id === property.id)) {
      setFavorites([...favorites, property]);
    }
  };

  const handleRemoveFavorite = (propertyId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((fav) => fav.id !== propertyId))
  };

  const isFavorite = (propertyId) =>
    favorites.some((fav) => fav.id === propertyId);

  return (
    <>
      <NavBar favorites={favorites}/>
      <div>
      </div>
      <div className="body">
      <Routes>
        <Route path="/" element={<PropertySearchPage filteredProperties={filteredProperties} handleDetails={handleDetails} searchQuery={searchQuery} handleSearch={handleSearch}/>} />
        <Route path='/detail' element={<PropertyDetails propertyDetails={propertyDetails} handleAddFavorite={handleAddFavorite}
        handleRemoveFavorite={handleRemoveFavorite}
        isFavorite={isFavorite}/>}/>
        <Route path='/favorites' element={<FavoriteProperties favorites={favorites}
        handleRemoveFavorite={handleRemoveFavorite} handleDetails={handleDetails}/>}/>
      </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
