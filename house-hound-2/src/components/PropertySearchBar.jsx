import Form from 'react-bootstrap/Form';

const PropertySearchBar = ({searchQuery, handleSearch}) => {
  return (
    <Form>
      <Form.Control
        style={{ width: "100%", marginTop:"30px", marginBottom:"10px", padding:"20px", fontSize:"20px"}}
        type="text"
        placeholder="Search by Project Name or Street Name"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
      />
      </Form>
  );
};

export default PropertySearchBar;