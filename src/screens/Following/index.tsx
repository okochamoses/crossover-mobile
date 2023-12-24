import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, ListRenderItem } from "react-native";
import FlashCard from "../../components/FlashCard";
import { FlashcardType } from "../../types/types";
import { fetchFlashCardData } from "../../api/apis";
import generateRandomString from "../../utils/RandomString";

const Following: React.FC = () => {
  const INITIAL_FLASH_CARD_DATA_FETCH_LENGTH = 4;
  const MAX_FLASH_CARD_DATA_FETCH_LENGTH = 8;

  const [data, setData] = useState<FlashcardType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDataAndSetState(INITIAL_FLASH_CARD_DATA_FETCH_LENGTH);
  }, []);

  const fetchDataAndSetState = async (amountOfData: number) => {
    setLoading(true);
    try {
      const flashCardData = await fetchFlashCardData(amountOfData);
      setData((current) => [
        ...current,
        ...flashCardData.map((item, index) => ({
          ...item,
          key: `${index}-${generateRandomString(8)}`,
        })),
      ]);
    } catch (error) {
      console.error("Error fetching MCQ data:", error);
    } finally {
      ``;
      setLoading(false);
    }
  };

  const renderItem: ListRenderItem<FlashcardType> = ({ item, index }) => (
    <FlashCard {...item} index={index} key={index} />
  );

  const renderFooter = () =>
    loading ? <ActivityIndicator size="large" color="#fff" /> : null;

  const fetchReelsData = () => {
    fetchDataAndSetState(
      data.length < MAX_FLASH_CARD_DATA_FETCH_LENGTH
        ? data.length
        : MAX_FLASH_CARD_DATA_FETCH_LENGTH
    );
  };

  return (
    <FlatList
      data={data}
      style={{ backgroundColor: "#00425A" }}
      renderItem={renderItem}
      horizontal={false}
      pagingEnabled
      onEndReached={fetchReelsData}
      onEndReachedThreshold={0.25}
      ListFooterComponent={renderFooter}
      ListFooterComponentStyle={{
        paddingTop: -300,
        backgroundColor: "#00425A",
      }}
    />
  );
};

export default Following;
