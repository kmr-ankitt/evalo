import React from 'react'
import { dsaQuestions } from '../../../../convex/moduleData'

const difficultyColor = (d: string) => {
  switch (d.toLowerCase()) {
    case 'easy':
      return 'bg-emerald-600'
    case 'medium':
      return 'bg-yellow-500'
    case 'hard':
      return 'bg-rose-600'
    default:
      return 'bg-gray-600'
  }
}

const ListOfQuestion: React.FC = () => {
  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold text-white mb-4">Problems list</h2>

      <div className="flex flex-col space-y-4">
        {dsaQuestions.map((q) => (
          <div key={q.id} className="p-4 rounded-lg bg-gradient-to-br from-[#0b0b0f] to-[#12121a] border border-gray-800">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-white font-semibold">{q.title}</h3>
                <p className="text-sm text-gray-300 mt-2">{q.description}</p>
                {q.tags && q.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {q.tags.map((t: string) => (
                      <span key={t} className="text-xs text-gray-300 bg-white/5 px-2 py-1 rounded">{t}</span>
                    ))}
                  </div>
                )}
              </div>

              <div className="ml-4 flex-shrink-0">
                <span className={`text-xs text-white px-2 py-1 rounded ${difficultyColor(q.difficulty)}`}>{q.difficulty}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListOfQuestion
