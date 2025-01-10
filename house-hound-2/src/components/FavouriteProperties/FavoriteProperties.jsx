import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./FavoriteProperties.css"
import { Link } from "react-router-dom";

const FavoriteProperties = ({favorites, handleRemoveFavorite, handleDetails}) => {
    return (
        <div>
          <h2 style={{marginTop:"80px"}}>Favorite Properties</h2>
          {favorites.length > 0 ? (
            <div className="favorite-grid">
              {favorites.map((property) => (
                <Card key={property.id} style={{ border: "2px solid black" }}>
                  <Card.Body>
                    <Card.Title><strong>{property.project}</strong></Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                    {property.street}
                    </Card.Subtitle>
                    <Card.Text>
                      <strong>Market Segment:</strong> {property.marketSegment || "N/A"} <br></br>
                      <strong>Past 5-year transactions:</strong> {property?.transaction?.length} 
                    </Card.Text>
                    <Button
                      onClick={() => handleRemoveFavorite(property.id)}
                      style={{
                        marginTop: "20px",
                        marginRight: "20px",
                        padding: "10px",
                        backgroundColor: "grey",
                        cursor: "pointer",}}
                    >
                      Unfavorite
                    </Button>{" "}
                    <Link to="/detail"
                 onClick={() => handleDetails(property.project, property.street)}
                >More Details</Link>
                  </Card.Body>
                </Card>
              ))}
            </div>
          ) : (
            <p>No favorite properties yet.</p>
          )}
        </div>
      );
    };

export default FavoriteProperties;