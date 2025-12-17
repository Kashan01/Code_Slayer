// app/page.js

import problems from './problems.json';

// --- Components ---

/**
 * Renders a pill-shaped tag for difficulty, color-coded by the level.
 */
function DifficultyTag({ difficulty }) {
  let colorClass;
  switch (difficulty.toLowerCase()) {
    case 'easy':
      colorClass = 'bg-green-100 text-green-700 border-green-300';
      break;
    case 'medium':
      colorClass = 'bg-yellow-100 text-yellow-700 border-yellow-300';
      break;
    case 'hard':
      colorClass = 'bg-red-100 text-red-700 border-red-300';
      break;
    default:
      colorClass = 'bg-gray-100 text-gray-700 border-gray-300';
  }

  return (
    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full border ${colorClass}`}>
      {difficulty}
    </span>
  );
}

/**
 * Renders a section for a single coding problem.
 */
function ProblemCard({ problem }) {
  return (
    <div className="bg-white p-6 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg border border-gray-200">
      <div className="flex justify-between items-start mb-3">
        <h2 className="text-xl font-bold text-indigo-700 hover:text-indigo-600">
          <a href={`/problems/${problem.slug}`}>
            {problem.id}. {problem.title}
          </a>
        </h2>
        <DifficultyTag difficulty={problem.difficulty} />
      </div>

      <p className="text-gray-600 mb-4 line-clamp-2">
        {problem.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {problem.tags.map(tag => (
          <span
            key={tag}
            className="text-xs font-medium bg-gray-100 text-gray-600 px-3 py-1 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="text-sm text-gray-500">
        <span className="font-semibold text-gray-700">Companies:</span>{' '}
        {problem.companies.slice(0, 3).join(', ')}
        {problem.companies.length > 3 ? '...' : ''}
      </div>
    </div>
  );
}

// --- Main Page Component ---

/**
 * The main component for the problems listing page.
 */
export default function ProblemsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <header className="max-w-7xl mx-auto mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 border-b-4 border-indigo-500 pb-2">
          Problem Set
        </h1>
        <p className="mt-2 text-lg text-gray-500">
          A collection of popular coding interview questions.
        </p>
      </header>
      
      <main className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map(problem => (
            <ProblemCard key={problem.id} problem={problem} />
          ))}
        </div>
      </main>
    </div>
  );
}