import { useNavigate } from "react-router-dom";
import "./PropertyDetails.css";

const PropertyDetails = ({ propertyDetails,  handleAddFavorite,
    handleRemoveFavorite,
    isFavorite }) => {
  const navigate = useNavigate();

  if (!propertyDetails || propertyDetails?.length === 0) {
    return <p>No property details available. Please select a property.</p>;
  }

  const property = propertyDetails[0];

  const formatContractDate = (dateString) => {
    const [month, year] = [dateString.slice(0, 2), dateString.slice(2)];
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];
    const formattedMonth = monthNames[parseInt(month) - 1]; 
    const formattedYear = `20${year}`;
    return `${formattedMonth} ${formattedYear}`;
  };
  
  return (
    <div>
      <div>
        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: "20px",
            marginRight: "20px",
            padding: "10px",
            color: "white",
            cursor: "pointer",
          }}
        >
          Back to Search
        </button>
        <button
          onClick={() => {
            isFavorite(property.id)
              ? handleRemoveFavorite(property.id)
              : handleAddFavorite(property);
          }}
          style={{
            marginTop: "20px",
            marginRight: "20px",
            padding: "10px",
            backgroundColor: isFavorite(property.id) ? "grey" : "pink",
            cursor: "pointer",
          }}
        >
          {isFavorite(property.id) ? "Unfavorite" : "Favorite"}
        </button>
      </div>

      <h2>Property Details</h2>
      <div>
        <p>
          <strong>Project:</strong> {property.project}
        </p>
        <p>
          <strong>Street:</strong> {property.street}
        </p>
        <p>
          <strong>Market Segment:</strong> {property.marketSegment || "N/A"}
        </p>
        <p>
          <strong>Coordinates:</strong> {property.x}, {property.y}
        </p>
        <h3>Transactions:</h3>
        {property.transaction && property?.transaction?.length > 0 ? (
          <table className="transactionTable">
            <thead>
              <tr>
                <th>Date</th>
                <th>Area (sqm)</th>
                <th>Price ($)</th>
                <th>Property Type</th>
              </tr>
            </thead>
            <tbody>
              {property.transaction.map((txn, index) => (
                <tr key={index}>
                  <td>{formatContractDate(txn.contractDate)}</td>
                  <td>{txn.area || "N/A"}</td>
                  <td>{txn.price || "N/A"}</td>
                  <td>{txn.propertyType || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No transactions available.</p>
        )}
      </div>
    </div>
  );
};

export default PropertyDetails;
