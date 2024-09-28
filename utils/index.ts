import { PublicCardCourseProps } from "@/types";

export const calculateExpirationDate = (duration: string): Date => {
  const match = duration.match(/^(\d+)([smhd])$/); // Matches the format "15m", "1h", etc.

  if (!match) {
    throw new Error("Invalid expiration duration format.");
  }

  const value = parseInt(match[1], 10);
  const unit = match[2];

  const now = new Date();

  switch (unit) {
    case "s": // seconds
      return new Date(now.getTime() + value * 1000);
    case "m": // minutes
      return new Date(now.getTime() + value * 60 * 1000);
    case "h": // hours
      return new Date(now.getTime() + value * 60 * 60 * 1000);
    case "d": // days
      return new Date(now.getTime() + value * 24 * 60 * 60 * 1000);
    default:
      throw new Error("Invalid time unit.");
  }
};

export const filterBy = (data: PublicCardCourseProps[], by: string) => {
  switch (by) {
    case "name-asc":
      return data.sort((a, b) => a.title.localeCompare(b.title));

    case "name-desc":
      return data.sort((a, b) => b.title.localeCompare(a.title));

    case "price-asc":
      return data.sort((a, b) => a.price - b.price);

    case "price-desc":
      return data.sort((a, b) => b.price - a.price);

    default:
      return data;
  }
};

export const filterBySearch = (
  data: PublicCardCourseProps[],
  searchQuery: string
) => {
  if (!searchQuery) {
    return data;
  }

  return data.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
};
