import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

const PropertySearchResult = ({ filteredProperties, handleDetails}) => {
  return (
    <>
    <div>
    <p><strong>Number of results: {filteredProperties?.length}</strong></p>
      {filteredProperties?.length > 0 ? (
        filteredProperties.map((property, index) => (
          <div>
            <Card style={{ width: "100%", padding:"10px", borderBottom: "1px solid #ccc"}}>
              <Card.Body>
                <Card.Title style={{fontWeight:"bold"}}>{property.project}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted" style={{fontStyle: 'italic'}}>
                 {property.street}
                </Card.Subtitle>
                <Link to="/detail"
                 onClick={() => handleDetails(property.project, property.street)}
                >
                        More Details</Link>
              </Card.Body>
            </Card>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
    </>
  );
};

export default PropertySearchResult;
