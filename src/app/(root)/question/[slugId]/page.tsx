import React from "react";
import QuestionsSection from "../../_components/QuestionPanel";
import Header from "../../_components/Header";
import EditorPanel from "../../_components/EditorPanel";
import OutputPanel from "../../_components/OutputPanel";
import { QUESTIONS_ID } from "../../_constants";

type QuestionsSectionProps = {
  id: string;
  title?: string;
  description?: string;
  difficulty?: "Easy" | "Medium" | "Hard";
  className?: string;
  expectedOutput?: string;
};

export default async function page({
  params,
}: {
  params: Promise<{ slugId: string }>;
}) {
  const { slugId } = await params;
  const dummyData: QuestionsSectionProps = QUESTIONS_ID(slugId)!;

  console.log(slugId);
  return (
    <div className="min-h-screen">
      <div className="max-w-[1800px] mx-auto p-4">
        <Header />
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
          <QuestionsSection
            title={dummyData.title}
            description={dummyData.description}
            difficulty={dummyData.difficulty}
            testCase={`3
            4
            2 7 11 15
            9
            3
            3 2 4
            6
            2
            3 3
            6`}
            expectedOutput={dummyData.expectedOutput}
          />
          <EditorPanel />
          <OutputPanel />
        </div>
      </div>
    </div>
  );
}
