export default {
  email: "2m2srl@gmail.com",
  phone: "+39 389 4468231",
  businessName: "2emme2 srl",

  address: "Via delle Basse 2",
  cap: 43044,
  city: "Collecchio",
  province: "PR",
  country: "Italy",
  fullAddress() {
    return `${this.address}, ${this.cap} ${this.city} ${this.province}`;
  },

  openings: {
    monTue: "08:30-12:30 / 14:40-17:30",
    sat: "08:30-12:30",
  },

  ebay: "https://www.ebay.it/str/2m2ricambi",
  maps: "https://maps.app.goo.gl/369MXv5mJpvhDNP86",
} as const;
