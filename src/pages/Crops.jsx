import { useEffect, useState } from "react";
import {
  HiPlus,
  HiSearch,
  HiFilter,
  HiPencil,
  HiTrash,
  HiEye,
  HiPhotograph,
  HiChevronLeft,
  HiChevronRight,
  HiViewGrid,
  HiViewList,
  HiLocationMarker,
  HiCalendar,
  HiTag,
  HiX,
} from "react-icons/hi";
import api from "../lib/api";
import { formatCurrency } from "../lib/utils";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Badge, Card, EmptyState, Loader, Modal, SkeletonCard, Button, Input } from "../components/ui";

const CATEGORIES = ["All", "Grains", "Vegetables", "Fruits", "Pulses", "Commercial", "Spices"];
const STATUSES = ["All", "growing", "harvested", "stored", "sold"];

export default function Crops() {
  const [crops, setCrops] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(8);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [viewMode, setViewMode] = useState("grid");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modals
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCrop, setEditingCrop] = useState(null);
  const [detailsCrop, setDetailsCrop] = useState(null);
  const [deleteCropId, setDeleteCropId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    category: "Grains",
    quantity: "",
    location: "",
    market_price: "",
    status: "growing",
    planted_at: "",
    description: "",
    image_url: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const fetchCrops = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        page,
        limit,
        search: search.trim(),
        category: category === "All" ? "" : category,
        status: status === "All" ? "" : status,
      };
      const res = await api.get("/api/crops", { params });
      setCrops(res.data.items || []);
      setTotal(res.data.total || 0);
      setTotalPages(res.data.pages || 1);
    } catch (err) {
      if (!err.status || err.message === "Network Error" || err.original?.code === "ERR_NETWORK" || err.message === "Something went wrong") {
        setCrops([
          { id: 1, name: "Wheat (HD-2967)", category: "Grains", quantity: 200, location: "Nashik, MH", market_price: 2250, status: "growing", planted_at: "2026-05-10", description: "High yield crop" },
          { id: 2, name: "Basmati Rice", category: "Grains", quantity: 150, location: "Pune, MH", market_price: 3400, status: "harvested", planted_at: "2026-04-01", description: "Organic crop" },
          { id: 3, name: "Hybrid Corn", category: "Grains", quantity: 100, location: "Satara, MH", market_price: 1950, status: "stored", planted_at: "2026-03-15", description: "Grade A quality" }
        ]);
        setTotal(3);
        setTotalPages(1);
      } else {
        setError(err.response?.data?.detail || err.message || "Failed to load crops");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCrops();
  }, [page, search, category, status]);

  const handleOpenAddModal = () => {
    setEditingCrop(null);
    setFormData({
      name: "",
      category: "Grains",
      quantity: 100,
      location: "",
      market_price: 2500,
      status: "growing",
      planted_at: new Date().toISOString().split("T")[0],
      description: "",
      image_url: "",
    });
    setImageFile(null);
    setFormError("");
    setIsFormOpen(true);
  };

  const handleOpenEditModal = (crop) => {
    setEditingCrop(crop);
    setFormData({
      name: crop.name || "",
      category: crop.category || "Grains",
      quantity: crop.quantity || 0,
      location: crop.location || "",
      market_price: crop.market_price || 0,
      status: crop.status || "growing",
      planted_at: crop.planted_at ? crop.planted_at.split("T")[0] : "",
      description: crop.description || "",
      image_url: crop.image_url || "",
    });
    setImageFile(null);
    setFormError("");
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!formData.name || !formData.location || !formData.quantity || !formData.market_price) {
      setFormError("Please fill in all required fields (Name, Location, Quantity, Market Price).");
      return;
    }

    setFormSubmitting(true);
    try {
      const payload = {
        name: formData.name,
        category: formData.category,
        quantity: parseInt(formData.quantity, 10),
        location: formData.location,
        market_price: parseFloat(formData.market_price),
        status: formData.status,
        planted_at: formData.planted_at ? new Date(formData.planted_at).toISOString() : null,
        description: formData.description,
        image_url: formData.image_url,
      };

      let savedCrop;
      if (editingCrop) {
        const res = await api.put(`/api/crops/${editingCrop.id}`, payload);
        savedCrop = res.data;
      } else {
        const res = await api.post("/api/crops", payload);
        savedCrop = res.data;
      }

      // If image file was selected, upload it
      if (imageFile && savedCrop?.id) {
        const fileData = new FormData();
        fileData.append("file", imageFile);
        await api.post(`/api/crops/${savedCrop.id}/upload-image`, fileData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setIsFormOpen(false);
      fetchCrops();
    } catch (err) {
      setFormError(err.response?.data?.detail || err.message || "Failed to save crop");
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleDeleteCrop = async () => {
    if (!deleteCropId) return;
    try {
      await api.delete(`/api/crops/${deleteCropId}`);
      setDeleteCropId(null);
      fetchCrops();
    } catch (err) {
      alert(err.response?.data?.detail || "Failed to delete crop");
    }
  };

  const getStatusBadge = (st) => {
    switch (st) {
      case "growing":
        return <Badge variant="success">Growing</Badge>;
      case "harvested":
        return <Badge variant="primary">Harvested</Badge>;
      case "stored":
        return <Badge variant="warning">In Storage</Badge>;
      case "sold":
        return <Badge variant="outline">Sold</Badge>;
      default:
        return <Badge variant="outline">{st}</Badge>;
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
              <Badge variant="primary">Crop Management</Badge>
              <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
                My Farm Crops
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Manage, filter, and analyze all your agricultural inventory in one place.
              </p>
            </div>
            <Button
              variant="primary"
              onClick={handleOpenAddModal}
              className="inline-flex items-center gap-2 shadow-md"
            >
              <HiPlus className="h-4 w-4" />
              Add Crop Record
            </Button>
          </div>

          {/* Search and Filters Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-card p-4 rounded-2xl border border-border shadow-sm">
            <div className="relative w-full md:w-80">
              <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search crops by name..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="w-full rounded-xl border border-border bg-background pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                <HiFilter className="h-4 w-4 text-emerald-500" /> Filter:
              </div>

              {/* Category Dropdown */}
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setPage(1);
                }}
                className="rounded-xl border border-border bg-background px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    Category: {cat}
                  </option>
                ))}
              </select>

              {/* Status Dropdown */}
              <select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                  setPage(1);
                }}
                className="rounded-xl border border-border bg-background px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              >
                {STATUSES.map((st) => (
                  <option key={st} value={st}>
                    Status: {st}
                  </option>
                ))}
              </select>

              {/* View Mode Toggle */}
              <div className="flex items-center rounded-xl border border-border p-1 bg-muted/30 ml-auto">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-lg text-xs ${
                    viewMode === "grid" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
                  }`}
                  title="Grid View"
                >
                  <HiViewGrid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("table")}
                  className={`p-1.5 rounded-lg text-xs ${
                    viewMode === "table" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
                  }`}
                  title="Table View"
                >
                  <HiViewList className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Main Content View */}
          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: limit }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : error ? (
            <Card className="p-8">
              <EmptyState
                icon={HiPhotograph}
                title="Error loading crop records"
                description={error}
                action={
                  <Button variant="outline" onClick={fetchCrops}>
                    Try Again
                  </Button>
                }
              />
            </Card>
          ) : crops.length === 0 ? (
            <Card className="p-12">
              <EmptyState
                icon={HiPhotograph}
                title="No crops found"
                description="No crop records match your criteria. Add a new crop to start managing your harvest."
                action={
                  <Button variant="primary" onClick={handleOpenAddModal}>
                    Add New Crop
                  </Button>
                }
              />
            </Card>
          ) : viewMode === "grid" ? (
            /* Grid View */
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {crops.map((crop) => (
                <Card
                  key={crop.id}
                  className="group relative overflow-hidden border-border/80 hover:border-emerald-500/50 transition-all hover:shadow-lg flex flex-col justify-between"
                >
                  <div>
                    {/* Crop Image Thumbnail */}
                    <div className="relative h-44 w-full overflow-hidden bg-muted/40">
                      {crop.image_url ? (
                        <img
                          src={crop.image_url}
                          alt={crop.name}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-emerald-900/10 text-emerald-600 dark:text-emerald-400">
                          <HiPhotograph className="h-12 w-12 opacity-60" />
                        </div>
                      )}
                      <div className="absolute top-3 right-3">{getStatusBadge(crop.status)}</div>
                      <div className="absolute top-3 left-3">
                        <Badge variant="primary" className="bg-background/80 backdrop-blur-md">
                          {crop.category || "General"}
                        </Badge>
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-bold text-lg tracking-tight group-hover:text-emerald-500 transition-colors">
                          {crop.name}
                        </h3>
                        <p className="font-extrabold text-base text-emerald-600 dark:text-emerald-400">
                          {formatCurrency(crop.market_price)}
                        </p>
                      </div>

                      <div className="space-y-1.5 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <HiLocationMarker className="h-4 w-4 text-emerald-500 shrink-0" />
                          <span>{crop.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <HiTag className="h-4 w-4 text-blue-500 shrink-0" />
                          <span>Quantity: <strong className="text-foreground">{crop.quantity} units</strong></span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="flex items-center justify-between border-t border-border px-5 py-3 bg-muted/20">
                    <button
                      onClick={() => setDetailsCrop(crop)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground transition"
                    >
                      <HiEye className="h-4 w-4" /> View
                    </button>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEditModal(crop)}
                        className="p-1.5 rounded-lg border border-border text-xs font-medium text-muted-foreground hover:text-emerald-500 hover:border-emerald-500/50 transition"
                        title="Edit Crop"
                      >
                        <HiPencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteCropId(crop.id)}
                        className="p-1.5 rounded-lg border border-border text-xs font-medium text-muted-foreground hover:text-red-500 hover:border-red-500/50 transition"
                        title="Delete Crop"
                      >
                        <HiTrash className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            /* Table View */
            <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-sm">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-border bg-muted/40 text-xs text-muted-foreground uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Crop Name</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Quantity</th>
                    <th className="px-6 py-4">Location</th>
                    <th className="px-6 py-4">Market Price</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {crops.map((crop) => (
                    <tr key={crop.id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-6 py-4 font-semibold">{crop.name}</td>
                      <td className="px-6 py-4 text-muted-foreground">{crop.category || "Grains"}</td>
                      <td className="px-6 py-4 font-medium">{crop.quantity} units</td>
                      <td className="px-6 py-4 text-muted-foreground">{crop.location}</td>
                      <td className="px-6 py-4 font-bold text-emerald-600 dark:text-emerald-400">
                        {formatCurrency(crop.market_price)}
                      </td>
                      <td className="px-6 py-4">{getStatusBadge(crop.status)}</td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button
                          onClick={() => setDetailsCrop(crop)}
                          className="p-1.5 rounded-lg border border-border hover:bg-muted"
                          title="View"
                        >
                          <HiEye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEditModal(crop)}
                          className="p-1.5 rounded-lg border border-border hover:bg-muted text-emerald-500"
                          title="Edit"
                        >
                          <HiPencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setDeleteCropId(crop.id)}
                          className="p-1.5 rounded-lg border border-border hover:bg-muted text-red-500"
                          title="Delete"
                        >
                          <HiTrash className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-border pt-4">
              <span className="text-xs text-muted-foreground">
                Showing Page <strong className="text-foreground">{page}</strong> of{" "}
                <strong className="text-foreground">{totalPages}</strong> (Total {total} items)
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="inline-flex items-center gap-1"
                >
                  <HiChevronLeft className="h-4 w-4" /> Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="inline-flex items-center gap-1"
                >
                  Next <HiChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Add / Edit Crop Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editingCrop ? "Edit Crop Record" : "Add New Crop Record"}
      >
        <form onSubmit={handleFormSubmit} className="space-y-4">
          {formError && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-500 font-medium">
              {formError}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">
                Crop Name *
              </label>
              <Input
                type="text"
                placeholder="e.g. Organic Wheat"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              >
                {CATEGORIES.filter((c) => c !== "All").map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">
                Quantity (units/kg) *
              </label>
              <Input
                type="number"
                placeholder="100"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">
                Market Price (₹ per unit) *
              </label>
              <Input
                type="number"
                placeholder="2500"
                value={formData.market_price}
                onChange={(e) => setFormData({ ...formData, market_price: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">
                Farm Location *
              </label>
              <Input
                type="text"
                placeholder="e.g. Nashik, MH"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              >
                {STATUSES.filter((s) => s !== "All").map((s) => (
                  <option key={s} value={s}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1">
              Planted Date
            </label>
            <Input
              type="date"
              value={formData.planted_at}
              onChange={(e) => setFormData({ ...formData, planted_at: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1">
              Description / Notes
            </label>
            <textarea
              rows={3}
              placeholder="Add details regarding soil type, seed variety, or fertilizer used..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full rounded-xl border border-border bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            />
          </div>

          {/* Image Upload Input */}
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1">
              Crop Image File
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="block w-full text-xs text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-500/10 file:text-emerald-500 hover:file:bg-emerald-500/20"
            />
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-border pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsFormOpen(false)}
              disabled={formSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={formSubmitting}>
              {formSubmitting ? "Saving..." : editingCrop ? "Update Crop" : "Create Crop"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Details Slide / Modal */}
      {detailsCrop && (
        <Modal
          isOpen={Boolean(detailsCrop)}
          onClose={() => setDetailsCrop(null)}
          title={`Crop Details: ${detailsCrop.name}`}
        >
          <div className="space-y-4">
            {detailsCrop.image_url && (
              <div className="h-48 w-full overflow-hidden rounded-xl bg-muted">
                <img
                  src={detailsCrop.image_url}
                  alt={detailsCrop.name}
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 rounded-xl bg-muted/30 p-4 text-xs">
              <div>
                <span className="text-muted-foreground">Category:</span>
                <p className="font-semibold text-foreground mt-0.5">{detailsCrop.category || "Grains"}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Status:</span>
                <p className="mt-0.5">{getStatusBadge(detailsCrop.status)}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Quantity:</span>
                <p className="font-semibold text-foreground mt-0.5">{detailsCrop.quantity} units</p>
              </div>
              <div>
                <span className="text-muted-foreground">Market Price:</span>
                <p className="font-semibold text-emerald-500 mt-0.5">
                  {formatCurrency(detailsCrop.market_price)}
                </p>
              </div>
              <div className="col-span-2">
                <span className="text-muted-foreground">Location:</span>
                <p className="font-semibold text-foreground mt-0.5">{detailsCrop.location}</p>
              </div>
            </div>

            {detailsCrop.description && (
              <div>
                <span className="text-xs font-semibold text-muted-foreground">Description & Notes</span>
                <p className="mt-1 text-xs text-foreground leading-relaxed bg-muted/20 p-3 rounded-xl border border-border/60">
                  {detailsCrop.description}
                </p>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <Button variant="outline" onClick={() => setDetailsCrop(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {deleteCropId && (
        <Modal
          isOpen={Boolean(deleteCropId)}
          onClose={() => setDeleteCropId(null)}
          title="Confirm Deletion"
        >
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Are you sure you want to delete this crop record? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setDeleteCropId(null)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDeleteCrop}>
                Delete Crop
              </Button>
            </div>
          </div>
        </Modal>
      )}

      <Footer />
    </div>
  );
}
