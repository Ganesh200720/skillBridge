/**
 * MOCK DATA: Assessment Question Engine for /student/assessments/[id]
 */

export interface QuizQuestion {
  id: number;
  questionText: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface AssessmentQuizDetail {
  id: string;
  title: string;
  skillName: string;
  durationMinutes: number;
  questions: QuizQuestion[];
}

export const MOCK_QUIZ_DATA: Record<string, AssessmentQuizDetail> = {
  "test-react-1": {
    id: "test-react-1",
    title: "React Component Architecture",
    skillName: "React",
    durationMinutes: 20,
    questions: [
      {
        id: 1,
        questionText: "Which React hook is primarily used for managing component state in functional components?",
        options: ["useEffect", "useState", "useRef", "useMemo"],
        correctOptionIndex: 1,
        explanation: "useState declares state variables preserved across renders in functional components.",
      },
      {
        id: 2,
        questionText: "What is the primary purpose of the 'key' prop when rendering lists of elements in React?",
        options: [
          "To format the text style of each list item",
          "To give React a stable identity for reordering and DOM diffing",
          "To automatically bind click handlers to items",
          "To enable CSS animations between components",
        ],
        correctOptionIndex: 1,
        explanation: "Keys help React identify which items have changed, been added, or removed during DOM reconciliation.",
      },
      {
        id: 3,
        questionText: "Which hook should be used to run side-effects such as data fetching or subscriptions after DOM updates?",
        options: ["useCallback", "useLayoutEffect", "useEffect", "useReducer"],
        correctOptionIndex: 2,
        explanation: "useEffect schedules side-effect callbacks to run after the browser renders.",
      },
    ],
  },
  "test-django-1": {
    id: "test-django-1",
    title: "Django REST Framework APIs",
    skillName: "Django",
    durationMinutes: 30,
    questions: [
      {
        id: 1,
        questionText: "In Django REST Framework, what component translates Django Model instances into Python native datatypes for JSON rendering?",
        options: ["Router", "Serializer", "Viewset", "Middleware"],
        correctOptionIndex: 1,
        explanation: "Serializers handle converting complex data like queryset instances into native Python datatypes.",
      },
      {
        id: 2,
        questionText: "Which architectural pattern does Django follow by default?",
        options: ["MVC (Model-View-Controller)", "MVT (Model-View-Template)", "MVVM (Model-View-ViewModel)", "Singleton"],
        correctOptionIndex: 1,
        explanation: "Django uses Model-View-Template where Templates handle presentation and Views handle request logic.",
      },
    ],
  },
};