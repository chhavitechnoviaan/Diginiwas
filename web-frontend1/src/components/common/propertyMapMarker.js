import L from "leaflet";
import logoUrl from "../../assets/images/diginiwas-map-logo.png";

const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");

/**
 * DigiNiwas branded map marker.
 *
 * The supplied DigiNiwas logo is already a location-pin mark, so we use it
 * directly instead of placing it inside a second Leaflet pin. This keeps the
 * marker clean and avoids the old white circular background.
 */
export const createPropertyLogoIcon = (size = 52) => {
  const safeSize = Math.max(42, Number(size) || 52);

  return L.divIcon({
    className: "diginiwas-property-marker",
    html: `
      <div
        style="
          width:${safeSize}px;
          height:${safeSize}px;
          display:flex;
          align-items:center;
          justify-content:center;
          filter:drop-shadow(0 4px 6px rgba(0,0,0,.42));
          pointer-events:auto;
        "
      >
        <img
          src="${logoUrl}"
          alt="DigiNiwas"
          style="
            width:100%;
            height:100%;
            object-fit:contain;
            display:block;
            background:transparent;
          "
        />
      </div>
    `,
    iconSize: [safeSize, safeSize],
    // The actual logo already has the pin point at the bottom.
    iconAnchor: [safeSize / 2, safeSize * 0.985],
    popupAnchor: [0, -(safeSize * 0.82)],
  });
};

export const propertyMarkerPopup = (name, count) => `
  <div style="min-width:150px;font-family:Arial,sans-serif;color:#274255;">
    <strong style="font-size:13px;">${escapeHtml(name)}</strong>
    ${count !== undefined ? `<div style="margin-top:3px;font-size:11px;color:#78909C;">${escapeHtml(count)} properties</div>` : ""}
  </div>
`;
