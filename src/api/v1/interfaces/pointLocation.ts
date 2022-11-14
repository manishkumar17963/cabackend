export default interface PointLocation {
  name: string;
  location: { type: "Point"; coordinates: number[] };
}
