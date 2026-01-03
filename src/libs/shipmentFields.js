export const SHIPMENT_STATUS_OPTIONS = [
  { label: "Pending", value: "pending" },
  { label: "Processing", value: "processing" },
  { label: "Shipped", value: "shipped" },
  { label: "In Transit", value: "in_transit" },
  { label: "Delivered", value: "delivered" },
  { label: "Delivery Failed", value: "failed" },
  { label: "Returned", value: "returned" },
];

export const SHIPMENT_FIELDS = [
  {
    name: "status",
    label: "Shipment Status",
    type: "select",
    options: SHIPMENT_STATUS_OPTIONS,
    required: true,
  },
  {
    name: "courier",
    label: "Courier / Logistics Company",
    type: "text",
    placeholder: "DHL, FedEx, UPS, GIG, etc",
  },
  {
    name: "tracking_number",
    label: "Tracking Number",
    type: "text",
  },
  {
    name: "tracking_url",
    label: "Tracking URL",
    type: "text",
  },
  {
    name: "estimated_delivery",
    label: "Estimated Delivery Date",
    type: "date",
  },
  {
    name: "customer_note",
    label: "Customer Note (Visible to customer)",
    type: "textarea",
  },
  {
    name: "admin_note",
    label: "Internal Admin Note",
    type: "textarea",
    helperText: "Only admins can see this note",
  },
];
