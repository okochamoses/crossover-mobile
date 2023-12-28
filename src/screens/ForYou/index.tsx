import React, { PropsWithChildren, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, ListRenderItem } from "react-native";
import Mcq from "../../components/Mcq";
import { CombinedMcqType, McqAnswersType, McqType } from "../../types/types";
import { fetchMcqAnswers, fetchMcqData } from "../../api/apis";
import generateRandomString from "../../utils/RandomString";

const ForYou: React.FC<PropsWithChildren> = () => {
  const INITIAL_MCQ_DATA_FETCH_LENGTH = 4;
  const MAX_MCQ_DATA_FETCH_LENGTH = 8;

  const [data, setData] = useState<{ mcq: McqType; ans: McqAnswersType }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDataAndSetState(INITIAL_MCQ_DATA_FETCH_LENGTH);
  }, []);

  const fetchDataAndSetState = async (amountOfData: number) => {
    setLoading(true);
    try {
      const mcqData = await fetchMcqData(amountOfData);
      const mcqAnswers = await fetchMcqAnswers(
        mcqData
          .map((data) => data.id)
          .filter((id) => id !== undefined) as number[]
      );
      const combinedData: { mcq: McqType; ans: McqAnswersType }[] = mcqData
        .map((mcq) => {
          return {
            mcq: mcq,
            ans: mcqAnswers.find((it) => mcq.id === it.id),
          };
        })
        .filter((d) => d.ans !== undefined) as {
        mcq: McqType;
        ans: McqAnswersType;
      }[];

      setData((current) => [
        ...current,
        ...combinedData.map((item, index) => ({
          ...item,
          key: `${index}-${generateRandomString(8)}`,
        })),
      ]);
    } catch (error) {
      console.error("Error fetching flash card data:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem: ListRenderItem<CombinedMcqType> = ({ item, index }) => (
    <Mcq {...item} index={index} key={index} />
  );

  const renderFooter = () =>
    loading ? <ActivityIndicator size="large" color="#fff" /> : null;

  const fetchReelsData = () => {
    fetchDataAndSetState(
      data.length < MAX_MCQ_DATA_FETCH_LENGTH
        ? data.length
        : MAX_MCQ_DATA_FETCH_LENGTH
    );
  };

  return (
    <FlatList
      data={data}
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

export default ForYou;
