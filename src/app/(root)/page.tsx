import EditorPanel from "./_components/EditorPanel";
import Header from "./_components/Header";
import OutputPanel from "./_components/OutputPanel";
import QuestionsSection from "./_components/QuestionPanel";

export default function Home() {
  
  // TODO: Remove this two
    type QuestionsSectionProps = {
      title?: string;
      description?: string;
      difficulty?: 'Easy' | 'Medium' | 'Hard';
      className?: string;
      expectedOutput?: string;
    };
  
    const dummyData: QuestionsSectionProps = {
      title: "Two Sum",
      description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

  You may assume that each input would have exactly one solution, and you may not use the same element twice.

  You can return the answer in any order.

  Example 1:

  Input: nums = [2,7,11,15], target = 9
  Output: [0,1]
  Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

  Example 2:

  Input: nums = [3,2,4], target = 6
  Output: [1,2]

  Example 3:

  Input: nums = [3,3], target = 6
  Output: [0,1]`,
      difficulty: "Easy",
      expectedOutput: "0 1\n1 2\n0 1",
    };

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
