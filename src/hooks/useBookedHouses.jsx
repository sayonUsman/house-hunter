import { useQuery } from "@tanstack/react-query";

const useBookedHouses = () => {
  let userInfo = localStorage.getItem("user-info");
  userInfo = JSON.parse(userInfo);
  const email = userInfo.email;

  const { data, refetch } = useQuery({
    queryKey: ["booked-houses-details", email],

    queryFn: async () => {
      const res = await fetch(
        `https://house-hunter.cyclic.app/booked-houses-details/${email}`
      );
      return res.json();
    },
  });

  if (data?.length === 0) {
    return [null, refetch];
  } else {
    return [data, refetch];
  }
};

export default useBookedHouses;
