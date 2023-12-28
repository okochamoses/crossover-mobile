interface CommonProps {
  id?: number;
  playlist?: string;
  description?: string;
  author?: string;
  authorAvatar?: string | undefined;
  question?: string;
}

export type McqAnswersType = {
  id: number;
  correct_options: McqCorrectOption[];
};

export type McqCorrectOption = {
  id: string;
  answer: string;
};

export type FlashcardType = CommonProps & {
  answer?: string;
};

export type McqType = CommonProps & {
  image: string | undefined;
  options: {
    id: string;
    answer: string;
  }[];
};

export type CombinedMcqType = {
  mcq: McqType;
  ans: McqAnswersType;
};

export type FlashcardApiType = {
  type: string;
  id: number;
  playlist: string;
  flashcard_front: string;
  flashcard_back: string;
  description: string;
  user: {
    name: string;
    avatar: string;
  };
};

export type MultipleChoiceQuestionApiType = {
  type: "mcq";
  id: number;
  playlist: string;
  description: string;
  image: string;
  question: string;
  options: {
    id: string;
    answer: string;
  }[];
  user: {
    name: string;
    avatar: string;
  };
};

export const mapToSimplifiedFlashcard = (
  original: FlashcardApiType
): FlashcardType => ({
  id: original.id,
  question: original.flashcard_front,
  answer: original.flashcard_back,
  author: original.user.name,
  authorAvatar: original.user.avatar,
  playlist: original.playlist,
  description: original.description,
});

export const mapToSimplifiedMcq = (
  original: MultipleChoiceQuestionApiType
): McqType => ({
  id: original.id,
  question: original.question,
  options: original.options,
  author: original.user.name,
  authorAvatar: original.user.avatar,
  playlist: original.playlist,
  description: original.description,
  image: original.image,
});
