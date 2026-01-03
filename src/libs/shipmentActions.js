export const SHIPMENT_ACTIONS = {
  pending: [{ label: "Start Processing", nextStatus: "processing" }],

  processing: [
    { label: "Mark as Shipped", nextStatus: "shipped" },
    { label: "Cancel Shipment", nextStatus: "failed", danger: true },
  ],

  shipped: [
    { label: "Mark In Transit", nextStatus: "in_transit" },
    { label: "Mark Delivery Failed", nextStatus: "failed", danger: true },
  ],

  in_transit: [
    { label: "Mark as Delivered", nextStatus: "delivered", success: true },
    { label: "Mark Delivery Failed", nextStatus: "failed", danger: true },
  ],

  failed: [
    { label: "Retry Shipment", nextStatus: "processing" },
    { label: "Mark as Returned", nextStatus: "returned", danger: true },
  ],

  delivered: [],
  returned: [],
};
