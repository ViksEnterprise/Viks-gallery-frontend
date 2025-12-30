export const PRODUCT_TYPES = [
  { value: "artwork", label: "Artwork" },
  { value: "sculpture", label: "Sculpture" },
  { value: "beads", label: "Beads" },
];

const baseProductFields = [
  { name: "Id", label: "Product ID", type: "number", required: true },
  { name: "title", label: "Title", type: "text", required: true },
  { name: "price", label: "Price", type: "number", required: true },
  { name: "quantity", label: "Quantity", type: "number" },
  { name: "description", label: "Description", type: "textarea" },
];

const shippingFields = [
  { name: "ship_from", label: "Ship From", type: "text" },
  { name: "delivery_day", label: "Delivery Days", type: "number" },
  { name: "delivery_cost", label: "Delivery Cost", type: "number" },
  { name: "returns", label: "Return Window (days)", type: "number" },
  { name: "handling", label: "Handling Instructions", type: "text" },
];

const artworkFields = [
  { name: "artist_name", label: "Artist Name", type: "text" },
  { name: "material_used", label: "Material Used", type: "text" },
  { name: "styles", label: "Style", type: "text" },
  { name: "medium", label: "Medium", type: "text" },
  { name: "painting_type", label: "Painting Type", type: "text" },
  { name: "size", label: "Size", type: "text" },
  {
    name: "ready_to_hang",
    label: "Ready to Hang",
    type: "select",
    options: ["yes", "no"],
  },
];

const sculptureFields = [
  { name: "artist_name", label: "Artist Name", type: "text" },
  { name: "material", label: "Material", type: "text" },
  { name: "weight_kg", label: "Weight (kg)", type: "number" },
  { name: "height_cm", label: "Height (cm)", type: "number" },
  { name: "width_cm", label: "Width (cm)", type: "number" },
  { name: "depth_cm", label: "Depth (cm)", type: "number" },
  {
    name: "indoor_outdoor",
    label: "Indoor / Outdoor",
    type: "select",
    options: ["indoor", "outdoor"],
  },
  { name: "handmade", label: "Handmade", type: "checkbox" },
];

const beadsFields = [
  { name: "designer_name", label: "Designer Name", type: "text" },
  { name: "material", label: "Material", type: "text" },
  { name: "length_cm", label: "Length (cm)", type: "number" },
  { name: "color", label: "Color", type: "text" },
  { name: "handmade", label: "Handmade", type: "checkbox" },
];

export const COLLECTION_FIELDS = {
  artwork: [...baseProductFields, ...artworkFields, ...shippingFields],
  sculpture: [...baseProductFields, ...sculptureFields, ...shippingFields],
  beads: [...baseProductFields, ...beadsFields, ...shippingFields],
};
