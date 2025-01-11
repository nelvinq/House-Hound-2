import { useState, useEffect } from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import * as propertyData from "./services/propertyData";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import PropertySearchPage from "./components/PropertySearchPage";
import PropertyDetails from "./components/PropertyDetails/PropertyDetails";
import FavoriteProperties from "./components/FavouriteProperties/FavoriteProperties";
import * as transactionData from "./services/transactionData";

function App() {
  const [properties, setProperties] = useState([]);
  const [propertyDetails, setPropertyDetails] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
      const fetchData = async () => {
        try {
          const propertyResponse = await propertyData.propertyData();
          const transactionResponse = await transactionData.transactionData();
          const propertyAndTransaction = propertyResponse.map((property) => {
            const transactions = transactionResponse.filter((txn) =>
              property.fields["Transaction Table"]?.includes(txn.id)
            ); return {
              ...property,
              transactions,
            };
          });
          const sortedData = propertyAndTransaction.sort((a, b) => {
            if (a.fields.project < b.fields.project) {
              return -1;
            }
            if (a.fields.project > b.fields.project) {
              return 1;
            }
            return 0;
          });
          setProperties(sortedData)
          setFilteredProperties(sortedData)
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
      fetchData();
    }, []);

  const handleDetails = async (project, street) => {
    try {
      const selectedDetails = properties.filter(
        (property) => property.fields.project === project && property.fields.street === street
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
            property.fields?.project?.toLowerCase().includes(query.toLowerCase()) ||
            property.fields?.street?.toLowerCase().includes(query.toLowerCase())
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
        isFavorite={isFavorite} />}/>
        <Route path='/favorites' element={<FavoriteProperties favorites={favorites}
        handleRemoveFavorite={handleRemoveFavorite} handleDetails={handleDetails}/>}/>
      </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
