import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const initialFormState = {
  propertyType: "Residential", // 'Residential' or 'Commercial'
  title: "",
  description: "",
  price: "",
  areaSqFt: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  // Residential Fields
  bedrooms: "",
  bathrooms: "",
  furnishingStatus: "Unfurnished",
  balconies: "",
  // Commercial Fields
  commercialType: "Office Space",
  floorNumber: "",
  totalFloors: "",
  parkingSpaces: "",
  amenities: "",
  images: "",
};

export default function SellPropertyNew() {
  const [properties, setProperties] = useState([]);
  const [activeTab, setActiveTab] = useState("Residential"); // Filter view table
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(initialFormState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Endpoint selector helper
  const getEndpoint = (type) => {
    return type === "Residential"
      ? `${BASE_URL}/residential-sale`
      : `${BASE_URL}/commercial-sale`;
  };

  // Fetch properties based on active tab
  const fetchProperties = async (type = activeTab) => {
    try {
      const response = await axios.get(getEndpoint(type));
      if (response.data.success) {
        setProperties(response.data.data);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setProperties([]);
    }
  };

  useEffect(() => {
    fetchProperties(activeTab);
  }, [activeTab]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
  const handlePrevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const resetForm = () => {
    setFormData(initialFormState);
    setCurrentStep(1);
    setEditingId(null);
    setIsModalOpen(false);
  };

  // Submit Handler (Directs to correct Model API)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const targetUrl = getEndpoint(formData.propertyType);

    const payload = {
      ...formData,
      amenities:
        typeof formData.amenities === "string"
          ? formData.amenities
              .split(",")
              .map((i) => i.trim())
              .filter(Boolean)
          : formData.amenities,
      images:
        typeof formData.images === "string"
          ? formData.images
              .split(",")
              .map((i) => i.trim())
              .filter(Boolean)
          : formData.images,
    };

    try {
      if (editingId) {
        await axios.put(`${targetUrl}/${editingId}`, payload);
      } else {
        await axios.post(targetUrl, payload);
      }
      setActiveTab(formData.propertyType);
      fetchProperties(formData.propertyType);
      resetForm();
    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Edit Trigger
  const handleEdit = (item) => {
    setEditingId(item._id);
    setFormData({
      ...item,
      propertyType: activeTab, // Sets either Residential or Commercial
      amenities: Array.isArray(item.amenities) ? item.amenities.join(", ") : "",
      images: Array.isArray(item.images) ? item.images.join(", ") : "",
    });
    setIsModalOpen(true);
  };

  // Delete Trigger
  const handleDelete = async (id) => {
    if (window.confirm("Aap is property ko delete karna chahte hain?")) {
      try {
        await axios.delete(`${getEndpoint(activeTab)}/${id}`);
        fetchProperties(activeTab);
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
  };

  return (
    <div style={{ padding: "24px", fontFamily: "Arial, sans-serif" }}>
      {/* Top Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2>Sell Properties Management</h2>
        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          style={{
            backgroundColor: "#2563eb",
            color: "#fff",
            padding: "10px 18px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          + Add New Property
        </button>
      </div>

      {/* Tabs to switch table view */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
        {["Residential", "Commercial"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "8px 16px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
              backgroundColor: activeTab === tab ? "#1e293b" : "#e2e8f0",
              color: activeTab === tab ? "#fff" : "#334155",
            }}
          >
            {tab} Sale Properties
          </button>
        ))}
      </div>

      {/* Data Table */}
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          overflow: "hidden",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: "#f8fafc",
                borderBottom: "2px solid #e2e8f0",
              }}
            >
              <th style={{ padding: "12px 16px" }}>Title</th>
              <th style={{ padding: "12px 16px" }}>Price</th>
              <th style={{ padding: "12px 16px" }}>City</th>
              <th style={{ padding: "12px 16px" }}>Detail</th>
              <th style={{ padding: "12px 16px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((item) => (
              <tr key={item._id} style={{ borderBottom: "1px solid #e2e8f0" }}>
                <td style={{ padding: "12px 16px" }}>{item.title}</td>
                <td style={{ padding: "12px 16px" }}>₹{item.price}</td>
                <td style={{ padding: "12px 16px" }}>{item.city}</td>
                <td style={{ padding: "12px 16px" }}>
                  {activeTab === "Residential"
                    ? `${item.bedrooms || 0} BHK | ${item.furnishingStatus || "N/A"}`
                    : `${item.commercialType || "Office"} | Floor: ${item.floorNumber || 0}`}
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <button
                    onClick={() => handleEdit(item)}
                    style={{
                      marginRight: "8px",
                      padding: "6px 12px",
                      backgroundColor: "#f59e0b",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "#ef4444",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {properties.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  No {activeTab} Properties Found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Stepper Modal */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              width: "550px",
              borderRadius: "12px",
              padding: "24px",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "16px",
              }}
            >
              <h3>{editingId ? "Edit Property" : "Add Property"}</h3>
              <button
                onClick={resetForm}
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  fontSize: "18px",
                }}
              >
                ✕
              </button>
            </div>

            {/* Stepper Indicator */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
                borderBottom: "1px solid #e2e8f0",
                paddingBottom: "10px",
              }}
            >
              {[
                "1. Type & Info",
                "2. Location",
                "3. Features",
                "4. Extras",
              ].map((name, i) => (
                <span
                  key={i}
                  style={{
                    color: currentStep === i + 1 ? "#2563eb" : "#64748b",
                    fontWeight: currentStep === i + 1 ? "bold" : "normal",
                  }}
                >
                  {name}
                </span>
              ))}
            </div>

            {/* Step 1 */}
            {currentStep === 1 && (
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "bold",
                  }}
                >
                  Select Category Model:
                </label>
                <div
                  style={{ display: "flex", gap: "12px", marginBottom: "16px" }}
                >
                  <button
                    type="button"
                    disabled={!!editingId} // Edit mode me type change disable rakha h
                    onClick={() =>
                      setFormData({ ...formData, propertyType: "Residential" })
                    }
                    style={{
                      flex: 1,
                      padding: "10px",
                      borderRadius: "6px",
                      border: "1px solid #2563eb",
                      backgroundColor:
                        formData.propertyType === "Residential"
                          ? "#2563eb"
                          : "#fff",
                      color:
                        formData.propertyType === "Residential"
                          ? "#fff"
                          : "#2563eb",
                      cursor: "pointer",
                    }}
                  >
                    Residential Model
                  </button>
                  <button
                    type="button"
                    disabled={!!editingId}
                    onClick={() =>
                      setFormData({ ...formData, propertyType: "Commercial" })
                    }
                    style={{
                      flex: 1,
                      padding: "10px",
                      borderRadius: "6px",
                      border: "1px solid #2563eb",
                      backgroundColor:
                        formData.propertyType === "Commercial"
                          ? "#2563eb"
                          : "#fff",
                      color:
                        formData.propertyType === "Commercial"
                          ? "#fff"
                          : "#2563eb",
                      cursor: "pointer",
                    }}
                  >
                    Commercial Model
                  </button>
                </div>

                <input
                  type="text"
                  name="title"
                  placeholder="Property Title"
                  value={formData.title}
                  onChange={handleChange}
                  style={inputStyle}
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleChange}
                  style={{ ...inputStyle, height: "70px" }}
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Price (₹)"
                  value={formData.price}
                  onChange={handleChange}
                  style={inputStyle}
                />
                <input
                  type="number"
                  name="areaSqFt"
                  placeholder="Area (Sq. Ft.)"
                  value={formData.areaSqFt}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>
            )}

            {/* Step 2 */}
            {currentStep === 2 && (
              <div>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  style={inputStyle}
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  style={inputStyle}
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                  style={inputStyle}
                />
                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>
            )}

            {/* Step 3: Specific Model Fields */}
            {currentStep === 3 && (
              <div>
                {formData.propertyType === "Residential" ? (
                  <>
                    <h4 style={{ color: "#2563eb", marginBottom: "12px" }}>
                      ResidentialSaleProperty Fields
                    </h4>
                    <input
                      type="number"
                      name="bedrooms"
                      placeholder="Bedrooms (BHK)"
                      value={formData.bedrooms}
                      onChange={handleChange}
                      style={inputStyle}
                    />
                    <input
                      type="number"
                      name="bathrooms"
                      placeholder="Bathrooms"
                      value={formData.bathrooms}
                      onChange={handleChange}
                      style={inputStyle}
                    />
                    <input
                      type="number"
                      name="balconies"
                      placeholder="Balconies"
                      value={formData.balconies}
                      onChange={handleChange}
                      style={inputStyle}
                    />
                    <select
                      name="furnishingStatus"
                      value={formData.furnishingStatus}
                      onChange={handleChange}
                      style={inputStyle}
                    >
                      <option value="Unfurnished">Unfurnished</option>
                      <option value="Semi-Furnished">Semi-Furnished</option>
                      <option value="Fully Furnished">Fully Furnished</option>
                    </select>
                  </>
                ) : (
                  <>
                    <h4 style={{ color: "#d97706", marginBottom: "12px" }}>
                      CommercialSaleProperty Fields
                    </h4>
                    <select
                      name="commercialType"
                      value={formData.commercialType}
                      onChange={handleChange}
                      style={inputStyle}
                    >
                      <option value="Office Space">Office Space</option>
                      <option value="Retail Shop">Retail Shop</option>
                      <option value="Warehouse">Warehouse</option>
                      <option value="Showroom">Showroom</option>
                    </select>
                    <input
                      type="number"
                      name="floorNumber"
                      placeholder="Floor Number"
                      value={formData.floorNumber}
                      onChange={handleChange}
                      style={inputStyle}
                    />
                    <input
                      type="number"
                      name="totalFloors"
                      placeholder="Total Floors"
                      value={formData.totalFloors}
                      onChange={handleChange}
                      style={inputStyle}
                    />
                    <input
                      type="number"
                      name="parkingSpaces"
                      placeholder="Parking Spaces"
                      value={formData.parkingSpaces}
                      onChange={handleChange}
                      style={inputStyle}
                    />
                  </>
                )}
              </div>
            )}

            {/* Step 4 */}
            {currentStep === 4 && (
              <div>
                <input
                  type="text"
                  name="amenities"
                  placeholder="Amenities (Comma separated)"
                  value={formData.amenities}
                  onChange={handleChange}
                  style={inputStyle}
                />
                <input
                  type="text"
                  name="images"
                  placeholder="Image URLs (Comma separated)"
                  value={formData.images}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>
            )}

            {/* Controls */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#64748b",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Back
                </button>
              )}
              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#2563eb",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    marginLeft: "auto",
                  }}
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#16a34a",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    marginLeft: "auto",
                  }}
                >
                  {loading ? "Submitting..." : editingId ? "Update" : "Submit"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "6px",
  border: "1px solid #cbd5e1",
  boxSizing: "border-box",
};
