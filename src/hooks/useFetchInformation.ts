import { useEffect, useState } from "react";

export function useFetchInformation() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInformation = async () => {
      try {
        setIsLoading(true);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error("An unknown error occurred", error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchInformation();
  }, []);

  return { isLoading, setIsLoading };
}
