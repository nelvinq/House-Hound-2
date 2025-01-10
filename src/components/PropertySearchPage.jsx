import PropertySearchBar from './PropertySearchBar';
import PropertySearchResult from './PropertySearchResult';

const PropertySearchPage = ({ filteredProperties, handleDetails, searchQuery, handleSearch }) => {
  return (
    <>
    <PropertySearchBar
        searchQuery={searchQuery}
        handleSearch={handleSearch}
      />
      <PropertySearchResult 
        filteredProperties={filteredProperties}
        handleDetails={handleDetails}
      />
    </>
  );
};

export default PropertySearchPage;
