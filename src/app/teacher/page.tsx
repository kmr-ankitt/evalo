import React from "react";

import Leaderboard from "./_components/Leaderboard"; 
import UploadQuestion from "./_components/UploadQuestion";
import Module from "./_components/Module";
import Header from "./_components/Header";
import StudentList from "./_components/StudentList";


const page = () => {
  return (
    
    <div className="min-h-screen p-6">
        <Header />
      

      <main className="mt-6">
        

        <div className="mt-4 flex flex-col lg:flex-row gap-6 items-start">
          <div className="w-full lg:w-1/2">
            
            <UploadQuestion />
          </div>
          

          <div className="w-full lg:w-1/2">
            <Leaderboard />
          </div>
         
        </div>
        <div>

        </div>
        <Module />
        <StudentList />
      </main>
    </div>
  );
};

export default page;
