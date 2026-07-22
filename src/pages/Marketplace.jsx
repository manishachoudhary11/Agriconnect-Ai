import { useEffect, useState } from "react";
import {
  HiShoppingBag,
  HiSearch,
  HiFilter,
  HiPlus,
  HiPencil,
  HiTrash,
  HiEye,
  HiLocationMarker,
  HiUserCircle,
  HiPaperAirplane,
  HiClipboardList,
  HiSparkles,
  HiPhotograph,
  HiCheckCircle,
  HiClock,
} from "react-icons/hi";
import api from "../lib/api";
import { formatCurrency } from "../lib/utils";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { Badge, Card, EmptyState, Loader, Modal, SkeletonCard, Button, Input } from "../components/ui";

export default function Marketplace() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("browse"); // "browse" | "my-listings" | "orders"

  const [listings, setListings] = useState([]);
  const [myListings, setMyListings] = useState([]);
  const [orders, setOrders] = useState([]);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modals
  const [isListingModalOpen, setIsListingModalOpen] = useState(false);
  const [editingListing, setEditingListing] = useState(null);

  const [selectedListing, setSelectedListing] = useState(null); // For detail & order creation
  const [orderQuantity, setOrderQuantity] = useState(10);
  const [orderMessage, setOrderMessage] = useState("");
  const [orderSubmitting, setOrderSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const [deleteListingId, setDeleteListingId] = useState(null);

  // Listing Form State
  const [listingForm, setListingForm] = useState({
    title: "",
    crop_name: "",
    quantity: 100,
    unit: "kg",
    price_per_unit: 50,
    location: "",
    image_url: "",
    description: "",
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const fetchCategories = async () => {
    try {
      const res = await api.get("/api/marketplace/categories");
      setCategories(res.data || []);
    } catch {
      // Fallback categories if empty
      setCategories([
        { id: 1, name: "Grains" },
        { id: 2, name: "Vegetables" },
        { id: 3, name: "Fruits" },
        { id: 4, name: "Pulses" },
      ]);
    }
  };

  const fetchListings = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (search) params.search = search;
      if (selectedCategory) params.category_id = selectedCategory;
      if (locationFilter) params.location = locationFilter;

      const res = await api.get("/api/marketplace/listings", { params });
      setListings(res.data || []);
    } catch (err) {
      if (!err.status || err.message === "Network Error" || err.original?.code === "ERR_NETWORK" || err.message === "Something went wrong") {
        setListings([
          { id: 1, title: "Fresh Organic Wheat (50 Q)", category: "Grains", price_per_unit: 2300, unit: "Quintal", available_quantity: 50, location: "Nashik, MH", seller_name: "Ramesh Patel", description: "Newly harvested organic wheat batch." },
          { id: 2, title: "Premium Basmati Rice", category: "Grains", price_per_unit: 3500, unit: "Quintal", available_quantity: 30, location: "Punjab", seller_name: "Sarabjit Singh", description: "Export quality long grain basmati." },
          { id: 3, title: "Fresh Yellow Sweet Corn", category: "Grains", price_per_unit: 1850, unit: "Quintal", available_quantity: 100, location: "Satara, MH", seller_name: "Anil Deshmukh", description: "Sweet corn freshly harvested." }
        ]);
      } else {
        setError(err.response?.data?.detail || err.message || "Failed to load marketplace listings");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchMyListings = async () => {
    try {
      const res = await api.get("/api/marketplace/my-listings");
      setMyListings(res.data || []);
    } catch {
      setMyListings([]);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await api.get("/api/marketplace/orders");
      setOrders(res.data || []);
    } catch {
      setOrders([]);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchListings();
    fetchMyListings();
    fetchOrders();
  }, [search, selectedCategory, locationFilter]);

  const handleOpenCreateModal = () => {
    setEditingListing(null);
    setListingForm({
      title: "",
      crop_name: "",
      quantity: 100,
      unit: "kg",
      price_per_unit: 50,
      location: user?.location || "Nashik, MH",
      image_url: "",
      description: "",
    });
    setFormError("");
    setIsListingModalOpen(true);
  };

  const handleOpenEditModal = (listing) => {
    setEditingListing(listing);
    setListingForm({
      title: listing.title || "",
      crop_name: listing.crop_name || "",
      quantity: listing.quantity || 0,
      unit: listing.unit || "kg",
      price_per_unit: listing.price_per_unit || 0,
      location: listing.location || "",
      image_url: listing.image_url || "",
      description: listing.description || "",
    });
    setFormError("");
    setIsListingModalOpen(true);
  };

  const handleSaveListing = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!listingForm.title || !listingForm.crop_name || !listingForm.location || !listingForm.price_per_unit) {
      setFormError("Please fill in all required fields.");
      return;
    }

    setFormSubmitting(true);
    try {
      const payload = {
        title: listingForm.title,
        crop_name: listingForm.crop_name,
        quantity: parseInt(listingForm.quantity, 10),
        unit: listingForm.unit,
        price_per_unit: parseFloat(listingForm.price_per_unit),
        location: listingForm.location,
        image_url: listingForm.image_url,
        description: listingForm.description,
      };

      if (editingListing) {
        await api.put(`/api/marketplace/listings/${editingListing.id}`, payload);
      } else {
        await api.post("/api/marketplace/listings", payload);
      }

      setIsListingModalOpen(false);
      fetchListings();
      fetchMyListings();
    } catch (err) {
      setFormError(err.response?.data?.detail || err.message || "Failed to save listing");
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleDeleteListing = async () => {
    if (!deleteListingId) return;
    try {
      await api.delete(`/api/marketplace/listings/${deleteListingId}`);
      setDeleteListingId(null);
      fetchListings();
      fetchMyListings();
    } catch (err) {
      alert(err.response?.data?.detail || "Failed to delete listing");
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!selectedListing) return;

    setOrderSubmitting(true);
    setOrderSuccess(false);
    try {
      await api.post("/api/marketplace/orders", {
        listing_id: selectedListing.id,
        quantity: parseInt(orderQuantity, 10),
        message: orderMessage,
      });
      setOrderSuccess(true);
      fetchOrders();
      setTimeout(() => {
        setSelectedListing(null);
        setOrderSuccess(false);
      }, 1800);
    } catch (err) {
      alert(err.response?.data?.detail || err.message || "Failed to send order inquiry");
    } finally {
      setOrderSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />

      <main className="flex-1 mx-auto max-w-7xl w-full px-4 py-8 sm:px-6 lg:px-8">
        <div className="animate-fade-in space-y-6">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-6">
            <div>
              <Badge variant="primary">AgriMarketplace</Badge>
              <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
                AgriConnect Marketplace
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Direct trade portal connecting verified farmers with wholesale buyers.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="primary" onClick={handleOpenCreateModal} className="inline-flex items-center gap-2 shadow-md">
                <HiPlus className="h-4 w-4" /> Create Listing
              </Button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-border">
            <button
              onClick={() => setActiveTab("browse")}
              className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition ${
                activeTab === "browse"
                  ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <HiShoppingBag className="h-4 w-4" /> Browse Marketplace ({listings.length})
            </button>
            <button
              onClick={() => setActiveTab("my-listings")}
              className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition ${
                activeTab === "my-listings"
                  ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <HiClipboardList className="h-4 w-4" /> My Listings ({myListings.length})
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition ${
                activeTab === "orders"
                  ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <HiPaperAirplane className="h-4 w-4" /> Inquiries & Orders ({orders.length})
            </button>
          </div>

          {/* TAB 1: BROWSE MARKETPLACE */}
          {activeTab === "browse" && (
            <div className="space-y-6">
              {/* Search & Category Filter Bar */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-card p-4 rounded-2xl border border-border shadow-sm">
                <div className="relative w-full md:w-80">
                  <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search crop or produce title..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                    <HiFilter className="h-4 w-4 text-emerald-500" /> Category:
                  </div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="rounded-xl border border-border bg-background px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  >
                    <option value="">All Categories</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>

                  <Input
                    type="text"
                    placeholder="Filter location..."
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="w-40 text-xs py-1.5"
                  />
                </div>
              </div>

              {/* Listings Grid */}
              {loading ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
                </div>
              ) : error ? (
                <Card className="p-8">
                  <EmptyState
                    icon={HiShoppingBag}
                    title="Unable to load marketplace"
                    description={error}
                  />
                </Card>
              ) : listings.length === 0 ? (
                <Card className="p-12">
                  <EmptyState
                    icon={HiShoppingBag}
                    title="No active listings available"
                    description="Be the first farmer to list your crop for wholesale buyers!"
                    action={
                      <Button variant="primary" onClick={handleOpenCreateModal}>
                        Create First Listing
                      </Button>
                    }
                  />
                </Card>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {listings.map((item) => (
                    <Card
                      key={item.id}
                      className="group relative overflow-hidden border-border/80 hover:border-emerald-500/50 transition-all hover:shadow-lg flex flex-col justify-between"
                    >
                      <div>
                        {/* Image Header */}
                        <div className="relative h-48 w-full overflow-hidden bg-muted/40">
                          {item.image_url ? (
                            <img
                              src={item.image_url}
                              alt={item.title}
                              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-emerald-900/10 text-emerald-600 dark:text-emerald-400">
                              <HiPhotograph className="h-14 w-14 opacity-60" />
                            </div>
                          )}
                          <div className="absolute top-3 right-3">
                            <Badge variant="success">{item.crop_name}</Badge>
                          </div>
                        </div>

                        <div className="p-5 space-y-3">
                          <h3 className="font-bold text-lg tracking-tight group-hover:text-emerald-500 transition-colors">
                            {item.title}
                          </h3>

                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                                {formatCurrency(item.price_per_unit)}
                                <span className="text-xs font-normal text-muted-foreground">/{item.unit}</span>
                              </p>
                            </div>
                            <Badge variant="outline">{item.quantity} {item.unit} stock</Badge>
                          </div>

                          <div className="space-y-1 text-xs text-muted-foreground border-t border-border/60 pt-3">
                            <div className="flex items-center gap-1.5">
                              <HiLocationMarker className="h-4 w-4 text-emerald-500 shrink-0" />
                              <span>{item.location}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <HiUserCircle className="h-4 w-4 text-blue-500 shrink-0" />
                              <span>Seller: <strong className="text-foreground">{item.seller_name || "Verified Farmer"}</strong></span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="p-5 pt-0">
                        <Button
                          variant="primary"
                          className="w-full inline-flex items-center justify-center gap-2"
                          onClick={() => {
                            setSelectedListing(item);
                            setOrderQuantity(Math.min(10, item.quantity));
                            setOrderMessage(`Hi, I am interested in purchasing ${item.crop_name} from your listing "${item.title}". Please share details.`);
                          }}
                        >
                          <HiPaperAirplane className="h-4 w-4" /> Contact Seller / Order
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: MY LISTINGS */}
          {activeTab === "my-listings" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">Your Produce Listings</h2>
                <Button variant="primary" size="sm" onClick={handleOpenCreateModal} className="inline-flex items-center gap-1.5">
                  <HiPlus className="h-4 w-4" /> Add Listing
                </Button>
              </div>

              {myListings.length === 0 ? (
                <Card className="p-8">
                  <EmptyState
                    icon={HiClipboardList}
                    title="No seller listings created yet"
                    description="List your harvested crops here to receive purchase inquiries from buyers."
                    action={<Button variant="primary" onClick={handleOpenCreateModal}>Add Listing</Button>}
                  />
                </Card>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {myListings.map((item) => (
                    <Card key={item.id} className="p-5 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-bold text-base">{item.title}</h3>
                          <Badge variant="success">{item.status}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Crop: {item.crop_name}</p>
                        <div className="mt-3 flex items-baseline justify-between">
                          <p className="text-xl font-bold text-emerald-500">
                            ₹{item.price_per_unit}/{item.unit}
                          </p>
                          <span className="text-xs text-muted-foreground">{item.quantity} {item.unit} available</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-2 border-t border-border pt-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenEditModal(item)}
                          className="inline-flex items-center gap-1 text-xs"
                        >
                          <HiPencil className="h-3.5 w-3.5" /> Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => setDeleteListingId(item.id)}
                          className="inline-flex items-center gap-1 text-xs"
                        >
                          <HiTrash className="h-3.5 w-3.5" /> Delete
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ORDERS & INQUIRIES */}
          {activeTab === "orders" && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold">Trade Orders & Buyer Inquiries</h2>

              {orders.length === 0 ? (
                <Card className="p-8">
                  <EmptyState
                    icon={HiPaperAirplane}
                    title="No orders or inquiries found"
                    description="When buyers express interest or order your produce, inquiries will appear here."
                  />
                </Card>
              ) : (
                <div className="space-y-4">
                  {orders.map((ord) => (
                    <Card key={ord.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-base">{ord.listing_title || "Marketplace Listing"}</span>
                          <Badge variant={ord.status === "completed" ? "success" : "warning"}>
                            {ord.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Requested Quantity: <strong className="text-foreground">{ord.quantity} units</strong> · Total Price:{" "}
                          <strong className="text-emerald-500">₹{ord.total_price}</strong>
                        </p>
                        {ord.message && (
                          <p className="text-xs italic text-muted-foreground bg-muted/30 p-2 rounded-lg mt-2">
                            "{ord.message}"
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <HiClock className="h-4 w-4" />
                        <span>Order ID #{ord.id}</span>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Create / Edit Listing Modal */}
      <Modal
        isOpen={isListingModalOpen}
        onClose={() => setIsListingModalOpen(false)}
        title={editingListing ? "Edit Marketplace Listing" : "Create Marketplace Listing"}
      >
        <form onSubmit={handleSaveListing} className="space-y-4">
          {formError && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-500 font-medium">
              {formError}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1">
              Listing Title *
            </label>
            <Input
              type="text"
              placeholder="e.g. Fresh Organic Wheat Batch 500kg"
              value={listingForm.title}
              onChange={(e) => setListingForm({ ...listingForm, title: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">
                Crop Name *
              </label>
              <Input
                type="text"
                placeholder="e.g. Wheat"
                value={listingForm.crop_name}
                onChange={(e) => setListingForm({ ...listingForm, crop_name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">
                Location *
              </label>
              <Input
                type="text"
                placeholder="e.g. Nashik, Maharashtra"
                value={listingForm.location}
                onChange={(e) => setListingForm({ ...listingForm, location: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">
                Quantity *
              </label>
              <Input
                type="number"
                value={listingForm.quantity}
                onChange={(e) => setListingForm({ ...listingForm, quantity: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">
                Unit *
              </label>
              <select
                value={listingForm.unit}
                onChange={(e) => setListingForm({ ...listingForm, unit: e.target.value })}
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              >
                <option value="kg">kg</option>
                <option value="quintal">quintal</option>
                <option value="ton">ton</option>
                <option value="box">box</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">
                Price Per Unit (₹) *
              </label>
              <Input
                type="number"
                value={listingForm.price_per_unit}
                onChange={(e) => setListingForm({ ...listingForm, price_per_unit: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1">
              Image URL (Optional)
            </label>
            <Input
              type="url"
              placeholder="https://images.unsplash.com/photo-..."
              value={listingForm.image_url}
              onChange={(e) => setListingForm({ ...listingForm, image_url: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1">
              Produce Description
            </label>
            <textarea
              rows={3}
              placeholder="Describe crop quality, harvest date, packaging details..."
              value={listingForm.description}
              onChange={(e) => setListingForm({ ...listingForm, description: e.target.value })}
              className="w-full rounded-xl border border-border bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            />
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-border pt-4">
            <Button type="button" variant="outline" onClick={() => setIsListingModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={formSubmitting}>
              {formSubmitting ? "Saving..." : editingListing ? "Update Listing" : "Post Listing"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Order Inquiry Modal */}
      {selectedListing && (
        <Modal
          isOpen={Boolean(selectedListing)}
          onClose={() => setSelectedListing(null)}
          title={`Order Inquiry: ${selectedListing.title}`}
        >
          {orderSuccess ? (
            <div className="py-6 text-center space-y-3">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                <HiCheckCircle className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold">Inquiry Sent Successfully!</h3>
              <p className="text-xs text-muted-foreground">
                Your purchase inquiry has been transmitted to {selectedListing.seller_name || "the seller"}.
              </p>
            </div>
          ) : (
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div className="rounded-xl bg-muted/40 p-4 space-y-2 text-xs">
                <p className="font-semibold text-sm">{selectedListing.title}</p>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price per {selectedListing.unit}:</span>
                  <span className="font-bold text-emerald-500">₹{selectedListing.price_per_unit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Seller:</span>
                  <span>{selectedListing.seller_name || "Verified Farmer"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location:</span>
                  <span>{selectedListing.location}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">
                  Order Quantity ({selectedListing.unit}) *
                </label>
                <Input
                  type="number"
                  min={1}
                  max={selectedListing.quantity}
                  value={orderQuantity}
                  onChange={(e) => setOrderQuantity(e.target.value)}
                  required
                />
              </div>

              <div className="rounded-xl border border-border p-3 flex items-center justify-between text-xs font-bold">
                <span>Estimated Total:</span>
                <span className="text-base text-emerald-600 dark:text-emerald-400">
                  ₹{orderQuantity * selectedListing.price_per_unit}
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">
                  Message for Seller
                </label>
                <textarea
                  rows={3}
                  value={orderMessage}
                  onChange={(e) => setOrderMessage(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                />
              </div>

              <div className="flex justify-end gap-3 border-t border-border pt-4">
                <Button type="button" variant="outline" onClick={() => setSelectedListing(null)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" disabled={orderSubmitting}>
                  {orderSubmitting ? "Sending..." : "Submit Order Inquiry"}
                </Button>
              </div>
            </form>
          )}
        </Modal>
      )}

      {/* Delete Listing Confirmation */}
      {deleteListingId && (
        <Modal isOpen={Boolean(deleteListingId)} onClose={() => setDeleteListingId(null)} title="Delete Listing">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Are you sure you want to remove this marketplace listing?
            </p>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setDeleteListingId(null)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDeleteListing}>
                Delete
              </Button>
            </div>
          </div>
        </Modal>
      )}

      <Footer />
    </div>
  );
}
