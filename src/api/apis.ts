import {
  FlashcardType,
  McqType,
  mapToSimplifiedFlashcard,
  mapToSimplifiedMcq,
} from "../types/types";

const BASE_URL = "https://cross-platform.rp.devfactory.com";

export const fetchMcqData = async (times: number): Promise<McqType[]> => {
  try {
    const fetchPromises = Array.from({ length: times }, () =>
      fetch(`${BASE_URL}/for_you`)
    );

    const results = await Promise.allSettled(fetchPromises);
    const successfulResults = results
      .filter((result) => result.status === "fulfilled")
      .map(
        (result) => (result as { status: "fulfilled"; value: Response }).value
      );
    if (successfulResults.length > 0) {
      const dataPromises = successfulResults.map(async (response) =>
        mapToSimplifiedMcq(await response.json())
      );

      const data = await Promise.all<McqType>(dataPromises);
      return data as McqType[];
    }
  } catch (err) {
    console.log(err);
  }
  return [];
};

export const fetchFlashCardData = async (times: number) => {
  try {
    const fetchPromises = Array.from({ length: times }, () =>
      fetch(`${BASE_URL}/following`)
    );

    const results = await Promise.allSettled(fetchPromises);

    const successfulResults = await results
      .filter((result) => result.status === "fulfilled")
      .map(
        (result) => (result as { status: "fulfilled"; value: Response }).value
      );

    if (successfulResults.length > 0) {
      const dataPromises = successfulResults.map(async (response) =>
        mapToSimplifiedFlashcard(await response.json())
      );

      const dataResults = await Promise.all<FlashcardType>(dataPromises);

      return dataResults;
    }
  } catch (err) {
    console.log(err);
  }
  return [];
};
