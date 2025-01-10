import Card from 'react-bootstrap/Card';
import { Link } from "react-router";

const PropertySearchResult = ({ filteredProperties, handleDetails}) => {
  return (
    <>
    <div>
    <p><strong>Number of results: {filteredProperties?.length}</strong></p>
      {filteredProperties?.length > 0 ? (
        filteredProperties.map((property, index) => (
          <div key={property.id}> 
            <Card style={{ width: "100%", padding:"10px", borderBottom: "1px solid #ccc"}}>
              <Card.Body>
                <Card.Title style={{fontWeight:"bold"}}>{property.fields.project}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted" style={{fontStyle: 'italic'}}>
                 {property.fields.street}
                </Card.Subtitle>
                <Link to="/detail"
                 onClick={() => handleDetails(property.fields.project, property.fields.street)}
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
